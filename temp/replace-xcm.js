var fs = require('fs');
var g = require('../data/guides.json');
var i = g.findIndex(x => x.id === 'budget-usb-mics');
var guide = g[i];

// Replace id 290 with 439 in sections
guide.sections[6].products = guide.sections[6].products.map(x => x === 290 ? 439 : x);
guide.sections[10].products = guide.sections[10].products.map(x => x === 290 ? 439 : x);

// Replace in featuredProducts
guide.featuredProducts = guide.featuredProducts.map(x => x === 290 ? 439 : x);

// Replace verdictProsCons[8] (Rode XCM-50) with HyperX SoloCast
guide.verdictProsCons[8] = {
  name: "HyperX SoloCast USB Condenser Microphone",
  name_es: "Micrófono USB Condensador HyperX SoloCast",
  pros: [
    "Compact and lightweight — fits under monitors",
    "Tap-to-mute with LED indicator — instant mute on stream",
    "24-bit/96kHz Hi-Res audio — studio-level detail",
    "USB-C plug-and-play — no drivers needed",
    "Boom arm compatible with 3/8\" and 5/8\" threads"
  ],
  pros_es: [
    "Compacto y ligero — cabe debajo de monitores",
    "Silencio táctil con indicador LED — silencio instantáneo en stream",
    "Audio Hi-Res de 24 bits/96 kHz — detalle de nivel de estudio",
    "USB-C plug-and-play — sin drivers necesarios",
    "Compatible con brazo de soporte con roscas de 3/8\" y 5/8\""
  ],
  cons: [
    "No headphone jack — no live monitoring",
    "No gain control — relies on software adjustment",
    "Condenser picks up room noise in untreated spaces"
  ],
  cons_es: [
    "Sin jack de auriculares — sin monitorización en vivo",
    "Sin control de ganancia — depende del ajuste por software",
    "El condensador captura ruido de la sala en espacios sin tratar"
  ]
};

console.log('sections[6]:', guide.sections[6].products);
console.log('sections[10]:', guide.sections[10].products);
console.log('featuredProducts:', guide.featuredProducts);
console.log('verdictProsCons[8].name:', guide.verdictProsCons[8].name);

fs.writeFileSync('./data/guides.json', JSON.stringify(g, null, 2));
console.log('guides.json updated');
