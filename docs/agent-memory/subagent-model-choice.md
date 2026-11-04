---
name: subagent-model-choice
description: Which model to give helper agents — Sonnet by default, Opus when the result is crucial
metadata:
  type: feedback
---

Helper agents default to Sonnet (CLAUDE_CODE_SUBAGENT_MODEL=sonnet set in ~/.claude/settings.json and the
AID repo's .claude/settings.json, 2026-10-29). Pass `model: "opus"` explicitly for agents whose output
decides or changes the result (brand rules, structure changes, final copy, design direction, recommendations
the user will act on, hard-to-undo actions). Haiku only for mechanical lookups.

**Why:** /usage showed general-purpose subagents were 18% of the user's usage; the user wants research and
analysis cheap but crucial reasoning on a stronger model.

**How to apply:** pick the model per agent call by asking "would a weaker answer here change our output?"
Related: [[aid-iot-working-style]].
