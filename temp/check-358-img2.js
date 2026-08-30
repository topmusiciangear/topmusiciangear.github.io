const fs=require("fs");
const html=fs.readFileSync("guides/best-shotgun-mics.html","utf8");
const atIdx=html.indexOf("AT875R");
if(atIdx>-1) {
  const area=html.substring(Math.max(0,atIdx-2000),atIdx+500);
  const imgs=area.match(/<img[^>]+>/g);
  if(imgs) imgs.forEach(img=>console.log("IMG:", img.substring(0,200)));
  else console.log("No img tags found near AT875R");
  // Check if zzounds image is anywhere in the guide
  const zzFound=html.includes("at875r_1_sq");
  console.log("zzounds image in guide:", zzFound);
}
