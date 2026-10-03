const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const gi = G.findIndex(x => x.id === 'best-32-channel-digital-mixers');
let s = JSON.stringify(G[gi]);
// 1. global rename (single pass)
s = s.split('SQ-6').join('SQ-6+');
let g = JSON.parse(s);
// 2. table col 2 targeted rows
const V = (value, value_es) => ({ value, value_es });
const rows = {};
g.productTable.rows.forEach(r => { rows[r.label] = r; });
rows['Best For'].values[2] = V('Flagship 96 kHz + RackUltra FX', 'Insignia 96 kHz + RackUltra FX');
rows['Mix Buses'].values[2] = V('44-bus architecture', 'Arquitectura de 44 buses');
rows['Built-in Screen'].values[2] = V('9" touchscreen, dark GUI', '9" táctil, GUI oscuro');
rows['Local Outputs'].values[2] = V('14 XLR + 2 TRS', '14 XLR + 2 TRS');
// 3. section rewrite
const sec = g.sections.find(x => (x.products || []).includes(414));
sec.heading = 'The 2026 Upgrade to the Modern Standard: Allen & Heath SQ-6+';
sec.heading_es = 'La actualización 2026 del estándar moderno: Allen & Heath SQ-6+';
sec.content = '<p><strong>The Allen &amp; Heath SQ-6+ is the 2026 successor to the best-selling SQ-6: 25 motorized faders, a 9-inch dark-GUI touchscreen and four RackUltra FX engines on the same 96 kHz XCVI core.</strong> 48-channel processing at 0.7 ms latency, 24 local XLR preamps with the latest converters, 16 SoftKeys plus 4 SoftRotaries, and 8 RackExtra + 4 RackUltra FX engines with dedicated sends and returns. SQ-Drive records 32 tracks to USB, Dante/Waves/MADI option cards and SLink keep it expandable, and old SQ shows load straight in. $5,999 street, £3,799 at G4M, €4,499 at MusicStore.</p><p><strong>Why engineers will switch:</strong> the bigger screen, upgraded faders and extra DEEP/RackUltra headroom answer every complaint about the original — while scene compatibility protects existing SQ investments. The 9-inch display and chromatic metering stay readable in dark venues, and 15.15 kg keeps it genuinely portable for a 25-fader desk.</p>';
sec.content_es = '<p><strong>La Allen &amp; Heath SQ-6+ es la sucesora 2026 de la superventas SQ-6: 25 faders motorizados, pantalla táctil oscura de 9 pulgadas y cuatro motores RackUltra FX sobre el mismo núcleo XCVI a 96 kHz.</strong> Procesamiento de 48 canales con 0,7 ms de latencia, 24 previos XLR locales con los últimos conversores, 16 SoftKeys más 4 SoftRotaries, y 8 motores RackExtra + 4 RackUltra FX con envíos y retornos dedicados. SQ-Drive graba 32 pistas por USB, tarjetas opcionales Dante/Waves/MADI y SLink la mantienen expandible, y los shows antiguos de SQ cargan directos. $5.999 de calle, £3.799 en G4M, €4.499 en MusicStore.</p><p><strong>Por qué los ingenieros cambiarán:</strong> la pantalla grande, los faders mejorados y el headroom extra DEEP/RackUltra responden a cada queja del original — y la compatibilidad de escenas protege las inversiones SQ existentes. La pantalla de 9 pulgadas y la medición cromática se leen en salas oscuras, y 15,15 kg la mantienen portable para una mesa de 25 faders.</p>';
// 4. verdict rewrite 5+5
const VD = (name, pros, cons, pros_es, cons_es) => ({ name, name_es: name, pros, cons, pros_es, cons_es });
g.verdictProsCons[g.verdictProsCons.findIndex(x => x.name === 'Allen & Heath SQ-6+')] = VD('Allen & Heath SQ-6+',
  ['25 motorized faders plus 9-inch dark-GUI touchscreen', '4 RackUltra + 8 RackExtra FX engines with dedicated sends', 'Latest AD/DA converters with upgraded fader hardware', 'Old SQ shows load straight in (forward compatible)', '48 channels at 0.7 ms on the proven XCVI core'],
  ['Costs more than the outgoing SQ-6 it replaces', '24 local inputs still need a stagebox for big bands', 'Dante/Waves cards remain paid options', '15.15 kg — heavier than compact rivals', 'Dark GUI takes a session to learn'],
  ['25 faders motorizados más pantalla táctil oscura de 9 pulgadas', '4 motores RackUltra + 8 RackExtra FX con envíos dedicados', 'Últimos conversores AD/DA con faders mejorados', 'Los shows SQ antiguos cargan directos (compatible hacia adelante)', '48 canales a 0,7 ms en el probado núcleo XCVI'],
  ['Cuesta más que la SQ-6 saliente que reemplaza', '24 entradas locales aún piden stagebox para bandas grandes', 'Las tarjetas Dante/Waves siguen siendo opciones de pago', '15,15 kg — más pesada que rivales compactos', 'La GUI oscura pide una sesión para dominarla']);
// 5. conclusion buses clause
g.conclusion = g.conclusion.split('36 mix buses, the Allen & Heath SQ-6+ leads the pack').join('44-bus architecture, the Allen & Heath SQ-6+ leads the pack');
g.conclusion_es = g.conclusion_es.split('36 buses de mezcla, la Allen & Heath SQ-6+ es insuperable').join('arquitectura de 44 buses, la Allen & Heath SQ-6+ es insuperable');
// 6. FAQ a4 buses clause
let fs2 = JSON.stringify(g);
fs2 = fs2.split('the SQ-6+ has 36,').join('the SQ-6+ has a 44-bus architecture,');
fs2 = fs2.split('el SQ-6+ tiene 36').join('el SQ-6+ tiene arquitectura de 44 buses');
g = JSON.parse(fs2);
G[gi] = g;
fs.writeFileSync('data/guides.json', JSON.stringify(G, null, 2));
// 7. verify
const chk = JSON.stringify(g);
console.log('SQ-6+ count:', chk.split('SQ-6+').length - 1);
console.log('bare SQ-6 left:', (chk.match(/SQ-6(?!\+)/g) || []).length);
console.log('SQ-6++ accidents:', (chk.match(/SQ-6\+\+/g) || []).length);