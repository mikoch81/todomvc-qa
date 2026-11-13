# Prompt — review a newly added test

Use this prompt with the **Code Reviewer** agent
(`.ai/agents/code-reviewer.agent.md`).

## Provide

- The diff of the new spec and any new page object / fixture.
- The path of the spec inside the repository.

## Ask for

For each file, the reviewer's checklist verdict in this exact format:

```
file: <path>
finding: <category — one-line problem>
fix: <one-line suggestion>
severity: blocking | major | minor | nit
```

If everything passes, the agent should respond with a single
"`approved`" line.

## Reject the review if

- It is generic praise without referencing the checklist.
- It claims compliance with a tool (MCP, Jira, Jenkins) that is not
  wired in this repository.
