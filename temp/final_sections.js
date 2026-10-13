var fs = require('fs');
var BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
var d = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));
var g = d.find(function (x) { return x.id === 'usb-mics'; });

// 9 product IDs from the table (in order)
var tableIds = [194, 195, 286, 299, 3, 666, 253, 252, 291];

// Only keep sections for table products, and only reference table products
// Section 0: MV7+ only (remove Q2U and NT-USB+ - NT-USB+ will have its own section if needed)
g.sections[0].products = [194];

// Section 1: Wave:3
g.sections[1].products = [195];

// Section 2: AT2040USB
g.sections[2].products = [286];

// Section 3: Profile
g.sections[3].products = [299];

// Section 4: NT1 5th Gen
g.sections[4].products = [3];

// Section 5: Add NT-USB+ section (it's in the table)
var ntusbSection = {
  heading: 'Rode NT-USB+: The Modern Yeti Upgrade',
  heading_es: 'Rode NT-USB+: La actualización moderna del Yeti',
  content: '<p><strong>The Rode NT-USB+ is the direct successor to the classic Yeti line for streamers who want better sound without a mixer.</strong> It moves the preamp and DSP inside the mic: a Revolution preamp with APHEX processing (Aural Exciter, Big Bottom, Compellor) runs on the hardware, so your voice sounds broadcast-ready without software plugins. 24-bit/48kHz conversion, zero-latency headphone output, built-in pop filter, and a desktop tripod with ring mount are all in the box. It replaces the Yeti and Yeti X in our table because it solves the same "one cable, great sound" problem with cleaner internals and no driver fuss.</p>',
  content_es: '<p><strong>El Rode NT-USB+ es el sucesor directo de la línea Yeti clásica para streamers que quieren mejor sonido sin mezcladora.</strong> Mueve el preamplificador y el DSP dentro del micro: un preamplificador Revolution con procesamiento APHEX (Aural Exciter, Big Bottom, Compellor) corre en el hardware, así que tu voz suena lista para broadcast sin plugins de software. Conversión 24-bit/48kHz, salida de auriculares sin latencia, filtro antipop integrado y trípode de escritorio con anillo de montaje vienen en la caja. Reemplaza al Yeti y Yeti X en nuestra tabla porque resuelve el mismo problema "un cable, gran sonido" con internals más limpios y sin líos de drivers.</p>',
  products: [666]
};
g.sections.splice(5, 0, ntusbSection);

// Section 6 (now 6): HyperX QuadCast S (in table)
g.sections[6].products = [253];

// Section 7 (now 7): Razer Seiren V3 Pro (in table)
g.sections[7].products = [252];

// Section 8 (now 8): Samson G-Track Pro (in table)
g.sections[8].products = [291];

// featuredProducts = tableIds
g.featuredProducts = tableIds.slice();

fs.writeFileSync(BASE + 'data/guides.json', JSON.stringify(d, null, 2));
console.log('Sections updated. Count:', g.sections.length);
g.sections.forEach(function(s, i) { console.log(i, s.heading.slice(0, 55), JSON.stringify(s.products)); });
console.log('Featured:', g.featuredProducts);