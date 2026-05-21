// Daily Aggregation Queries — EPIC 9: Daily AI Summary
// Reads from existing tables to compute rolled-up daily statistics.

import { query } from '@/shared/lib/db'
import { logger } from '@/shared/config/logger'
import type { DailySummaryInput, DailySummaryMetadata } from '../types/daily-summary'
import {
    getDayBounds,
    msToMinutes,
    type RawPatientStats,
    type RawAvgStageTime,
    type RawDelayCount,
    type RawAvgTat,
    type RawMostDelayedStage,
} from './aggregation-helpers'

async function getPatientStats(
    dayStart: Date,
    dayEnd: Date
): Promise<{ totalPatients: number; totalBedsUsed: number; totalStageUpdates: number }> {
    const sql = `
    SELECT
      COUNT(DISTINCT pa.id)          AS "totalPatients",
      COUNT(DISTINCT bsl.bed_id)     AS "totalBedsUsed",
      COUNT(bsl.id)                  AS "totalStageUpdates"
    FROM bed_stage_logs bsl
    LEFT JOIN patient_admissions pa
      ON pa.bed_id = bsl.bed_id
     AND pa.admitted_at >= $1
     AND pa.admitted_at <= $2
    WHERE bsl.transition_time >= $1
      AND bsl.transition_time <= $2
  `
    const result = await query<RawPatientStats>(sql, [dayStart, dayEnd])
    const row = result.rows[0]
    return {
        totalPatients: parseInt(row?.totalPatients ?? '0', 10),
        totalBedsUsed: parseInt(row?.totalBedsUsed ?? '0', 10),
        totalStageUpdates: parseInt(row?.totalStageUpdates ?? '0', 10),
    }
}

async function getAvgStageTime(dayStart: Date, dayEnd: Date): Promise<number> {
    const sql = `
    SELECT AVG(bsl.duration_in_previous_stage_ms) AS "avgStageTimeMs"
    FROM bed_stage_logs bsl
    WHERE bsl.transition_time >= $1 AND bsl.transition_time <= $2
      AND bsl.duration_in_previous_stage_ms IS NOT NULL
  `
    const result = await query<RawAvgStageTime>(sql, [dayStart, dayEnd])
    const raw = result.rows[0]?.avgStageTimeMs
    return raw !== null && raw !== undefined ? parseFloat(raw) : 0
}

async function getDelayCount(dayStart: Date, dayEnd: Date): Promise<number> {
    const sql = `
    SELECT COUNT(DISTINCT ddr.bed_id) AS "delayCount"
    FROM disposition_delay_reasons ddr
    WHERE ddr.recorded_at >= $1 AND ddr.recorded_at <= $2
  `
    const result = await query<RawDelayCount>(sql, [dayStart, dayEnd])
    return parseInt(result.rows[0]?.delayCount ?? '0', 10)
}

async function getAvgTat(
    dayStart: Date,
    dayEnd: Date
): Promise<{ avgTatMs: number; avgErTatMs: number | null; avgTriageTatMs: number | null }> {
    const sql = `
    WITH er_cycles AS (
      SELECT pa.total_duration_ms AS duration_ms
      FROM patient_admissions pa
      JOIN beds b ON b.id = pa.bed_id
      JOIN wards w ON w.id = b.ward_id AND w.code = 'ER'
      WHERE pa.discharged_at >= $1
        AND pa.discharged_at <= $2
        AND pa.total_duration_ms IS NOT NULL
    ),
    triage_start_events AS (
      SELECT
        tsl.bed_id,
        tsl.transition_time AS started_at
      FROM triage_state_logs tsl
      JOIN beds b ON b.id = tsl.bed_id
      JOIN wards w ON w.id = b.ward_id AND w.code = 'TRIAGE'
      WHERE tsl.to_state = 'initial_treatment'
    ),
    triage_cleaning_events AS (
      SELECT
        tsl.bed_id,
        tsl.transition_time AS cleaning_at,
        LAG(tsl.transition_time) OVER (
          PARTITION BY tsl.bed_id
          ORDER BY tsl.transition_time ASC
        ) AS previous_cleaning_at
      FROM triage_state_logs tsl
      JOIN beds b ON b.id = tsl.bed_id
      JOIN wards w ON w.id = b.ward_id AND w.code = 'TRIAGE'
      WHERE tsl.to_state = 'cleaning'
        AND tsl.transition_time >= $1
        AND tsl.transition_time <= $2
    ),
    triage_cycles AS (
      SELECT EXTRACT(EPOCH FROM (ce.cleaning_at - se.started_at)) * 1000 AS duration_ms
      FROM triage_cleaning_events ce
      JOIN LATERAL (
        SELECT s.started_at
        FROM triage_start_events s
        WHERE s.bed_id = ce.bed_id
          AND s.started_at < ce.cleaning_at
          AND (
            ce.previous_cleaning_at IS NULL
            OR s.started_at > ce.previous_cleaning_at
          )
        ORDER BY s.started_at DESC
        LIMIT 1
      ) se ON true
    ),
    workflow_cycles AS (
      SELECT duration_ms, 'er'::text AS workflow FROM er_cycles
      UNION ALL
      SELECT duration_ms, 'triage'::text AS workflow FROM triage_cycles
    )
    SELECT
      AVG(duration_ms) AS "avgTatMs",
      AVG(duration_ms) FILTER (WHERE workflow = 'er') AS "avgErTatMs",
      AVG(duration_ms) FILTER (WHERE workflow = 'triage') AS "avgTriageTatMs"
    FROM workflow_cycles
  `
    const result = await query<RawAvgTat>(sql, [dayStart, dayEnd])
    const row = result.rows[0]
    return {
        avgTatMs: row?.avgTatMs !== null && row?.avgTatMs !== undefined ? parseFloat(row.avgTatMs) : 0,
        avgErTatMs: row?.avgErTatMs !== null && row?.avgErTatMs !== undefined ? parseFloat(row.avgErTatMs) : null,
        avgTriageTatMs:
            row?.avgTriageTatMs !== null && row?.avgTriageTatMs !== undefined
                ? parseFloat(row.avgTriageTatMs)
                : null,
    }
}

async function getMostDelayedStage(dayStart: Date, dayEnd: Date): Promise<string | undefined> {
    const sql = `
    SELECT s.name AS "stageName"
    FROM disposition_delay_reasons ddr
    JOIN bed_stage_logs bsl ON bsl.id = ddr.bed_stage_log_id
    JOIN stages s ON s.id = bsl.to_stage_id
    WHERE ddr.recorded_at >= $1 AND ddr.recorded_at <= $2
    GROUP BY s.name ORDER BY COUNT(*) DESC LIMIT 1
  `
    const result = await query<RawMostDelayedStage>(sql, [dayStart, dayEnd])
    return result.rows[0]?.stageName ?? undefined
}

interface RawMvSummaryRow {
    summary_date: string
    total_patients: string
    avg_stage_time_minutes: string
    delay_count: string
    avg_tat_minutes: string
    total_beds_used: string
    total_stage_updates: string
}

export interface AggregateParityResult {
    matches: boolean
    mismatches: string[]
}

function asTwoDp(value: number): number {
    return Math.round(value * 100) / 100
}

/**
 * Verifies aggregateDailyStats output matches daily_summaries_mv for a date.
 * Used by tests and optional runtime checks for DB2-01 parity.
 */
export async function verifyAggregateMatchesMaterializedView(
    dateStr: string
): Promise<AggregateParityResult> {
    const computed = await aggregateDailyStats(dateStr)
    const mvResult = await query<RawMvSummaryRow>(
        `SELECT
           summary_date,
           total_patients,
           avg_stage_time_minutes,
           delay_count,
           avg_tat_minutes,
           total_beds_used,
           total_stage_updates
         FROM daily_summaries_mv
         WHERE summary_date = $1
         LIMIT 1`,
        [dateStr]
    )

    const row = mvResult.rows[0]
    if (!row) {
        return { matches: false, mismatches: ['missing_materialized_row'] }
    }

    const mismatches: string[] = []
    if (computed.totalPatients !== parseInt(row.total_patients, 10)) mismatches.push('totalPatients')
    if (computed.totalBedsUsed !== parseInt(row.total_beds_used, 10)) mismatches.push('totalBedsUsed')
    if (computed.totalStageUpdates !== parseInt(row.total_stage_updates, 10)) mismatches.push('totalStageUpdates')
    if (computed.delayCount !== parseInt(row.delay_count, 10)) mismatches.push('delayCount')
    if (asTwoDp(computed.avgStageTimeMinutes) !== asTwoDp(parseFloat(row.avg_stage_time_minutes))) {
        mismatches.push('avgStageTimeMinutes')
    }
    if (asTwoDp(computed.avgTatMinutes) !== asTwoDp(parseFloat(row.avg_tat_minutes))) {
        mismatches.push('avgTatMinutes')
    }

    return { matches: mismatches.length === 0, mismatches }
}

export async function aggregateDailyStats(dateStr: string): Promise<DailySummaryInput> {
    const { dayStart, dayEnd } = getDayBounds(dateStr)
    logger.info(`[ai-summary] Aggregating stats for ${dateStr}`)

    const [patientStats, avgStageTimeMs, delayCount, avgTat, mostDelayedStage] =
        await Promise.all([
            getPatientStats(dayStart, dayEnd),
            getAvgStageTime(dayStart, dayEnd),
            getDelayCount(dayStart, dayEnd),
            getAvgTat(dayStart, dayEnd),
            getMostDelayedStage(dayStart, dayEnd),
        ])

    const metadata: DailySummaryMetadata = {}
    if (mostDelayedStage) metadata.mostDelayedStage = mostDelayedStage
    if (avgTat.avgErTatMs !== null) metadata.avgErTatMinutes = msToMinutes(avgTat.avgErTatMs)
    if (avgTat.avgTriageTatMs !== null) {
        metadata.avgTriageTatMinutes = msToMinutes(avgTat.avgTriageTatMs)
    }

    return {
        summaryDate: dateStr,
        totalPatients: patientStats.totalPatients,
        avgStageTimeMinutes: msToMinutes(avgStageTimeMs),
        delayCount,
        avgTatMinutes: msToMinutes(avgTat.avgTatMs),
        totalBedsUsed: patientStats.totalBedsUsed,
        totalStageUpdates: patientStats.totalStageUpdates,
        metadata,
    }
}
