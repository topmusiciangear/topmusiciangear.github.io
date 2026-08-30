const fs=require("fs");
const html=fs.readFileSync("guides/best-shotgun-mics.html","utf8");
// Find all img tags with zzounds in src
const zzounds imgs=html.match(/src="[^"]*zzounds[^"]*"/g);
console.log("zzounds images:", zzounds_imgs);
// Find AT875R context
const atIdx=html.indexOf("AT875R");
if(atIdx>-1) {
  // Get surrounding 3000 chars
  const area=html.substring(Math.max(0,atIdx-1000),atIdx+2000);
  const imgs=area.match(/<img[^>]+>/g);
  if(imgs) imgs.forEach(img=>console.log("IMG near AT875R:", img.substring(0,200)));
}
