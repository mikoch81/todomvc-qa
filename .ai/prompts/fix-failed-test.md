# Prompt — fix a failed test

Use this prompt in conjunction with the **Failure Analyst** agent
(`.ai/agents/failure-analyst.agent.md`) and, if the cause is a
locator, the **Locator Healer** agent
(`.ai/agents/locator-healer.agent.md`).

## Provide

- The failing test (`<spec file> › <test title>`).
- The Playwright error and stack trace from the run output.
- The spec source.
- (Optional) The allure-playwright result, screenshot, trace
  (`test-results/**/trace.zip`) or HTML snapshot.
- (Optional) Two prior verdicts on the same test against the same
  code.

## Ask for

1. **Category** (product defect / test defect / environment defect /
   flake / infra outage).
2. **One-line evidence** for the category.
3. **Next action** — concrete and bounded (e.g. "replace selector",
   "open tracking task with this title", "rerun once").
4. If the next action is "replace selector", a candidate locator from
   the Locator Healer agent.

## Reject the result if

- It categorises a first-time failure as "flake" without prior-run
  evidence.
- It recommends `test.skip` / `test.fixme` without a tracking task
  reference the human supplied.
- It blames a public outage without a link to a status page the human
  supplied.
