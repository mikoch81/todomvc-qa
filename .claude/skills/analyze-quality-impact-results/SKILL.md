---
name: analyze-quality-impact-results
description: Interpret Quality Impact evaluation output (thresholds, baseline comparison, trend).
argument-hint: 'optional report path or app id'
user-invocable: true
context: fork
agent: performance-analyst
---

Read `.ai/prompts/analyze-quality-impact-results.md` and apply it to: $ARGUMENTS

The prompt file is the source of truth; this skill only makes it invocable as
`/analyze-quality-impact-results`. Keep every rule from `AGENTS.md` and `.ai/instructions/`.
