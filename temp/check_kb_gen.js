const fs = require("fs");
for (const f of ["guides/best-keyboard.html", "guides/best-keyboard_es.html"]) {
  const d = fs.readFileSync(f, "utf8");
  const t = d.match(/<title>([^<]*)</);
  const h = d.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  const ogt = d.match(/property="og:title" content="([^"]*)"/);
  const m = d.match(/name="description" content="([^"]*)"/);
  console.log("== " + f);
  console.log("TITLE: " + (t ? t[1] : "NO"));
  console.log("H1:    " + (h ? h[1].replace(/<[^>]+>/g, "").trim() : "NO"));
  console.log("OG:    " + (ogt ? ogt[1] : "NO"));
  console.log("DESC:  " + (m ? m[1] : "NO"));
}