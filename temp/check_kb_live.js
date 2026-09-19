const https = require("https");
https.get("https://topmusiciangear.com/guides/best-keyboard.html", function (r) {
  let d = "";
  r.on("data", function (c) { d += c; });
  r.on("end", function () {
    const t = d.match(/<title>([^<]*)</);
    const h = d.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
    const ogt = d.match(/property="og:title" content="([^"]*)"/);
    const twt = d.match(/name="twitter:title" content="([^"]*)"/);
    const m = d.match(/name="description" content="([^"]*)"/);
    const ogd = d.match(/property="og:description" content="([^"]*)"/);
    console.log("TITLE:   " + (t ? t[1] : "NO"));
    console.log("H1:      " + (h ? h[1].replace(/<[^>]+>/g, "").trim() : "NO"));
    console.log("OG:      " + (ogt ? ogt[1] : "NO"));
    console.log("TW:      " + (twt ? twt[1] : "NO"));
    console.log("DESC:    " + (m ? m[1] : "NO"));
    console.log("OG DESC: " + (ogd ? ogd[1] : "NO"));
  });
}).on("error", function (e) { console.log("ERR " + e.message); });