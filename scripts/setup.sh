#!/usr/bin/env bash
# Bootstraps a fresh machine or cloud session for this repo. Safe to re-run.
export PATH="$HOME/.local/bin:$PATH"
cd "$(dirname "$0")/.."

# graphify CLI (the project skill and hooks in .claude/ call it). Needs Python 3.10+, which uv provides.
if ! command -v graphify >/dev/null 2>&1; then
  command -v uv >/dev/null 2>&1 || python3 -m pip install --user --quiet uv || curl -LsSf https://astral.sh/uv/install.sh | sh
  export PATH="$HOME/.local/bin:$PATH"
  uv tool install --quiet graphifyy
fi

# Each package installs its own dependencies (packages are self-contained).
if command -v npm >/dev/null 2>&1; then
  for p in packages/*/ apps/*/; do
    [ -f "$p/package.json" ] && [ ! -d "$p/node_modules" ] && npm install --silent --prefix "$p"
  done
fi
exit 0
