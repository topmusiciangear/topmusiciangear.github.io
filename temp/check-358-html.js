const fs=require("fs");
// Find which guides use product 358
const g=JSON.parse(fs.readFileSync("data/guides.json","utf8"));
g.forEach(guide=>{
  const allIds=guide.sections?guide.sections.flatMap(s=>s.products||[]):[];
  if(allIds.includes(358)) {
    console.log("Guide:", guide.id, "->", guide.title.substring(0,60));
  }
});
// Check the HTML for AT875R image
const html=fs.readFileSync("guides/best-shotgun-mics.html","utf8");
const idx=html.indexOf("AT875R");
if(idx>-1) {
  const area=html.substring(idx,idx+2000);
  const imgMatch=area.match(/src="([^"]+)"/);
  console.log("Image in HTML:", imgMatch?imgMatch[1].substring(0,100):"NOT FOUND");
}
