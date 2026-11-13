---
name: analyze-allure-results
description: Summarize local Allure results: failures by category, failing steps and next actions.
argument-hint: 'optional results directory or run reference'
user-invocable: true
context: fork
agent: failure-analyst
---

Read `.ai/prompts/analyze-allure-results.md` and apply it to: $ARGUMENTS

The prompt file is the source of truth; this skill only makes it invocable as
`/analyze-allure-results`. Keep every rule from `AGENTS.md` and `.ai/instructions/`.
