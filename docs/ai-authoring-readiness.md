# AI Authoring Readiness

This generated framework is **AI authoring ready** through static guidance and templates.
It is **not** shipping AI test generation runtime in this phase.

## What this phase includes

- Static authoring guidance for web tests, API tests, locators and Allure steps.
- Static checklists for safe agent-assisted updates.
- Clear boundaries for generated-owned files versus custom test code.

## What remains future scope

- Jira/Zephyr import is future scope.
- DOM evidence collection is future scope.
- Locator generation and self-healing are future scope.
- AI test generation runtime is future scope.

## Safe authoring boundaries

- Add custom web/API specs under `apps/<id>/<layer>/tests/` and page
  objects under `apps/<id>/<layer>/pages/`.
- Add shared page objects/helpers under `framework-web/src/` when truly shared.
- Do not edit generated-owned files directly; they are listed under
  `generatedFiles` in `qa-factory.lock.json`.

## Validation after changes

- Run `qaff verify --project .`.
- Run `npm test`.
- Optionally run a single layer: `npx playwright test --project <layer>`.

`qaff verify` is a structural health check, not Quality Impact evaluation.

`qaff evaluate-quality-impact` and `qaff update-baseline` require
`framework-performance/reports/<app-id>.result.json` files.

`npm test` does not run k6. The performance layer's k6 script runs only
when you run it yourself; import its summary with
`qaff import-performance-result --provider k6`.

## Related docs

- [ai-web-test-authoring.md](ai-web-test-authoring.md)
- [ai-api-test-authoring.md](ai-api-test-authoring.md)
- [locator-policy.md](locator-policy.md)
- [allure-step-policy.md](allure-step-policy.md)
- [agent-validation-checklist.md](agent-validation-checklist.md)
- [scenario-contract.md](scenario-contract.md)
- [test-authoring-request.md](test-authoring-request.md)
- [locator-evidence-contract.md](locator-evidence-contract.md)
- [allure-step-mapping-contract.md](allure-step-mapping-contract.md)
- [generated-test-review-contract.md](generated-test-review-contract.md)
