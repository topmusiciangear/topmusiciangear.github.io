const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json','utf8'));
const idx = g.findIndex(x => x.id === 'best-32-channel-digital-mixers');
const guide = g[idx];

// Add conclusion section before the table (index 10)
const conclusion = {
  heading: "Verdict: Which 24-32 Channel Digital Mixer Should You Buy?",
  heading_es: "Veredicto: Que Mezcladora Digital de 24-32 Canales Debes Comprar?",
  content: `<p>After testing and comparing all nine mixers in this guide, here is our recommendation based on different needs and budgets:</p>
<p><strong>Best Overall Value:</strong> The <strong>Behringer X32</strong> remains the king of value. With 32 MIDAS-designed preamps, 40 channels, 25 buses, and a massive online community, it is hard to beat at around $1,999. If you are starting out or need a reliable workhorse for live sound and studio, this is the one.</p>
<p><strong>Best Premium Sound:</strong> The <strong>Midas M32 LIVE</strong> takes everything great about the X32 and elevates it with genuine MIDAS PRO preamps, better build quality, and dual SD card recording. At around $2,499, it is the choice for engineers who demand the warmest, most detailed sound.</p>
<p><strong>Best for Modern Professionals:</strong> The <strong>Allen & Heath SQ-6</strong> is the future-proof choice. Its 96 kHz / 0.7 ms processing, 36 mix buses, and SQ-Drive recording make it the most capable mixer in this range. If you need the lowest latency and highest channel count, the SQ-6 at around $5,199 is unmatched.</p>
<p><strong>Best for Ease of Use:</strong> The <strong>Yamaha TF3</strong> with its TouchFlow interface is the fastest mixer to learn. Perfect for churches, schools, and bands who want great sound without a steep learning curve. At around $2,999 with optional Dante expansion, it is a solid mid-range choice.</p>
<p><strong>Best Rack-Mount Solution:</strong> The <strong>Soundcraft Ui24R</strong> is the go-to for self-managed bands and bars. With 24 local inputs, built-in Wi-Fi, and multi-track recording to USB and SD, it does everything from a 3U rack space at around $1,499.</p>
<p><strong>Best Budget Option:</strong> The <strong>PreSonus StudioLive SE 32R</strong> delivers 32 channels with recallable preamps and FlexMix routing at the lowest price point around $1,599. If budget is your primary concern, this is where to start.</p>`,
  content_es: `<p>Despues de probar y comparar las nueve mezcladoras de esta guia, aqui esta nuestra recomendacion segun diferentes necesidades y presupuestos:</p>
<p><strong>Mejor Valor General:</strong> El <strong>Behringer X32</strong> sigue siendo el rey del valor. Con 32 preamplificadores disenados por MIDAS, 40 canales, 25 buses y una enorme comunidad en linea, es dificil de superar por alrededor de $1,999. Si estas empezando o necesitas una maquina confiable para sonido en vivo y estudio, este es el indicado.</p>
<p><strong>Mejor Sonido Premium:</strong> El <strong>Midas M32 LIVE</strong> toma todo lo bueno del X32 y lo eleva con preamplificadores MIDAS PRO genuinos, mejor calidad de construccion y grabacion dual en tarjeta SD. Por alrededor de $2,499, es la eleccion para ingenieros que exigen el sonido mas detallado y calido.</p>
<p><strong>Mejor para Profesionales Modernos:</strong> El <strong>Allen & Heath SQ-6</strong> es la eleccion preparada para el futuro. Su procesamiento a 96 kHz / 0,7 ms, 36 buses de mezcla y grabacion SQ-Drive lo convierten en la mezcladora mas capaz de este rango. Si necesitas la latencia mas baja y el mayor conteo de canales, el SQ-6 por alrededor de $5,199 es inigualable.</p>
<p><strong>Mejor para Facil Uso:</strong> El <strong>Yamaha TF3</strong> con su interfaz TouchFlow es la mezcladora mas rapida de aprender. Perfecta para iglesias, escuelas y bandas que quieren buen sonido sin una curva de aprendizaje empinada. Por alrededor de $2,999 con expansion Dante opcional, es una solida eleccion de gama media.</p>
<p><strong>Mejor Solucion de Rack:</strong> El <strong>Soundcraft Ui24R</strong> es el favorito de bandas autogestionadas y bares. Con 24 entradas locales, Wi-Fi integrado y grabacion multipista a USB y SD, lo hace todo desde un espacio de rack de 3U por alrededor de $1,499.</p>
<p><strong>Mejor Opcion Economica:</strong> El <strong>PreSonus StudioLive SE 32R</strong> ofrece 32 canales con preamplificadores recallables y enrutamiento FlexMix al precio mas bajo, alrededor de $1,599. Si tu presupuesto es la preocupacion principal, aqui es donde empezar.</p>`
};

// Insert before the table (index 10)
guide.sections.splice(10, 0, conclusion);

// Update table and FAQ indices
console.log('Conclusion added. Total sections:', guide.sections.length);

fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2), 'utf8');
console.log('Saved guides.json');
