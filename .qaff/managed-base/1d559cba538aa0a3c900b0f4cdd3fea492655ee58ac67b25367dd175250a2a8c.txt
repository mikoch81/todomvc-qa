# AI Web Test Authoring

This is static guidance for AI-assisted authoring. It is not a runtime.

## Where to add web tests

- Specs: `apps/<id>/web-desktop/tests/<Name>.spec.ts` (or `web-mobile`)
- App page objects: `apps/<id>/web-desktop/pages/<Name>Page.ts`
- Shared page objects/helpers: `framework-web/src/`
- Fixtures/data: `apps/<id>/web-desktop/fixtures/`

## Selector policy

- Selectors must come from real app evidence, not hallucination.
- Prefer `getByTestId` / `getByRole` and stable attributes over positional CSS/XPath.
- If evidence is missing, stop and ask for it. Do not invent selectors.

DOM evidence collection automation is future scope; use available page source,
fixtures and existing page objects as evidence today.

## Conventions

- Keep Playwright Test structure readable (clear titles, `test.describe` grouping,
  deterministic assertions).
- Map test actions to meaningful `test.step()` calls (reported as Allure steps).
- Avoid `page.waitForTimeout`; use web-first assertions and auto-waiting.
- Keep smoke tests offline/local where possible.

Generated smoke tests must not call external application targets unless
explicitly configured for that purpose.

## Validate

- `qaff verify --project .`
- `npm test`
- optional: `npx playwright test --project web-desktop`
