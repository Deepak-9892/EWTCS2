'use server'
// Turnaround Time (TAT) Server Actions
// US-2.4: Track Bed Cleaning and Turnaround Time
//
// Two TAT APIs coexist:
//  1. Upstream analytics (fetchTATSummary/fetchTATRecords) — used by StageAnalyticsView
//  2. US-2.4 cleaning TAT (fetchTatSummary/fetchTatRecords) — used by BedDashboardClient

import { requireRole, requireWriteRole } from '@/shared/lib/auth'
import { logAudit } from '@/shared/lib/audit'
import { logger } from '@/shared/config/logger'
import { updateBedStageInDB } from '../lib/bed-mutations'
import { getTATSummary, getTATRecords } from '../lib/tat-queries'
import { getTatSummary, getCompletedTatRecords } from '../lib/tat-cleaning-queries'
import type { TATSummary, TATRecord } from '../lib/tat-queries'
import {
  getErTatSummary,
  getErTatRecords,
  getErCleaningTatSummary,
  getErCleaningTatRecords,
  getTriageTatSummary,
  getTriageTatRecords,
  getTriageCleaningTatSummary,
  getTriageCleaningTatRecords,
  type DurationMetricSummary,
  type WorkflowTatRecord,
} from '../lib/stage-analytics'
import type { TatRecord, TatSummary } from '../types/bed'
import { getAllStages } from '../lib/queries'
import { resolveActiveShiftIdCached } from '@/shared/lib/shift-helpers'

// ──── Upstream analytics TAT (StageAnalyticsView / useAnalyticsData) ────

export interface FetchTATSummaryResult {
  success: boolean
  data?: TATSummary
  error?: string
}

export interface FetchTATRecordsResult {
  success: boolean
  data?: TATRecord[]
  error?: string
}

export interface FetchWorkflowTatSummaryResult {
  success: boolean
  data?: DurationMetricSummary
  error?: string
}

export interface FetchWorkflowTatRecordsResult {
  success: boolean
  data?: WorkflowTatRecord[]
  error?: string
}

/**
 * Fetch aggregate TAT statistics — accessible by supervisor and admin.
 * Supervisors use this to monitor how fast beds are turned around.
 */
export async function fetchTATSummary(options?: {
  startDate?: Date
  endDate?: Date
}): Promise<FetchTATSummaryResult> {
  try {
    await requireRole(['supervisor', 'admin', 'auditor'])

    const summary = await getTATSummary(options?.startDate, options?.endDate)

    logger.info('TAT summary fetched', { totalCycles: summary.totalCycles })
    return { success: true, data: summary }
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to fetch TAT summary'
    logger.error('fetchTATSummary failed', error as Error)
    return { success: false, error: message }
  }
}

/**
 * Fetch individual TAT records for per-bed analysis — supervisor/admin only.
 * Returns most-recent cycles first, up to `limit` rows.
 */
export async function fetchTATRecords(options?: {
  startDate?: Date
  endDate?: Date
  limit?: number
}): Promise<FetchTATRecordsResult> {
  try {
    await requireRole(['supervisor', 'admin', 'auditor'])

    const records = await getTATRecords(options?.startDate, options?.endDate)
    const limited = options?.limit ? records.slice(0, options.limit) : records

    logger.info('TAT records fetched', { count: limited.length })
    return { success: true, data: limited }
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to fetch TAT records'
    logger.error('fetchTATRecords failed', error as Error)
    return { success: false, error: message }
  }
}

export async function fetchErTatSummary(options?: {
  startDate?: Date
  endDate?: Date
}): Promise<FetchWorkflowTatSummaryResult> {
  try {
    await requireRole(['supervisor', 'admin', 'auditor'])
    const summary = await getErTatSummary(options?.startDate, options?.endDate)
    return { success: true, data: summary }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch ER TAT summary'
    logger.error('fetchErTatSummary failed', error as Error)
    return { success: false, error: message }
  }
}

export async function fetchErTatRecords(options?: {
  startDate?: Date
  endDate?: Date
  limit?: number
}): Promise<FetchWorkflowTatRecordsResult> {
  try {
    await requireRole(['supervisor', 'admin', 'auditor'])
    const records = await getErTatRecords(options?.startDate, options?.endDate)
    return { success: true, data: options?.limit ? records.slice(0, options.limit) : records }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch ER TAT records'
    logger.error('fetchErTatRecords failed', error as Error)
    return { success: false, error: message }
  }
}

export async function fetchErCleaningTatSummary(options?: {
  startDate?: Date
  endDate?: Date
}): Promise<FetchWorkflowTatSummaryResult> {
  try {
    await requireRole(['supervisor', 'admin', 'auditor'])
    const summary = await getErCleaningTatSummary(options?.startDate, options?.endDate)
    return { success: true, data: summary }
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to fetch ER cleaning TAT summary'
    logger.error('fetchErCleaningTatSummary failed', error as Error)
    return { success: false, error: message }
  }
}

export async function fetchErCleaningTatRecords(options?: {
  startDate?: Date
  endDate?: Date
  limit?: number
}): Promise<FetchWorkflowTatRecordsResult> {
  try {
    await requireRole(['supervisor', 'admin', 'auditor'])
    const records = await getErCleaningTatRecords(options?.startDate, options?.endDate)
    return { success: true, data: options?.limit ? records.slice(0, options.limit) : records }
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to fetch ER cleaning TAT records'
    logger.error('fetchErCleaningTatRecords failed', error as Error)
    return { success: false, error: message }
  }
}

export async function fetchTriageTatSummary(options?: {
  startDate?: Date
  endDate?: Date
}): Promise<FetchWorkflowTatSummaryResult> {
  try {
    await requireRole(['supervisor', 'admin', 'auditor'])
    const summary = await getTriageTatSummary(options?.startDate, options?.endDate)
    return { success: true, data: summary }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch triage TAT summary'
    logger.error('fetchTriageTatSummary failed', error as Error)
    return { success: false, error: message }
  }
}

export async function fetchTriageTatRecords(options?: {
  startDate?: Date
  endDate?: Date
  limit?: number
}): Promise<FetchWorkflowTatRecordsResult> {
  try {
    await requireRole(['supervisor', 'admin', 'auditor'])
    const records = await getTriageTatRecords(options?.startDate, options?.endDate)
    return { success: true, data: options?.limit ? records.slice(0, options.limit) : records }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch triage TAT records'
    logger.error('fetchTriageTatRecords failed', error as Error)
    return { success: false, error: message }
  }
}

export async function fetchTriageCleaningTatSummary(options?: {
  startDate?: Date
  endDate?: Date
}): Promise<FetchWorkflowTatSummaryResult> {
  try {
    await requireRole(['supervisor', 'admin', 'auditor'])
    const summary = await getTriageCleaningTatSummary(options?.startDate, options?.endDate)
    return { success: true, data: summary }
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to fetch triage cleaning TAT summary'
    logger.error('fetchTriageCleaningTatSummary failed', error as Error)
    return { success: false, error: message }
  }
}

export async function fetchTriageCleaningTatRecords(options?: {
  startDate?: Date
  endDate?: Date
  limit?: number
}): Promise<FetchWorkflowTatRecordsResult> {
  try {
    await requireRole(['supervisor', 'admin', 'auditor'])
    const records = await getTriageCleaningTatRecords(options?.startDate, options?.endDate)
    return { success: true, data: options?.limit ? records.slice(0, options.limit) : records }
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to fetch triage cleaning TAT records'
    logger.error('fetchTriageCleaningTatRecords failed', error as Error)
    return { success: false, error: message }
  }
}

// ──── US-2.4: Cleaning TAT (BedDashboardClient / TatAnalyticsView) ────

/** Mark a bed as clean (Cleaning → Empty transition) */
export async function markBedClean(bedId: string): Promise<{
  success: boolean
  error?: string
}> {
  try {
    const session = await requireWriteRole('beds', {
      actionType: 'UPDATE',
      entityType: 'bed',
      entityId: bedId,
    })

    const allStages = await getAllStages()
    const emptyStage = allStages.find((stage) => stage.name.trim().toLowerCase() === 'empty')
    if (!emptyStage) {
      return { success: false, error: 'Empty stage not found in system' }
    }

    const activeShiftId = await resolveActiveShiftIdCached()

    const result = await (async () => {
      try {
        return await updateBedStageInDB({
          bedId,
          toStageId: emptyStage.id,
          toStageName: emptyStage.name,
          changedByUserId: session.userId,
          notes: 'Bed marked clean — ready for next patient',
          activeShiftId,
        })
      } catch (error) {
        const message = error instanceof Error ? error.message : ''
        if (message === 'Bed is already in the selected stage') {
          logger.info('Bed already clean; mark clean treated as no-op', {
            bedId,
            changedBy: session.userId,
          })
          return null
        }
        throw error
      }
    })()

    if (!result) {
      return { success: true }
    }

    await logAudit({
      actionType: 'UPDATE',
      entityType: 'bed',
      entityId: bedId,
      performedBy: session.userId,
      changes: { action: 'mark_clean', fromStageId: result.fromStageId, toStageId: result.toStageId },
      reason: 'Bed cleaning completed',
    })

    logger.info('Bed marked clean', { bedId, changedBy: session.userId })
    return { success: true }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to mark bed as clean'
    logger.error('Failed to mark bed clean', error as Error, { bedId })
    return { success: false, error: message }
  }
}

/** Fetch TAT summary stats for the dashboard (hoursBack window) */
export async function fetchTatSummary(hoursBack: number = 24): Promise<{
  success: boolean
  data?: TatSummary
  error?: string
}> {
  try {
    await requireRole(['nurse', 'supervisor', 'admin', 'auditor'])
    const summary = await getTatSummary(hoursBack)
    return { success: true, data: summary }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch TAT summary'
    logger.error('Failed to fetch TAT summary', error as Error)
    return { success: false, error: message }
  }
}

/** Fetch completed TAT records for analytics (hoursBack window) */
export async function fetchTatRecords(hoursBack: number = 24): Promise<{
  success: boolean
  data?: TatRecord[]
  error?: string
}> {
  try {
    await requireRole(['supervisor', 'admin', 'auditor'])
    const records = await getCompletedTatRecords(hoursBack)
    return { success: true, data: records }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch TAT records'
    logger.error('Failed to fetch TAT records', error as Error)
    return { success: false, error: message }
  }
}
