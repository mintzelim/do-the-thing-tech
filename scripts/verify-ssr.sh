#!/usr/bin/env bash
set -euo pipefail

BASE="${BASE:-http://127.0.0.1:4101}"
tmpdir="$(mktemp -d)"
trap 'rm -rf "$tmpdir"' EXIT

check_page() {
  local path="$1" needle="$2" title="$3"
  local body="$tmpdir/page.html"
  local status
  status="$(curl -s -o "$body" -w '%{http_code}' "$BASE$path")"
  test "$status" = "200"
  grep -Fq "$needle" "$body"
  grep -Fq "<title>$title</title>" "$body"
  test "$(grep -o '<link rel="canonical"' "$body" | wc -l | tr -d ' ')" = "1"
  test "$(grep -o '<meta property="og:title"' "$body" | wc -l | tr -d ' ')" = "1"
  grep -Fq 'application/ld+json' "$body"
}

check_page "/" "Make the next thing doable" "DoTheThing | Free ADHD Task Breakdown Tool"
check_page "/blog" "Find the next useful read" "ADHD Task Management Guides | DoTheThing Blog"
check_page "/blog/adhd-in-women" "ADHD in Women: The Symptoms Nobody Told You About" "ADHD in Women: The Symptoms Nobody Told You About | DoTheThing Blog"

missing="$tmpdir/missing.html"
test "$(curl -s -o "$missing" -w '%{http_code}' "$BASE/blog/not-a-real-post")" = "404"
grep -Fq 'noindex, follow' "$missing"

echo "SSR verification passed"
