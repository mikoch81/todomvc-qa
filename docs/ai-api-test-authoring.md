# AI API Test Authoring

This is static guidance for AI-assisted authoring. It is not a runtime.

## Where to add API tests

- API specs: `apps/<id>/api/tests/<name>.api.spec.ts` (when the Quality Impact Pack is
  enabled and the app declares the `api` layer)
- Shared API helpers: `framework-api` (`createApiContext`, Playwright `APIRequestContext`)

## Authoring rules

- Keep tests deterministic and explicit about expected status/body.
- Avoid external network dependency in smoke-level checks (use an in-process
  `node:http` stub, as `health.api.spec.ts` does).
- Reuse existing helper/support code before adding new utility code.

Jira import is future scope and not implemented in this phase.
Zephyr execution write is available through the MCP tool in dry-run
mode by default, with optional live mode when explicitly enabled.

## Quality Impact reminders

- `qaff evaluate-quality-impact` and `qaff update-baseline` require
  `framework-performance/reports/<app-id>.result.json` files.
- `qaff verify` is structural health check only.

## Validate

- `qaff verify --project .`
- `npm test`
- optional: `npx playwright test --project api`
