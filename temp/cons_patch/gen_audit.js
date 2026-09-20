const fs = require("fs");
const path = require("path");

const dir = __dirname;
const files = fs
  .readdirSync(dir)
  .filter((f) => /^part\d+\.js$/.test(f))
  .sort((a, b) => parseInt(a.match(/\d+/)[0], 10) - parseInt(b.match(/\d+/)[0], 10));

const out = [];
for (const f of files) {
  const m = require(path.join(dir, f));
  const keys = Object.keys(m).sort();
  out.push("===== " + f + " (" + keys.length + " keys) =====");
  for (const k of keys) {
    const v = m[k];
    const en = Array.isArray(v[0]) ? v : [v];
    for (const pair of en) {
      out.push(k + "\tEN: " + pair[0] + "\tES: " + pair[1]);
    }
  }
  out.push("");
}

fs.writeFileSync(path.join(dir, "audit_dump.txt"), out.join("\n"), "utf8");
console.log("wrote audit_dump.txt with " + out.length + " lines");
