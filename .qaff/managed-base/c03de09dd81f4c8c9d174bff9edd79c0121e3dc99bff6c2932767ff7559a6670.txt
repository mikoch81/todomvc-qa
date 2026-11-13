# Prompt — analyze Quality Impact Pack results

Use this prompt with the **Performance Analyst** agent
(`.ai/agents/performance-analyst.agent.md`).

## Provide

- The current run's normalised metrics (per scenario, per app) —
  `framework-performance/reports/<app>.result.json`.
- `framework-performance/baseline/<app>.baseline.json` for each app
  in scope.
- `framework-performance/thresholds.yaml`.
- (Optional) The previous trend report under
  `framework-performance/reports/`.

## Ask for

For each scenario, the agent's standard output block:

1. Verdict (`PASS` / `REGRESSION` / `OVER-BUDGET` /
   `INSUFFICIENT-DATA`).
2. Headline (one sentence with metric + before/after + delta).
3. Evidence (bullets of moved metrics with absolute and relative
   deltas).
4. Likely cause class.
5. Recommended next action.

## Reject the result if

- It claims k6 execution is wired into `npm test` or CI — it is not
  (the performance layer ships a k6 script template, budgets, baselines
  and an import path only).
- It proposes accepting a new baseline that exceeds
  `thresholds.yaml`.
- It invents metric names not present in the input.
