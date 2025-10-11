Project status — taverna_kolios
=============================

Date: 2025-10-11

Summary
-------
- Current branch: `main`
- Local and remote `main` are in sync. Last commits:
  - `a2fe6ae` 2025-10-10 12:45:27 +0000 sakislaz — test
  - `aa2f801` 2025-10-10 07:32:32 +0300 sakislaz — Initial commit
- There are no uncommitted or staged changes in the working tree.

What I added (autosave safety tooling)
-------------------------------------
- `scripts/autosave_git.sh` — a small bash script that periodically stages, commits and pushes changes to an autosave remote branch. Configure interval by passing seconds as the first argument (default 60).
- `.vscode/settings.json` — enables VS Code auto-save (after 1s) and hot-exit to keep unsaved work between restarts.
- `.vscode/tasks.json` — a task named "Start Autosave Script" configured to run the autosave script on folder open (uses `runOn: folderOpen`).
- `README_AUTOSAVE.md` — usage, safety notes, and how to run or disable autosave.

Current autosave status
-----------------------
- No remote `autosave/...` branches were found (no pushes from the autosave script yet).
- The autosave script process is not running in the Codespace (no `autosave_git.sh` process found).

How autosave is supposed to work (short)
---------------------------------------
1. VS Code auto-saves files to disk after 1s of inactivity.
2. The running `autosave_git.sh` script (if started) checks `git status` every INTERVAL seconds and commits + pushes changes to `origin/autosave/<branch>-<host>-<user>`.
3. The provided VS Code task will start the script automatically on folder open if you allow workspace tasks. If not allowed or if the task was terminated, the script won't run.

How to start autosave now (recommended quick test)
-------------------------------------------------
1. Make sure `.gitignore` excludes secrets and large files.
2. Start the script with a short interval to test (in repository root):

   chmod +x scripts/autosave_git.sh
   ./scripts/autosave_git.sh 10

3. Create or modify a file and save; after ~10s the script should commit and attempt to push.
4. To run detached/background:

   nohup ./scripts/autosave_git.sh 10 >/tmp/autosave.log 2>&1 & disown

5. Verify remote branch and pushes:

   git fetch origin
   git branch -r | grep autosave
   git log origin/autosave/$(git rev-parse --abbrev-ref HEAD)-$(hostname)-$(whoami) --oneline -n 5

Next steps (suggested)
----------------------
- If you want I can start the autosave script in the background in this Codespace and run a small test commit so you can see the autosave branch appear.
- Add a restore helper script that lists autosave branches and helps check out commits.
- Add safe defaults to the autosave script to ignore common directories (node_modules, .env, etc.) so secrets don't get pushed accidentally.

Contact
-------
If you want me to perform any of the next steps (start test run, add restore helper, or add ignores), tell me which and I'll do it now.
