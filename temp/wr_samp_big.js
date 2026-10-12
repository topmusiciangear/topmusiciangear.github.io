var fs = require('fs');
var P = 'C:/Users/Daniel/projects/topmusiciangear/';
var guides = JSON.parse(fs.readFileSync(P + 'data/guides.json', 'utf8'));
function bySlug(s) { return guides.filter(function (x) { return (x.slug || x.id) === s; })[0]; }
function setP(gname, path, val) {
  var g = bySlug(gname);
  var parts = path.replace(/\[(\d+)\]/g, '.$1').split('.');
  var o = g;
  for (var i = 0; i < parts.length - 1; i++) o = o[parts[i]];
  o[parts[parts.length - 1]] = val;
}
function rep(gname, path, a, b, expect) {
  var g = bySlug(gname);
  var parts = path.replace(/\[(\d+)\]/g, '.$1').split('.');
  var o = g;
  for (var i = 0; i < parts.length - 1; i++) o = o[parts[i]];
  var k = parts[parts.length - 1];
  var c = o[k].split(a).length - 1;
  if (c !== expect) { console.log('COUNT ' + c + '!=' + expect + ': ' + gname + ' ' + path + ' :: ' + a.slice(0, 60)); process.exit(1); }
  o[k] = o[k].split(a).join(b);
}

// ---- A. samplers: delete dup sections 8,9,10 + verdict 7,8,9 ----
var samp = bySlug('best-hardware-samplers');
if (samp.sections.length !== 11 || samp.verdictProsCons.length !== 10) { console.log('SHAPE, abort'); process.exit(1); }
samp.sections.splice(8, 3);
samp.verdictProsCons.splice(7, 3);
console.log('dups removed');

// ---- B. samplers sections 5,6,7 EN ----
setP('best-hardware-samplers', 'sections[5].content',
  "<p><strong>The best-selling pocket sampler for fast beat sketches and punch-in improv.</strong> The K.O. II captures its surroundings with its built-in mic, chops samples with pressure-sensitive keys and fires live effects, all in an ultraportable chassis.</p><p>Its 128 MB of total memory can run short for complex projects with no traditional song mode. But as a portable, instant fun tool, it stays unbeaten in its category.</p>");
setP('best-hardware-samplers', 'sections[6].content',
  "<p><strong>The true portable standalone station with built-in battery, real speakers, stems and a 7-inch touchscreen built for modern hip-hop.</strong> Live III sketches rhythms on the train, arranges them at the hotel and finishes them in the studio, backed by legendary Akai pads and 3D expression.</p><p>At 3.9 kg it is no pocket toy and its price sits in pro territory. Still, with 6 independent physical outputs and Stems support, it remains the reference all-in-one station for modern hip-hop.</p>");
setP('best-hardware-samplers', 'sections[7].content',
  "<p><strong>The portable standard for producers who prefer traditional vertical-tracker beat composition with total surgical precision.</strong> Eight dedicated stereo audio tracks, built-in digital synth engines and mic at just 350 grams.</p><p>Its vertical-screen, buttons-and-cursor workflow demands weeks of practice. For analytical composers who enjoy structuring music visually and numerically, no portable box goes further.</p>");

// ---- C. samplers V4 EP-133 EN (reuse compact translations) ----
setP('best-hardware-samplers', 'verdictProsCons[4].pros',
  ["The fastest workflow from idea to beat for under \u20AC300", "Punch-in 2.0 effects built to show off live", "Built-in mic and highly pressure-sensitive keys", "Ultra-sleek design that fits any backpack pocket"]);
setP('best-hardware-samplers', 'verdictProsCons[4].cons',
  ["128 MB of total memory limits extra-long samples", "No dedicated song mode for structuring complex arrangements standalone", "Its plastic chassis needs protected, careful transport", "Its internal workflow isn't tuned for comfortable advanced resampling"]);

// ---- D. samplers V5 Live III: real specs EN+ES ----
setP('best-hardware-samplers', 'verdictProsCons[5].pros',
  ["The iconic pad workflow that invented hip-hop, now with four times the power from its Gen 2 8-core CPU", "Song structuring and finishing on its 7-inch touchscreen with integrated Pro Stems", "Huge headroom with 8 GB of RAM, 128 GB internal storage, 32 plugin instances and 16 stereo audio tracks", "Rechargeable battery, built-in speakers and mic, 24-channel USB-C audio, Wi-Fi, Bluetooth and MPC3 OS"]);
setP('best-hardware-samplers', 'verdictProsCons[5].cons',
  ["Its touchscreen can feel cramped in big projects next to a large studio monitor", "At 3.9 kg and 17 inches wide it lives in studio or stage more than backpack", "Battery lasts around 3 hours of real use \u2014 long sessions need mains power", "128 GB fills fast with big libraries on top of 30 GB factory content \u2014 plan for an SSD"]);
setP('best-hardware-samplers', 'verdictProsCons[5].pros_es',
  ["El m\u00edtico flujo de pads que invent\u00f3 el hip-hop, ahora con cuatro veces m\u00e1s potencia gracias a su CPU Gen 2 de 8 n\u00facleos", "Estructuraci\u00f3n y finalizaci\u00f3n de canciones en su t\u00e1ctil de 7 pulgadas con Stems Pro integrado", "Gran margen con 8 GB de RAM, 128 GB internos, 32 instancias de plugins y 16 pistas de audio est\u00e9reo", "Bater\u00eda recargable, altavoces y micro integrados, audio USB-C de 24 canales, Wi-Fi, Bluetooth y MPC3 OS"]);
setP('best-hardware-samplers', 'verdictProsCons[5].cons_es',
  ["La pantalla t\u00e1ctil puede sentirse algo congestionada en proyectos grandes junto a un monitor de estudio grande", "Con 3,9 kg y 17 pulgadas de ancho vive m\u00e1s en estudio o escenario que en mochila", "La bater\u00eda ronda las 3 horas de uso real: las sesiones largas piden enchufe", "Los 128 GB se llenan r\u00e1pido con librer\u00edas grandes sobre 30 GB de f\u00e1brica: conviene un SSD"]);

// ---- E. samplers V6 Tracker EN + 4th con EN/ES ----
setP('best-hardware-samplers', 'verdictProsCons[6].pros',
  ["A full musical-tracker workflow in just 350 grams", "Stereo sampling backed by 4 built-in digital synth engines", "Up to 8 hours of battery plus a premium rigid travel case in the box", "Separate audio tracks over USB straight to your DAW"]);
setP('best-hardware-samplers', 'verdictProsCons[6].cons',
  ["Button-and-cursor navigation demands an initial learning curve", "Its keys' mechanical click can annoy in fully silent rooms", "No classic fast-pad grid for live rhythm improv", "No built-in speaker \u2014 monitoring needs headphones or USB audio"]);
bySlug('best-hardware-samplers').verdictProsCons[6].cons_es.push("Sin altavoz integrado: el monitoreo exige auriculares o audio USB");

fs.writeFileSync(P + 'data/guides.json', JSON.stringify(guides, null, 2));
console.log('samplers overhaul done');
