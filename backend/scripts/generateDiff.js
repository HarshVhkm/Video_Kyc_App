const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const DIFF_PATH = path.join(ROOT, "docs/context/diff.txt");

fs.mkdirSync(path.dirname(DIFF_PATH), { recursive: true });

function git(cmd) {
  return execSync(cmd, { encoding: "utf8" }).trim();
}

let diff = "";

// 1️⃣ Prefer GitHub Actions commit range
const before = process.env.GITHUB_EVENT_BEFORE;
const after = process.env.GITHUB_SHA;

try {
  if (before && after && before !== after) {
    console.log("🟢 Using CI diff range:", before, "→", after);
    diff = git(
      `git diff ${before} ${after} -- backend/src frontend/src`
    );
  } else {
    // 2️⃣ Fallback to HEAD~1 (local or CI)
    console.log("🟡 Falling back to HEAD~1 diff");

    // check if HEAD~1 exists
    try {
      git("git rev-parse HEAD~1");
      diff = git(
        "git diff HEAD~1 HEAD -- backend/src frontend/src"
      );
    } catch {
      console.log("🟡 No previous commit found");
    }
  }
} catch (err) {
  console.error("❌ Diff generation failed:", err.message);
}

// 3️⃣ Final fallback
if (!diff) {
  diff = "NO_RELEVANT_CODE_CHANGES";
}

fs.writeFileSync(DIFF_PATH, diff + "\n");
console.log("✅ diff.txt written");
