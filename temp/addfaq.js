const fs = require('fs');
const p = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
let s = fs.readFileSync(p, 'utf8');
const needle = `      {
        "q": "Can Zynaptiq Unveil remove reverb from a finished mix?",`;
const insert = `      {
        "q": "How does Waves Clarity Vx Pro compare to iZotope RX for noise reduction?",
        "q_es": "¿Cómo se compara Waves Clarity Vx Pro con iZotope RX para reducción de ruido?",
        "a": "Waves Clarity Vx Pro excels at real-time dialogue isolation with a single knob, while iZotope RX 12 offers deeper spectral editing and repair tools. Use Clarity Vx Pro for fast, on-the-fly cleanup; use RX 12 for surgical repair of clicks, hums, and complex restoration.",
        "a_es": "Waves Clarity Vx Pro sobresale en el aislamiento de diálogos en tiempo real con una sola perilla, mientras que iZotope RX 12 ofrece herramientas de edición espectral y reparación más profundas. Usa Clarity Vx Pro para limpieza rápida sobre la marcha; usa RX 12 para reparación quirúrgica de clics, zumbidos y restauración compleja."
      },
      {
        "q": "Can Zynaptiq Unveil remove reverb from a finished mix?",`;
if (s.includes(needle)) {
  s = s.replace(needle, insert);
  fs.writeFileSync(p, s);
  console.log('done');
} else {
  console.log('target not found');
}
