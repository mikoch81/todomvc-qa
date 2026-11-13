# AI-Assisted Development

## Overview

This framework includes MCP (Model Context Protocol) tools and agents to help you write
Playwright tests more efficiently. This guide explains how to use them.

## MCP Tools

The `.ai/mcp/` directory contains tool definitions for AI models. These tools help agents:
- Read and understand your test structure
- Query the allure-playwright results of the last run
- Turn the `.ai/contracts/` authoring contracts into an implementation plan
- Get performance metrics

MCP tools never modify your code: `read_test_results`, `compare_performance_baseline`,
`inspect_repository_structure` and `suggest_test_implementation` are read-only;
`create_zephyr_execution` writes a local dry-run file by default and performs a live
Zephyr write only when `ZEPHYR_ENABLE_LIVE_WRITE=true` and credentials are supplied;
`attach_report_to_jira` writes a local dry-run comment the same way and posts one Jira
comment only when `JIRA_ENABLE_LIVE_WRITE=true` and credentials are supplied;
`sync_xray_results` / `sync_testrail_results` work the same way behind
`XRAY_ENABLE_LIVE_WRITE` / `TESTRAIL_ENABLE_LIVE_WRITE`. Agent code generation is a
separate workflow.

## Using AI Agents

### Before AI Generation

1. **Understand the patterns** — Read [AGENTS.md](../AGENTS.md) and study the generated
   `smoke.spec.ts` and `*HomePage.ts` files.
2. **Set up your environment** — `npm install`, `npx playwright install`, and make sure
   `npm test` is green locally.
3. **Document your conventions** — Example: naming patterns, test organization.

### With AI Agents

AI agents can generate:
- Page objects following your patterns
- Specs for common scenarios
- Test data and HTML fixtures
- Documentation updates

But remember:
- **Agents follow your guidance** — Better prompts → better generated code
- **Review generated code** — Don't blindly accept agent output
- **Update prompts** — If generated code doesn't match your patterns, refine your prompt

### After AI Generation

1. **Review** — Check generated specs against your patterns
2. **Modify** — Edit and adjust as needed
3. **Test** — Run `npm test` (it builds and typechecks the workspace first)
4. **Commit** — Commit good code to your repository

## Framework Conventions for AI

When prompting AI agents, reference:
- **Page Object Model** — `apps/<id>/<layer>/pages/*Page.ts` extending `BasePage` from `framework-web`
- **Test structure** — `apps/<id>/<layer>/tests/*.spec.ts`; the generated `smoke.spec.ts`
  (web) and `health.api.spec.ts` (api, with the Quality Impact Pack) are the style guides
- **Steps and reporting** — `test.step()` per meaningful action ([allure-step-policy.md](allure-step-policy.md))
- **Selectors** — [locator-policy.md](locator-policy.md)

## Managed Files and AI

AI agents should **not** modify:
- Generator-managed files (listed under `generatedFiles` in `qa-factory.lock.json`)
  unless the change is intended
- `package.json`, `playwright.config.ts` and `tsconfig.json` files
- `framework-*` package code (unless extending for shared use)

AI agents should generate:
- Specs in `apps/<id>/<layer>/tests/`
- Page objects in `apps/<id>/<layer>/pages/` (shared ones in `framework-web/src/`)
- HTML fixtures in `apps/<id>/<layer>/fixtures/`

## Next Steps

- Study the generated specs and page objects in your project
- Read [ai-authoring-readiness.md](ai-authoring-readiness.md) and the contract docs it links
- Use AI agents to accelerate test creation while maintaining code quality
