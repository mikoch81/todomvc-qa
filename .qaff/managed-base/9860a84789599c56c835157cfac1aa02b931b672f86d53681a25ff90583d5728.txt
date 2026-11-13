# Prompt — generate web test from scenario

Use this with `.ai/agents/test-generator.agent.md`.

> Static prompt template only.
> Not a runtime.
> Not a hosted agent.
> Not a Jira/Zephyr connector.
> Not a DOM collector.
> Not a locator generator.
> Not a test generator by itself.

## Required input

- scenario contract ref (required)
- test authoring request ref (required)
- locator evidence ref (required)
- Allure step mapping ref (required)
- generated-test review contract ref (required)
- scenario text
- target app/layer (one of: todomvc)
- real DOM/page-source evidence (if available; collector automation is future scope)
- existing Page Object references
- expected Allure step mapping (one `test.step()` per mapped step)
- validation commands to run

## Mandatory constraints

- Do not invent selectors, Jira keys, Zephyr IDs, credentials, URLs, or external services.
- Do not invent expected results, payloads, or missing evidence.
- If required contract refs are missing, stop and request them.
- Do not introduce external network calls in smoke tests unless explicitly configured.

## Expected output

1. Proposed spec location (`apps/<id>/<layer>/tests/<Name>.spec.ts`) and content outline.
2. Page Object additions/changes with evidence-backed selectors.
3. Allure step mapping summary linked to scenario step ids.
4. Validation command block:

```bash
qaff verify --project .
npm test
```
