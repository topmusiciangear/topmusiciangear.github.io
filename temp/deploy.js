/* DEPLOY WRAPPER - runs validation, then commit/push */
const { execSync } = require("child_process");

console.log("=== DEPLOY WRAPPER ===");

// 1. Run validation first
console.log("0. Running guides validation...");
try {
  execSync("node validate-guides.js", { stdio: "inherit" });
} catch (e) {
  console.error("❌ VALIDATION FAILED - Deploy aborted");
  process.exit(1);
}

const msg = process.argv[2] || "deploy";
console.log("1. git add -A");
execSync("git add -A", { stdio: "inherit" });
console.log("2. git commit");
try {
  execSync(`git commit -m "${msg}"`, { stdio: "inherit" });
} catch (e) {
  console.log("   No changes to commit");
}
console.log("3. git push");
execSync("git push", { stdio: "inherit" });
console.log("4. Trigger Pages build");
try {
  execSync("gh api repos/topmusiciangear/topmusiciangear.github.io/pages/builds -X POST", { stdio: "inherit" });
} catch (e) {
  console.log("   gh trigger skipped");
}
console.log("=== DONE ===");