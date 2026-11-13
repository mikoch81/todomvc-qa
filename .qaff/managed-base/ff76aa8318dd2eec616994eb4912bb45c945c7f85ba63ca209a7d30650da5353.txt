# Prompt — generate a new api test

Use this prompt with the **API Test Generator** agent
(`.ai/agents/api-test-generator.agent.md`).

## Fill in

- App id: `<one of: todomvc>`
- Scenario contract ref: `<path to .ai/contracts/scenario-contract.example.json-like file>`
- Test authoring request ref: `<path to .ai/contracts/test-authoring-request.template.json-like file>`
- Endpoint under test (verb + path): `<...>`
- Smoke or regression: `<smoke | regression>`
- Expected status: `<...>`
- Expected body shape (JSON or short description): `<...>`

## Ask for

1. The Playwright `APIRequestContext` spec (`apps/<id>/api/tests/<name>.api.spec.ts`,
   opened with `createApiContext`).
2. Any new route added to the in-process `node:http` stub.
3. A 3-line rationale.

## Reject the result if

- It proceeds without scenario contract and explicit expected results.
- The smoke variant calls a public network endpoint instead of the
  in-process stub.
- It asserts only on status code without inspecting the body.
- It invents endpoint paths, payloads, expected results, URLs, credentials, Jira keys, or Zephyr IDs.
- It claims an MCP tool or external service was called.
