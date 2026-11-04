#!/usr/bin/env bash
# Bootstraps a fresh machine or cloud session for this repo. Safe to re-run.
export PATH="$HOME/.local/bin:$PATH"
cd "$(dirname "$0")/.."
command -v npm >/dev/null 2>&1 || { [ -s "$HOME/.nvm/nvm.sh" ] && . "$HOME/.nvm/nvm.sh"; }

# graphify CLI (the project skill and hooks in .claude/ call it). Needs Python 3.10+, which uv provides.
if ! command -v graphify >/dev/null 2>&1; then
  command -v uv >/dev/null 2>&1 || python3 -m pip install --user --quiet uv || curl -LsSf https://astral.sh/uv/install.sh | sh
  export PATH="$HOME/.local/bin:$PATH"
  uv tool install --quiet graphifyy
fi

# Each package installs its own dependencies (packages are self-contained) and builds dist/, which is
# gitignored but linked from docs/studies/identity-round-1/ui-previews.
if command -v npm >/dev/null 2>&1; then
  for p in packages/*/ apps/*/; do
    [ -f "$p/package.json" ] || continue
    [ -d "$p/node_modules" ] || npm install --silent --prefix "$p"
    [ -d "$p/dist" ] || npm run --silent build --prefix "$p"
  done
fi

# ffmpeg for video work. The cloud image lacks it; installed in the background so sessions start quickly.
if [ "$CLAUDE_CODE_REMOTE" = "true" ] && ! command -v ffmpeg >/dev/null 2>&1; then
  SUDO=""; [ "$(id -u)" = "0" ] || SUDO="sudo -n"
  nohup sh -c "$SUDO apt-get update -qq && $SUDO apt-get install -y -qq ffmpeg" >/tmp/aid-ffmpeg.log 2>&1 &
fi
exit 0
