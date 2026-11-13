---
name: review-generated-test
description: Review an AI-generated test against the generated-test review contract.
argument-hint: 'path(s) of the generated test files'
user-invocable: true
context: fork
agent: code-reviewer
---

Read `.ai/prompts/review-generated-test.md` and apply it to: $ARGUMENTS

The prompt file is the source of truth; this skill only makes it invocable as
`/review-generated-test`. Keep every rule from `AGENTS.md` and `.ai/instructions/`.
