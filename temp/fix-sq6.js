const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json','utf8'));
const idx = g.findIndex(x => x.id === 'best-32-channel-digital-mixers');
const guide = g[idx];

// Fix SQ-6 section (index 3)
const sq6 = guide.sections[3];
sq6.content = '<p>The Allen &amp; Heath SQ-6 is the best-selling 24-fader console for engineers demanding 96 kHz audio quality with ultra-low latency. Its XCVI FPGA engine processes 48 channels at 96 kHz with just 0.7 ms latency, delivering pristine sound that analog consoles cannot match.</p><p>With 24 local XLR mic preamps, 36 mix buses, and SQ-Drive recording 32 tracks directly to a USB hard drive without a computer, the SQ-6 handles everything from live sound to studio recording. Optional Dante or Waves networking cards and SLink expansion make it future-proof for any growing rig.</p><p><strong>Why engineers choose it:</strong> The 96 kHz processing with 0.7 ms latency is the gold standard for in-ear monitor mixing. The touchscreen interface is intuitive, the preamps are transparent, and the 36 buses give you more routing flexibility than any mixer in this price range.</p>';

sq6.content_es = '<p>El Allen &amp; Heath SQ-6 es la consola de 24 faders mas vendida para ingenieros que exigen calidad de audio a 96 kHz con latencia ultra baja. Su motor FPGA XCVI procesa 48 canales a 96 kHz con solo 0,7 ms de latencia, entregando un sonido pristino que las consolas analogicas no pueden igualar.</p><p>Con 24 preamplificadores XLR locales, 36 buses de mezcla y grabacion SQ-Drive de 32 pistas directo a un disco duro USB sin necesidad de computadora, el SQ-6 maneja todo desde sonido en vivo hasta grabacion en estudio. Tarjetas de red opcionales Dante o Waves y expansion SLink lo hacen preparado para el futuro.</p><p><strong>Por que lo eligen los ingenieros:</strong> El procesamiento a 96 kHz con 0,7 ms de latencia es el estandar de oro para el mezclado con monitores In-Ear. La interfaz de pantalla tactil es intuitiva, los preamplificadores son transparentes y los 36 buses te dan mas flexibilidad de enrutamiento que cualquier otra mezcladora en este rango de precio.</p>';

console.log('SQ-6 section fixed');

// Fix table: SQ-6 row
const table = guide.sections.find(s => s.isTable);
// Update SQ-6 in table content - fix recording from 96-track to 32-track
table.content = table.content.replace('USB 96-track (SQ-Drive)', 'USB 32-track (SQ-Drive)');
table.content_es = table.content_es.replace('USB 96 pistas (SQ-Drive)', 'USB 32 pistas (SQ-Drive)');
// Fix SQ-6 local I/O from 32 to 24
table.content = table.content.replace('<td>Allen &amp; Heath SQ-6</td><td>32 XLR (recallable)</td>', '<td>Allen &amp; Heath SQ-6</td><td>24 XLR (recallable)</td>');
table.content_es = table.content_es.replace('<td>Allen &amp; Heath SQ-6</td><td>32 XLR (recallables)</td>', '<td>Allen &amp; Heath SQ-6</td><td>24 XLR (recallables)</td>');

console.log('Table fixed');

fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2), 'utf8');
console.log('Saved');
