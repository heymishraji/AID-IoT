#!/usr/bin/env bash
# Puts the brand fonts and GSAP beside a video composition, because the render browser in a cloud session
# cannot reach CDNs. Usage: scripts/video-kit.sh <composition-folder>
set -e
out="${1:?usage: scripts/video-kit.sh <composition-folder>}"
root="$(cd "$(dirname "$0")/.." && pwd)"
mkdir -p "$out/vendor"
cp "$root"/packages/brand-library/core/fonts/files/* "$out/vendor/"
cd "$out/vendor"
npm pack --silent gsap@3.14.2 >/dev/null
tar xzf gsap-3.14.2.tgz package/dist/gsap.min.js
mv package/dist/gsap.min.js .
rm -rf package gsap-3.14.2.tgz
