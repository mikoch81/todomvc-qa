# Allure Step Policy

This policy defines static conventions for mapping test actions to Allure steps.
The allure-playwright reporter records every Playwright `test.step()` as an Allure
step and writes the results to `allure-results/`.

## Step mapping

- Map each meaningful user/system action to one clear `test.step()`.
- Keep step names action-oriented and short.
- Keep assertions explicit and close to their related step.

## Playwright Test conventions

- Use readable test titles and `test.describe` blocks for intent and grouping.
- Use tags (`{ tag: "@smoke" }`) consistently when you need to filter runs.
- Keep tests deterministic and avoid hidden side effects.

## Scope note

This guidance does not introduce a runtime generator.
AI test generation runtime remains future scope.

## Validation

- `qaff verify --project .`
- `npm test`
