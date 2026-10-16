const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const g = guides.find(x => x.id === 'vocal-plugins');
const fsn = g.featuredSnippet;
fsn.faq_q3_en = 'Is iZotope Nectar 4 Advanced worth it for a complete vocal chain?';
fsn.faq_a3_en = 'If you want finished vocals fast, yes. Nectar 4 Advanced packs thirteen modules plus a Vocal Assistant that sets EQ, compression and de-essing for you, with Auto-Level riding gain and Voices building harmonies. It is the quickest route from raw take to mix-ready vocal in one window.';
fsn.faq_q3_es = '¿Merece la pena iZotope Nectar 4 Advanced para una cadena vocal completa?';
fsn.faq_a3_es = 'Si quieres voces terminadas rápido, sí. Nectar 4 Advanced concentra trece módulos más un Asistente Vocal que configura EQ, compresión y de-essing por ti, con Auto-Level nivelando ganancia y Voices creando armonías. Es la ruta más veloz de la toma cruda a la voz lista para mezcla en una ventana.';
fsn.faq_q5_en = 'What is the fastest way to tame harsh vocals?';
fsn.faq_a5_en = 'A spectral resonance suppressor like Baby Audio Smooth Operator Pro. It finds harsh resonances across the frequency range and smooths only those spots with a single threshold control, no compressor pumping. Cheap-mic harshness and sibilant edges disappear while the body of the voice stays intact.';
fsn.faq_q5_es = '¿Cuál es la forma más rápida de domar voces duras?';
fsn.faq_a5_es = 'Un supresor espectral de resonancias como Baby Audio Smooth Operator Pro. Encuentra resonancias duras en el rango de frecuencia y suaviza solo esos puntos con un solo control de umbral, sin bombeo de compresor. La dureza de micros baratos y los filos sibilantes desaparecen mientras el cuerpo de la voz queda intacto.';
fs.writeFileSync(B + 'data/guides.json', JSON.stringify(guides, null, 2), 'utf8');
const s = JSON.stringify(g);
['Ozone', 'G-Master', 'RX 12', 'eight-plugin', 'ocho plugins'].forEach(k => {
  if (s.includes(k)) console.log('RESTO: ' + k);
});
console.log('FAQs OK');
