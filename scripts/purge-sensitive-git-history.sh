#!/usr/bin/env bash
# Rewrite Git history to drop sensitive blobs listed in purge-sensitive-git-history.paths.
# See docs/adr/0003-master-storage-and-history-purge.md.
#
# Run once from a clean working tree. Backs up evidence masters and the two JSON
# datasets, rewrites history, restores local-only evidence, and recommits the
# datasets so the pipeline keeps working.
#
# After this script succeeds, force-push master and tell every collaborator to
# re-clone or hard-reset. Existing clones retain the pre-purge history locally.

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

PATHS_FILE="$ROOT/scripts/purge-sensitive-git-history.paths"
BACKUP_DIR="$(mktemp -d)"
EVIDENCE_BACKUP="$BACKUP_DIR/evidence"
DATA_BACKUP="$BACKUP_DIR/data"

if ! command -v git-filter-repo >/dev/null 2>&1; then
  echo "git-filter-repo is required. Install with: brew install git-filter-repo"
  exit 1
fi

if ! git diff --quiet || ! git diff --cached --quiet; then
  echo "Staged or unstaged changes to tracked files must be committed before the purge."
  exit 1
fi

echo "Backing up evidence masters and operational datasets to $BACKUP_DIR"
if [[ -d research/concept-reviews/evidence ]]; then
  cp -R research/concept-reviews/evidence "$EVIDENCE_BACKUP"
fi
mkdir -p "$DATA_BACKUP"
cp src/data/businesses.json "$DATA_BACKUP/"
cp research/verifications.json "$DATA_BACKUP/"

echo "Rewriting history (this may take a minute)..."
git filter-repo --force \
  --invert-paths \
  --paths-from-file "$PATHS_FILE"

echo "Restoring local-only evidence masters"
if [[ -d "$EVIDENCE_BACKUP" ]]; then
  mkdir -p research/concept-reviews
  rm -rf research/concept-reviews/evidence
  cp -R "$EVIDENCE_BACKUP" research/concept-reviews/evidence
fi

echo "Recommitting operational datasets"
cp "$DATA_BACKUP/businesses.json" src/data/businesses.json
cp "$DATA_BACKUP/verifications.json" research/verifications.json
git add src/data/businesses.json research/verifications.json
git commit -m "$(cat <<'EOF'
Restore operational datasets after sensitive-history purge.

Businesses and verification JSON were removed from every commit by the
PLAN.md §6.2 history rewrite. Current working copies are recommitted so the
site and pipeline keep working. Evidence masters stay git-ignored on disk only.

EOF
)"

rm -rf "$BACKUP_DIR"

echo ""
echo "History purge complete."
echo "Verify with: git log --all --name-only -- public/images/castle-farm-box.jpg"
echo "Then force-push master and ask collaborators to re-clone."
