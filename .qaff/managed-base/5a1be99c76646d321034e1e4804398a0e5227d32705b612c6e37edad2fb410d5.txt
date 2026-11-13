# CLAUDE.md

@AGENTS.md

Guidance for Claude Code working in this generated TypeScript/Playwright QA
framework. **[AGENTS.md](AGENTS.md) is the authoritative entry point** (imported
above). This file restates only the rules that are easiest to get wrong.

## Non-negotiable rules

- **Dependency direction:** `apps/* → framework-*` only. Never `framework-* → apps/*`,
  never `framework-core → framework-web`, never app-to-app.
- **Never invent selectors, URLs, or credentials.** Use selectors backed by real
  evidence (fixture HTML, page source, existing page objects).
- **Real targets:** `todomvc` → `https://demo.playwright.dev/todomvc` — new tests
  for these apps run against that application (`QAFF_WEB_BASE_URL` overrides it; see
  *Test targets* in AGENTS.md); take selectors from the live page.
- **Prefer Playwright auto-waiting and web-first assertions** over fixed timeouts.

## Where to look

- Conventions, module map, how to add a test → [AGENTS.md](AGENTS.md).
- The generated `smoke.spec.ts` and `*HomePage.ts` are your working examples.
- AI-assisted workflow → [docs/AI_ASSISTED_DEVELOPMENT.md](docs/AI_ASSISTED_DEVELOPMENT.md).

## Before you finish

Run `qaff verify --project .` and `npm test`.
