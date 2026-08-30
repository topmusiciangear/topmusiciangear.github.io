const fs=require("fs");
const p=JSON.parse(fs.readFileSync("data/products.json","utf8"));

const yetinano=p.find(x=>x.id===429);
yetinano.stores.gear4music="https://www.gear4music.com/Recording/Blue-Yeti-Nano-USB-Condenser-Microphone-3U2R";

const t669=p.find(x=>x.id===430);
// No gear4music listing for T669

fs.writeFileSync("data/products.json", JSON.stringify(p, null, 2), "utf8");
console.log("Added gear4music store URL for Blue Yeti Nano");
