---
name: review-new-test
description: Review a newly written test against framework conventions and policies.
argument-hint: 'path(s) of the test/page-object files to review'
user-invocable: true
context: fork
agent: code-reviewer
---

Read `.ai/prompts/review-new-test.md` and apply it to: $ARGUMENTS

The prompt file is the source of truth; this skill only makes it invocable as
`/review-new-test`. Keep every rule from `AGENTS.md` and `.ai/instructions/`.
