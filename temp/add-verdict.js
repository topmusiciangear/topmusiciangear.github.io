const fs=require("fs");
const g=JSON.parse(fs.readFileSync("data/guides.json","utf8"));
const guide=g.find(x=>x.id==="budget-usb-mics");

guide.verdictProsCons.push(
  {
    name: "Blue Yeti Nano USB Condenser Microphone",
    name_es: "Micrófono USB Condensador Blue Yeti Nano",
    pros: ["Compact form factor fits any desk", "24-bit/48kHz recording quality", "Blue VO!CE software for voice effects"],
    pros_es: ["Formato compacto cabe en cualquier escritorio", "Calidad de grabación 24-bit/48kHz", "Software Blue VO!CE para efectos de voz"],
    cons: ["No XLR output for future upgrades", "Fixed cardioid/omnidirectional pattern", "Higher price than other budget USB mics"],
    cons_es: ["Sin salida XLR para futuras actualizaciones", "Patrón fijo cardioide/omnidireccional", "Precio más alto que otros mic USB económicos"]
  },
  {
    name: "FIFINE T669 USB Microphone Kit",
    name_es: "Kit de Micrófono USB FIFINE T669",
    pros: ["Complete kit with boom arm and pop filter", "Plug-and-play USB connection", "Budget price with solid build quality"],
    pros_es: ["Kit completo con brazo articulado y filtro pop", "Conexión USB plug-and-play", "Precio económico con buena calidad de construcción"],
    cons: ["Condenser picks up room noise", "No XLR output", "Boom arm feels light for heavy use"],
    cons_es: ["Condensador captura ruido de sala", "Sin salida XLR", "Brazo se siente ligero para uso intensivo"]
  }
);

console.log("verdictProsCons count:", guide.verdictProsCons.length);
fs.writeFileSync("data/guides.json", JSON.stringify(g, null, 2), "utf8");
console.log("Updated");
