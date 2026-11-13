# Prompt — review generated test

Use this with `.ai/agents/code-reviewer.agent.md`.

> Static prompt template only.
> Not a runtime.
> Not a hosted agent.
> Not a Jira/Zephyr connector.
> Not a DOM collector.
> Not a locator generator.
> Not a test generator by itself.

## Review checklist

- scenario contract ref exists and is used
- test authoring request ref exists and is used
- locator evidence ref exists and selectors are evidence-backed
- Allure step mapping ref exists and scenario step ids are preserved
- generated-test review contract output is followed
- no `page.waitForTimeout` fixed pauses
- no positional brittle selectors unless justified
- no invented selectors
- Page Object usage is consistent
- Playwright Test conventions (`test.describe`, `test.step`, web-first assertions) are preserved
- no external network calls in smoke tests by default
- dependency direction remains valid
- generated-owned file boundaries are respected
- `qaff verify --project .` result recorded
- `npm test` result recorded

## Mandatory constraints

- Do not invent selectors, Jira keys, Zephyr IDs, credentials, URLs, or external services.
- Do not invent expected results, API payloads, test data, or command outcomes.
- If contract/evidence inputs are missing, return a blocked finding.

## Output format

```
file: <path>
finding: <one-line issue>
fix: <one-line action>
severity: blocking | major | minor | nit
```
