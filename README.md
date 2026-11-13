# TodoMVC — web and API test automation showcase

[![CI](https://github.com/mikoch81/todomvc-qa/actions/workflows/playwright.yml/badge.svg)](https://github.com/mikoch81/todomvc-qa/actions/workflows/playwright.yml)
[![Allure report](https://img.shields.io/badge/Allure-latest%20report-blue)](https://mikoch81.github.io/todomvc-qa/)

A working example of the test framework I deliver to clients, in its TypeScript
edition: browser tests on desktop and on a phone-sized screen, API tests, a pipeline
that runs them on every change, and a report anyone on the team can read.

- **Web application under test:** [TodoMVC](https://demo.playwright.dev/todomvc), the
  to-do list the Playwright team publishes for test-automation practice.
- **API under test:** [Restful-Booker](https://restful-booker.herokuapp.com/apidoc/index.html),
  a public practice API for hotel bookings with a login and create / read / update /
  delete. TodoMVC has no backend of its own, so the API tests use a second system.
- **Latest test report:** <https://mikoch81.github.io/todomvc-qa/> — rebuilt by every
  pipeline run on `main`.
- **Stack:** TypeScript, Playwright, npm workspaces, Allure 3, GitHub Actions.

The Java edition of the same framework: [swag-labs-qa](https://github.com/mikoch81/swag-labs-qa).

## What is tested

19 tests, about 5 seconds on a laptop.

| Area | Scenario | Layer |
| --- | --- | --- |
| To-do list | The page renders | web, desktop |
| To-do list | Todos appear in the order typed and are counted | web, desktop |
| To-do list | A todo that is only spaces is ignored | web, desktop |
| To-do list | Completing a todo strikes it and lowers the counter | web, desktop |
| To-do list | A todo is renamed on double click | web, desktop |
| To-do list | A todo is deleted | web, desktop |
| To-do list | Active and completed todos can be filtered | web, desktop |
| To-do list | "Clear completed" removes only the completed todos | web, desktop |
| To-do list | Todos and their state survive a page reload | web, desktop |
| To-do list | The page renders on a Pixel 7 screen | web, mobile |
| To-do list | A todo is added and completed with touch input | web, mobile |
| Bookings | The service is up | API |
| Bookings | Wrong credentials get no token | API |
| Bookings | A created booking is returned as sent | API |
| Bookings | A created booking is found by guest name | API |
| Bookings | Updating a booking needs a token | API |
| Bookings | A token holder changes the price and the dates | API |
| Bookings | A deleted booking is gone | API |
| Framework | The API layer answers offline against a built-in stub | API |

The tests live under [`apps/todomvc`](apps/todomvc) —
[`web-desktop/tests`](apps/todomvc/web-desktop/tests),
[`web-mobile/tests`](apps/todomvc/web-mobile/tests),
[`api/tests`](apps/todomvc/api/tests) — and read like the table above:

```ts
test("clear completed removes only the completed todos", async () => {
  await todos.add(MILK, BILLS, GYM);
  await todos.complete(MILK);
  await todos.complete(GYM);

  await todos.clearCompletedButton.click();

  await expect(todos.items).toHaveText([BILLS]);
  await expect(todos.clearCompletedButton).toBeHidden();
});
```

```ts
test("updating a booking needs a token", async ({}, testInfo) => {
  const booking = newBooking(testInfo.title);
  const id = await create(booking);

  const response = await api.put(`/booking/${id}`, { data: { ...booking, totalprice: 1 } });

  expect(response.status()).toBe(403);
  expect((await (await read(id)).json()).totalprice).toBe(booking.totalprice);
});
```

## What you get with the framework

- **Page objects** — one class per screen
  ([`TodoPage.ts`](apps/todomvc/web-desktop/pages/TodoPage.ts)), so a change in the
  application is fixed in one place, not in every test.
- **Locators a user would recognise** — roles, labels and test ids, not brittle CSS
  paths.
- **No fixed sleeps** — every assertion waits for the condition and retries.
- **Web, mobile and API in one run** — one command, one report; each layer can also
  run alone.
- **Readable reports** — an Allure report, a screenshot for every failed test, and in
  the pipeline a step-by-step trace of what the browser did before the failure.
- **Pipeline** — GitHub Actions runs the tests on every push and pull request and
  every weekday morning; the report is published to GitHub Pages.
- **Clear layering** — shared code in `framework-core`, `framework-web` and
  `framework-api`, tests per application under `apps/`, type-checked before every run.

## Ready for AI assistants

The repository carries the instructions an AI coding assistant needs to add tests the
same way a team member would:

- [`AGENTS.md`](AGENTS.md) / [`CLAUDE.md`](CLAUDE.md) — project map, conventions, how
  to run and verify.
- [`.ai/`](.ai) — task prompts (write a test from a scenario, review a test, analyse a
  failure, repair a locator).
- [`.claude/`](.claude) — the same tasks as ready-to-use skills for Claude Code.
- [`.mcp.json`](.mcp.json) — a local tool server that lets the assistant read test
  results and failures. It runs on your machine only and sends nothing outside.

See [`docs/AI_ASSISTED_DEVELOPMENT.md`](docs/AI_ASSISTED_DEVELOPMENT.md).

## Run it yourself

You need Node.js 20 or newer.

```bash
npm install
npx playwright install               # downloads the browsers, first time only
npm test                             # type-check, then everything
npx playwright test --project=api    # one layer: web-desktop, web-mobile or api
npm run test:headed                  # watch the browser
npm run test:report                  # open the HTML report of the last run
npm run allure:report                # build the Allure report under allure-report/
```

## How it is maintained

The framework skeleton — workspace setup, base classes, pipeline, documentation — is
produced from one configuration file by my own generator, so every client starts from
the same proven base. Improvements to that base arrive later as a reviewed update that
keeps the tests and edits written in the repository. The repository itself is plain
npm, TypeScript and Playwright: it installs and runs without the generator.

More detail: [`docs/HOW_TO_USE_ALLURE.md`](docs/HOW_TO_USE_ALLURE.md),
[`docs/locator-policy.md`](docs/locator-policy.md),
[`docs/quality-gates.md`](docs/quality-gates.md).

---

TodoMVC here is a practice site owned by the Playwright project, and Restful-Booker is
a practice API by Mark Winteringham. This project is not affiliated with either and
runs functional tests only — no load is generated against them.
