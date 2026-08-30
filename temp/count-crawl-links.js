const fs=require("fs");
let html=fs.readFileSync("index.html","utf8");
// Count total links in crawl-guides
const start = html.indexOf("<div class=\"crawl-guides\">");
const end = html.indexOf("</div>", html.indexOf("<div class=\"crawl-guides\">"));
if(start>=0 && end>start){
  const section = html.substring(start, end);
  const links = section.match(/<a href="\/guides\/[^"]+"/g);
  console.log("Total links in crawl-guides:", links ? links.length : 0);
  // Check for IEM
  const iemLinks = links ? links.filter(l => l.includes("in-ear") || l.includes("iem") || l.includes("best-in-ear") || l.includes("ew-iem") || l.includes("wireless-iems")) : [];
  console.log("IEM links:", iemLinks.length);
  iemLinks.forEach(l=>console.log("  ", l));
}
