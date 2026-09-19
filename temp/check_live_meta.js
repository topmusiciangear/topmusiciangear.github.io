const https = require("https");
const urls = [
  "https://topmusiciangear.com/guides/best-guitar-home-office.html",
  "https://topmusiciangear.com/guides/best-guitar-home-office_es.html"
];
let done = 0;
urls.forEach(function(u) {
  https.get(u, function(r) {
    let d = "";
    r.on("data", function(c) { d += c; });
    r.on("end", function() {
      const m = d.match(/<meta name="description" content="([^"]*)"/);
      const t = d.match(/<title>([^<]*)</);
      console.log(u.split("/").pop() + ":\n  TITLE: " + (t ? t[1] : "NO TITLE"));
      console.log("  DESC:  " + (m ? m[1] : "NO META") + "\n");
      if (++done === urls.length) process.exit(0);
    });
  }).on("error", function(e) {
    console.log(u + ": ERR " + e.message);
    if (++done === urls.length) process.exit(0);
  });
});