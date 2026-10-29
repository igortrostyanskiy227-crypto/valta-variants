#!/bin/sh
# Assemble the banker-page board: banker.html is published, bpreview.html opens locally
cd "$(dirname "$0")"
cat bsrc/[0-9]*.html > banker.html
{ printf '<!doctype html>\n<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"></head><body>\n'; cat banker.html; printf '\n</body></html>\n'; } > bpreview.html
