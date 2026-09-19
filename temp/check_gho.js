const fs = require("fs");
for (const f of ["guides/best-guitar-home-office.html", "guides/best-guitar-home-office_es.html"]) {
  const d = fs.readFileSync(f, "utf8");
  const t = d.match(/<title>([^<]*)</);
  const h = d.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  const m = d.match(/name="description" content="([^"]*)"/);
  console.log(f + ":");
  console.log("  TITLE: " + (t ? t[1] : "NO"));
  console.log("  H1:    " + (h ? h[1].replace(/<[^>]+>/g, "").trim() : "NO"));
  console.log("  DESC:  " + (m ? m[1] : "NO") + "\n");
}