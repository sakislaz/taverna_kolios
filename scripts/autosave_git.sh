#!/usr/bin/env bash
set -euo pipefail

# Simple autosave script for git repositories.
# Usage:
#   chmod +x scripts/autosave_git.sh
#   ./scripts/autosave_git.sh [interval-seconds]
#
# The script will:
#  - detect the current git repo and branch
#  - every INTERVAL seconds, if there are changes, stage and commit them locally
#  - push the current HEAD to a remote branch named like: autosave/<current-branch>-<host>-<user>
#
# Notes:
#  - Configure .gitignore to exclude sensitive files before using (do not push secrets!)
#  - In Codespaces you typically already have git auth configured for pushing
#  - You can control behavior with env vars: AUTOSAVE_REMOTE, AUTOSAVE_BRANCH, AUTOSAVE_MSG_PREFIX

INTERVAL="${1:-60}"
REMOTE="${AUTOSAVE_REMOTE:-origin}"
CURRENT_BRANCH="$(git symbolic-ref --short HEAD 2>/dev/null || echo "detached")"
AUTOSAVE_BRANCH="${AUTOSAVE_BRANCH:-autosave/${CURRENT_BRANCH}-$(hostname)-$(whoami)}"
MSG_PREFIX="${AUTOSAVE_MSG_PREFIX:-Autosave}"

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "Not inside a git repository. Please run this from a repository root or a subfolder." >&2
  exit 1
fi

echo "Autosave starting: interval=${INTERVAL}s remote=${REMOTE} autosave-branch=${AUTOSAVE_BRANCH}"

trap 'echo "Stopping autosave."; exit 0' INT TERM

while true; do
  # Only act when there are unstaged or uncommitted changes
  if [ -n "$(git status --porcelain)" ]; then
    # Make sure user git settings are used; we keep commits small and frequent.
    git add -A
    if git commit -m "${MSG_PREFIX}: $(date -u +'%Y-%m-%dT%H:%M:%SZ')" --quiet; then
      # Push current HEAD to the chosen autosave branch on the remote so we don't disturb your active branch
      if git push "$REMOTE" "HEAD:${AUTOSAVE_BRANCH}" --quiet; then
        echo "Pushed autosave to ${REMOTE}/${AUTOSAVE_BRANCH} at $(date -u +'%Y-%m-%dT%H:%M:%SZ')"
      else
        echo "Push failed (network/auth). Commits are local in your repository." >&2
      fi
    else
      # commit returned non-zero (usually means nothing to commit)
      :
    fi
  fi
  sleep "${INTERVAL}"
done
