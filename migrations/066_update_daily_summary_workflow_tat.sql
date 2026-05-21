-- Migration 066: Update daily_summaries_mv to use the workflow TAT model
-- Purpose: Align stored daily-summary TAT with the ER workflow model
--          (ER assignment -> Cleaning entry).
-- Note: Triage workflow TAT is added later, after the triage tables exist.

BEGIN;

DROP MATERIALIZED VIEW IF EXISTS daily_summaries_mv;

CREATE MATERIALIZED VIEW daily_summaries_mv AS
WITH bed_stats AS (
  SELECT
    DATE_TRUNC('day', bsl.transition_time)::date AS summary_date,
    COUNT(DISTINCT bsl.bed_id)::int AS total_beds_used,
    COUNT(bsl.id)::int AS total_stage_updates,
    COALESCE(ROUND((AVG(bsl.duration_in_previous_stage_ms)::numeric / 60000), 2), 0)::numeric(10,2)
      AS avg_stage_time_minutes
  FROM bed_stage_logs bsl
  GROUP BY DATE_TRUNC('day', bsl.transition_time)::date
),
patient_stats AS (
  SELECT
    DATE_TRUNC('day', bsl.transition_time)::date AS summary_date,
    COUNT(DISTINCT pa.id)::int AS total_patients
  FROM bed_stage_logs bsl
  LEFT JOIN patient_admissions pa
    ON pa.bed_id = bsl.bed_id
   AND pa.admitted_at >= DATE_TRUNC('day', bsl.transition_time)
   AND pa.admitted_at < DATE_TRUNC('day', bsl.transition_time) + INTERVAL '1 day'
  GROUP BY DATE_TRUNC('day', bsl.transition_time)::date
),
delay_stats AS (
  SELECT
    DATE_TRUNC('day', ddr.recorded_at)::date AS summary_date,
    COUNT(DISTINCT ddr.bed_id)::int AS delay_count
  FROM disposition_delay_reasons ddr
  GROUP BY DATE_TRUNC('day', ddr.recorded_at)::date
),
workflow_tat_cycles AS (
  SELECT
    DATE_TRUNC('day', pa.discharged_at)::date AS summary_date,
    pa.total_duration_ms::numeric AS duration_ms
  FROM patient_admissions pa
  JOIN beds b ON b.id = pa.bed_id
  JOIN wards w ON w.id = b.ward_id AND w.code = 'ER'
  WHERE pa.total_duration_ms IS NOT NULL
),
tat_stats AS (
  SELECT
    summary_date,
    COALESCE(ROUND((AVG(duration_ms) / 60000), 2), 0)::numeric(10,2) AS avg_tat_minutes
  FROM workflow_tat_cycles
  GROUP BY summary_date
)
SELECT
  bs.summary_date,
  COALESCE(ps.total_patients, 0)::int AS total_patients,
  bs.avg_stage_time_minutes,
  COALESCE(ds.delay_count, 0)::int AS delay_count,
  COALESCE(ts.avg_tat_minutes, 0)::numeric(10,2) AS avg_tat_minutes,
  bs.total_beds_used,
  bs.total_stage_updates,
  NOW() AS generated_at
FROM bed_stats bs
LEFT JOIN patient_stats ps ON ps.summary_date = bs.summary_date
LEFT JOIN delay_stats ds ON ds.summary_date = bs.summary_date
LEFT JOIN tat_stats ts ON ts.summary_date = bs.summary_date;

CREATE UNIQUE INDEX idx_daily_summaries_mv_summary_date
  ON daily_summaries_mv (summary_date);

COMMIT;

REFRESH MATERIALIZED VIEW daily_summaries_mv;
