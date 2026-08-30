const fs=require("fs");
const g=JSON.parse(fs.readFileSync("data/guides.json","utf8"));
const guide=g.find(x=>x.id==="budget-usb-mics");

// Add Blue Yeti Nano section after section 8 (NT-USB Mini)
const yetnano = {
  products: [429],
  content: '<strong>At the Yeti Nano is the compact condenser that gives you Blue\'s studio pedigree at a budget price.</strong> It uses the same 24-bit/48 kHz recording quality as Blue\'s full-size Yeti, but in a much smaller body that fits any desk without dominating it. The cardioid capsule captures clear, natural voice for streaming, podcasting and video calls, and Blue VO!CE software adds voice effects and EQ if you want to shape your sound. The headphone jack gives zero-latency monitoring, and the built-in stand adjusts for angle. As a condenser it prefers a quieter room, and there\'s no XLR output for future upgrades, but at this price the build quality and Blue\'s tuning make it a legitimate step up from generic budget condensers.',
  content_es: '<strong>El Yeti Nano es el condensador compacto que te da el pedigree de estudio de Blue a un precio económico.</strong> Usa la misma calidad de grabación de 24-bit/48 kHz que el Yeti completo de Blue, pero en un cuerpo mucho más pequeño que cabe en cualquier escritorio sin dominarlo. La cápsula cardioide captura voz clara y natural para streaming, podcasting y videollamadas, y el software Blue VO!CE añade efectos de voz y EQ si quieres moldear tu sonido. El auricular ofrece monitoreo sin latencia, y el soporte integrado se ajusta como ángulo. Como condensador prefiere una sala más tranquila, y no tiene salida XLR para futuras actualizaciones, pero a este precio la calidad de construcción y el tuning de Blue lo convierten en un paso legítimo por encima de los condensadores genéricos económicos.'
};

// Add FIFINE T669 section after section 11 (Maono PM461)
const t669 = {
  products: [430],
  content: '<strong>At the FIFINE T669 is the complete starter kit for anyone who wants a USB mic and every accessory in one box.</strong> It includes a cardioid condenser microphone, a boom arm, a pop filter, a shock mount and a tripod — everything you need to start recording without buying anything extra. The USB connection is plug-and-play on PC and Mac, the condenser capsule delivers clear voice for podcasting, streaming and gaming, and the included accessories mean you\'re set up in minutes. The honest trade-offs: as a condenser it picks up room noise more than a dynamic, the boom arm is light for heavy daily use, and there\'s no XLR output. But at this price, getting a full kit with decent sound quality is rare — the T669 is the best all-in-one starter package on this list.',
  content_es: '<strong>El FIFINE T669 es el kit completo para principiantes que quieren un micrófono USB con todos los accesorios en una caja.</strong> Incluye un micrófono condensador cardioide, un brazo articulado, un filtro pop, un shock mount y un trípode — todo lo que necesitas para empezar a grabar sin comprar nada extra. La conexión USB es plug-and-play en PC y Mac, la cápsula condensadora ofrece voz clara para podcasting, streaming y gaming, y los accesorios incluidos te permiten configurarte en minutos. Los compromisos honestos: como condensador captura más ruido de sala que un dinámico, el brazo se siente ligero para uso intensivo diario, y no tiene salida XLR. Pero a este precio, obtener un kit completo con calidad de sonido decente es raro — el T669 es el paquete todo-en-uno para principiantes de esta lista.'
};

// Insert after section 8 (NT-USB Mini review) - Yeti Nano goes here
guide.sections.splice(9, 0, yetnano);
// Insert after section 12 (was 11, now shifted) - T669 goes after PM461
guide.sections.splice(13, 0, t669);

console.log("Total sections:", guide.sections.length);
console.log("Section 9 products:", guide.sections[9].products);
console.log("Section 13 products:", guide.sections[13].products);

fs.writeFileSync("data/guides.json", JSON.stringify(g, null, 2), "utf8");
console.log("Added Blue Yeti Nano + FIFINE T669 review sections");
