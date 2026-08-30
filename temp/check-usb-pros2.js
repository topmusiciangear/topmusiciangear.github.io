const fs=require("fs");
const html=fs.readFileSync("guides/budget-usb-mics.html","utf8");
const ids=[276,279,281,292,284,287,429,277,278,430,280,290,289];
const p=JSON.parse(fs.readFileSync("data/products.json","utf8"));
ids.forEach(id=>{
  const prod=p.find(x=>x.id===id);
  const name=prod?prod.title.split(" ").slice(0,3).join(" "):"?";
  const hasPros=html.includes(`data-id="${id}"`)?html.includes(`data-id="${id}"`)&&html.substring(html.indexOf(`data-id="${id}"`),html.indexOf(`data-id="${id}"`)+500).includes("pros-list"):false;
  // Simpler: check if product card has pros
  const cardStart=html.indexOf(`data-id="${id}"`);
  if(cardStart===-1) { console.log(`${id} ${name}: NO CARD`); return; }
  const card=html.substring(cardStart,cardStart+2000);
  const pros=card.includes("pros-list");
  console.log(`${id} ${name}: pros=${pros}`);
});
