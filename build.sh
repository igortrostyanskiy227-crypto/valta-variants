#!/bin/sh
# Assemble the variants board: page.html is published as an artifact, preview.html opens locally
cd "$(dirname "$0")"
exec node build.mjs
