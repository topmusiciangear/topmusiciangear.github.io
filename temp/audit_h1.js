const fs = require("fs");
const files = fs.readdirSync("guides").filter(f => f.endsWith(".html"));
const bad = [];
for (const f of files) {
  const d = fs.readFileSync("guides/" + f, "utf8");
  const t = d.match(/<title>([^<]*)</);
  const h = d.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  const ogt = d.match(/property="og:title" content="([^"]*)"/);
  const twt = d.match(/name="twitter:title" content="([^"]*)"/);
  const title = t ? t[1] : "";
  const h1 = h ? h[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim() : "";
  const og = ogt ? ogt[1] : "";
  const tw = twt ? twt[1] : "";
  const core = title.replace(/ ?\| ?TopMusicianGear$/, "").trim();
  const issues = [];
  if (core !== h1) issues.push("H1≠TITLE: H1=" + h1);
  if (og !== title) issues.push("OG≠TITLE: OG=" + og);
  if (tw !== title) issues.push("TW≠TITLE: TW=" + tw);
  if (issues.length) bad.push(f + " :: " + issues.join(" | "));
}
if (bad.length) fs.writeFileSync("temp/audit_h1_out.txt", bad.join("\n"));
console.log(bad.length ? bad.length + " ficheros con issues -> temp/audit_h1_out.txt" : "ALL TITLE/H1/OG/TW CLEAN");