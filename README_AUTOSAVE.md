Autosave for Codespaces / VS Code

This repository includes a small helper script to periodically commit and push local changes to a remote branch so you don't lose work when a Codespace is stopped or a machine fails.

Files added:
- scripts/autosave_git.sh  — periodic git commit + push to an autosave branch

Quick start

1. Review your .gitignore and make sure you are not committing secrets or large build artifacts.
2. Make the script executable:

   chmod +x scripts/autosave_git.sh

3. Run it in the repository root (default interval: 60s):

   ./scripts/autosave_git.sh 60

Environment variables

- AUTOSAVE_REMOTE: remote name to push to (default: origin)
- AUTOSAVE_BRANCH: override the autosave branch name
- AUTOSAVE_MSG_PREFIX: prefix for commit messages

Security and safety

- Do NOT push secrets (API keys, tokens, private keys). Add them to .gitignore or remove them before running.
- Autosave creates many small commits. You can later squash or cherry-pick the changes you want.

Want me to install this as a VS Code task or a systemd/user service? Ask and I will add it.

VS Code task (auto-run)

There is a VS Code task configured at `.vscode/tasks.json` named "Start Autosave Script".
It runs `scripts/autosave_git.sh 60` in a dedicated terminal when the folder is opened (VS Code supports `runOn: folderOpen`).

To change the interval, edit the `args` value in `.vscode/tasks.json` or run the script manually with a different argument.
To disable automatic start, remove or change the `runOn` property in `.vscode/tasks.json`.
