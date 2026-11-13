# Prompt — generate a new web-desktop test

Use this prompt with the **Test Generator** agent
(`.ai/agents/test-generator.agent.md`).

## Fill in

- App id: `<one of: todomvc>`
- Scenario contract ref: `<path to .ai/contracts/scenario-contract.example.json-like file>`
- Test authoring request ref: `<path to .ai/contracts/test-authoring-request.template.json-like file>`
- Locator evidence ref: `<path to .ai/contracts/locator-evidence.example.json-like file>`
- Allure step mapping ref: `<path to .ai/contracts/allure-step-mapping.example.json-like file>`
- User flow to cover (1 paragraph): `<...>`
- Existing page object to extend (or "new"): `<...>`
- Local fixture HTML to drive: `<path under apps/<id>/web-desktop/fixtures/ or "new">`
  (apps with a real target drive it instead: `todomvc` → `https://demo.playwright.dev/todomvc`)

## Ask for

1. The `<Name>.spec.ts` spec implementing the flow.
2. The page object (new or extended).
3. The fixture HTML (or note about reuse).
4. A 3–5 line rationale.

## Reject the result if

- It proceeds without scenario contract and evidence references.
- It calls a public website other than an app's configured real target.
- It uses `page.waitForTimeout` as a fixed pause.
- It puts locators inside the spec body instead of the page object.
- It invents selectors, expected results, URLs, credentials, Jira keys, or Zephyr IDs.
- It introduces business-domain terminology not present in the input.
