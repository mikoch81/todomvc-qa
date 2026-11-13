# Generation Summary

`qaff create` produced a real, buildable TypeScript/npm/Playwright
framework from the inputs below.

## Inputs

- **Config:** `todomvc-qa.yaml`
- **Project:** `todomvc-qa`
- **Node.js target:** `20`
- **Blueprint:** `ts-npm-playwright` v0.1.0

## Selected blueprint

- **id:** `ts-npm-playwright`
- **version:** 0.1.0
- **name:** TypeScript + npm + Playwright
- **maturity:** stable
- **description:** Web-automation blueprint for TypeScript projects. Generates an npm-workspaces multi-package framework with Playwright and a fixture-based smoke test. Targets Node.js 20 (default) with Node.js 22 as an option.
- **language:** typescript
- **buildTool:** npm
- **testRunner:** playwright
- **automationTools:** playwright
- **reportingTools:** playwright-html
- **supportedChannels:** web-desktop, web-mobile
- **supportedIntegrations:** github-actions, jenkins, azure-pipelines, gitlab-ci
- **supportedQualityPacks:** integration, api, performance
- **outputStructure:** package.json, playwright.config.ts, tsconfig.json, framework-core/, framework-web/, framework-api/, framework-performance/, apps/, qa-factory.lock.json
- **manifest path:** `ts-npm-playwright/blueprint.yaml`

## Applications

- `apps/todomvc` — TodoMVC  (layers: web-desktop, web-mobile, api)

- **External web targets:** `todomvc` → `https://demo.playwright.dev/todomvc` — the web smoke runs against these URLs, so the first `npm test` fails until they are reachable (replace a placeholder such as `https://example.invalid`; `qaff doctor --project .` probes them; see README "External web targets").

## Files written

```
package.json
playwright.config.ts
tsconfig.json
.gitattributes
.gitignore
README.md
docs/HOW_TO_USE_ALLURE.md
.ai/agents/test-generator.agent.md
.ai/agents/code-reviewer.agent.md
.ai/agents/locator-healer.agent.md
.ai/agents/api-test-generator.agent.md
.ai/agents/integration-test-planner.agent.md
.ai/agents/performance-analyst.agent.md
.ai/agents/failure-analyst.agent.md
.ai/instructions/generated-framework-authoring.md
.ai/instructions/locator-policy.md
.ai/instructions/allure-step-policy.md
.ai/contracts/scenario-contract.example.json
.ai/contracts/test-authoring-request.template.json
.ai/contracts/locator-evidence.example.json
.ai/contracts/allure-step-mapping.example.json
.ai/contracts/generated-test-review.example.json
.ai/prompts/generate-web-test.md
.ai/prompts/generate-api-test.md
.ai/prompts/review-new-test.md
.ai/prompts/fix-failed-test.md
.ai/prompts/analyze-allure-results.md
.ai/prompts/analyze-quality-impact-results.md
.ai/prompts/generate-web-test-from-scenario.md
.ai/prompts/review-generated-test.md
.ai/mcp/README.md
.ai/mcp/mcp-config.example.json
.ai/mcp/server.manifest.json
.ai/mcp/server/server.js
.ai/mcp/tools/read-test-results.tool.md
.ai/mcp/tools/compare-performance-baseline.tool.md
.ai/mcp/tools/attach-report-to-jira.tool.md
.ai/mcp/tools/create-zephyr-execution.tool.md
.ai/mcp/tools/sync-xray-results.tool.md
.ai/mcp/tools/sync-testrail-results.tool.md
.ai/mcp/tools/inspect-repository-structure.tool.md
.ai/mcp/tools/suggest-test-implementation.tool.md
.ai/mcp/test-results-mcp.md
.ai/mcp/performance-results-mcp.md
.ai/mcp/repository-inspection-mcp.md
docs/AI_ASSISTED_DEVELOPMENT.md
docs/ai-authoring-readiness.md
docs/ai-web-test-authoring.md
docs/ai-api-test-authoring.md
docs/locator-policy.md
docs/allure-step-policy.md
docs/agent-validation-checklist.md
docs/scenario-contract.md
docs/test-authoring-request.md
docs/locator-evidence-contract.md
docs/allure-step-mapping-contract.md
docs/generated-test-review-contract.md
.claude/agents/test-generator.md
.claude/agents/code-reviewer.md
.claude/agents/locator-healer.md
.claude/agents/api-test-generator.md
.claude/agents/integration-test-planner.md
.claude/agents/performance-analyst.md
.claude/agents/failure-analyst.md
.claude/skills/generate-web-test/SKILL.md
.claude/skills/generate-api-test/SKILL.md
.claude/skills/review-new-test/SKILL.md
.claude/skills/fix-failed-test/SKILL.md
.claude/skills/analyze-allure-results/SKILL.md
.claude/skills/analyze-quality-impact-results/SKILL.md
.claude/skills/generate-web-test-from-scenario/SKILL.md
.claude/skills/review-generated-test/SKILL.md
.claude/rules/authoring-policies.md
.mcp.json
AGENTS.md
CLAUDE.md
.github/workflows/playwright.yml
framework-core/package.json
framework-core/tsconfig.json
framework-core/src/index.ts
framework-core/src/helpers/waitHelper.ts
framework-web/package.json
framework-web/tsconfig.json
framework-web/src/index.ts
framework-web/src/BasePage.ts
framework-web/src/PageComponent.ts
framework-api/package.json
framework-api/tsconfig.json
framework-api/src/index.ts
framework-api/src/ApiTestSupport.ts
framework-api/README.md
framework-performance/README.md
framework-performance/thresholds.yaml
framework-performance/baseline/README.md
framework-performance/reports/README.md
framework-performance/reports/history/README.md
framework-performance/providers/k6/README.md
framework-performance/providers/k6/input/README.md
scripts/run-k6-import-smoke.ps1
scripts/run-k6-import-smoke.sh
docs/performance-strategy.md
docs/quality-gates.md
apps/todomvc/web-desktop/package.json
apps/todomvc/web-desktop/tsconfig.json
apps/todomvc/web-desktop/pages/TodomvcHomePage.ts
apps/todomvc/web-desktop/tests/smoke.spec.ts
apps/todomvc/web-desktop/fixtures/todomvc.html
apps/todomvc/web-mobile/package.json
apps/todomvc/web-mobile/tsconfig.json
apps/todomvc/web-mobile/pages/TodomvcMobileHomePage.ts
apps/todomvc/web-mobile/tests/smoke.spec.ts
apps/todomvc/web-mobile/fixtures/todomvc.html
apps/todomvc/api/package.json
apps/todomvc/api/tsconfig.json
apps/todomvc/api/tests/health.api.spec.ts
qa-factory.lock.json
GENERATION_SUMMARY.md
```

## Post-generation validation

- **Dependency direction:** PASSED
- **Modules checked:** 6
- **Rule:** `apps/* -> framework-*` allowed; `framework-* -> apps/*` forbidden.

## Build it

```bash
npm test
```
