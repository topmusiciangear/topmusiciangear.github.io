const fs = require("fs");
const files = fs.readdirSync("guides").filter(f => f.endsWith(".html"));
let issues = [], capIssues = [];
files.forEach(f => {
  const h = fs.readFileSync("guides/" + f, "utf8");
  const t = (h.match(/<title>(.*?)<\/title>/) || [])[1] || "";
  const h1 = (h.match(/<h1[^>]*>(.*?)<\/h1>/) || [])[1] || "";
  const og = (h.match(/property="og:title" content="(.*?)"/) || [])[1] || "";
  if (t !== h1 + " | TopMusicianGear") issues.push(f + ': TITLE!=H1 "' + t + '" vs "' + h1 + ' | TopMusicianGear"');
  if (t !== og) issues.push(f + ": TITLE!=OG");
  if (/<title>(BEST|MEJOR|MEJORES|ULTIMATE|COMPLETE|GUÍA|CADENA)|2026/.test(h.match(/<title>(.*?)<\/title>/)[1])) capIssues.push(f + ": " + t);
});
console.log("Total files:", files.length);
console.log("Title/H1/OG issues:", issues.length);
issues.slice(0, 20).forEach(i => console.log("  ", i));
console.log("CAPS/año en <title>:", capIssues.length);
capIssues.slice(0, 10).forEach(i => console.log("  ", i));