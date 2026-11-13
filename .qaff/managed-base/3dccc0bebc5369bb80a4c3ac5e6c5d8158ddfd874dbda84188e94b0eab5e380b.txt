# Prompt — analyze Allure results

Use this prompt with a general-purpose agent (the **Failure Analyst**
at `.ai/agents/failure-analyst.agent.md` is a good fit when triaging
failing tests from the result set).

## Provide

- The root `allure-results/` written by the allure-playwright reporter
  during `npm test`. Every app and layer shares that one directory;
  each result belongs to the app and layer in its spec path
  (`<app-id>/<layer>/tests/…`). `qaff analyze-failures --project .
  --all-apps --all-layers` and the local MCP tool `read_test_results`
  split it per app and layer for you.
- (Optional) The results of previous runs, so the agent can see
  flakiness and trend — allure-playwright keeps no history on its own.

## Ask for

1. **Headline numbers** — total / passed / failed / broken / skipped.
2. **Top 3 failures** by frequency or by severity.
3. **New failures** — tests that passed in the prior run and
   failed in this one.
4. **Newly stable** — tests that failed in the prior run and pass
   now.
5. **Open questions** — anything ambiguous in the data, phrased as
   one-line questions to the human.

## Reject the result if

- It invents test names or counts not present in the input.
- It claims a test was opened as a Jira ticket — the agent has no
  Jira access.
