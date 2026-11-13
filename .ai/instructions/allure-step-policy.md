# Allure Step Policy Instruction

> Static instruction template only. Not a runtime.

## Rules

- Keep one clear `test.step()` per meaningful action; allure-playwright reports each as an Allure step.
- Keep Playwright test titles and `test.describe` grouping clear.
- Keep assertions deterministic and close to the action they validate.

## Scope reminder

This template does not provide AI generation runtime or external integration.

## Validation

- Run `qaff verify --project .` and `npm test`.
