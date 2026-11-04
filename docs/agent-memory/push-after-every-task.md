---
name: push-after-every-task
description: Always commit and push the AID repo to GitHub when a piece of work is done
metadata:
  node_type: memory
  type: feedback
  originSessionId: d89e30f3-003a-4eee-a268-a1e13390fdac
  modified: 2026-10-28T09:13:50.291Z
---

After every completed piece of work on the AID project, commit and push to GitHub (main, plus any new tags).

**Why:** the user may lose access to this laptop and must be able to continue from a virtual/cloud computer
straight from GitHub without anything missing.

**How to apply:** end each task with commit + `git push origin main` (and `--tags` when tags were added);
keep project-level tooling (skills, setup script) in the repo so a fresh clone works. See [[aid-iot-project-home]].
