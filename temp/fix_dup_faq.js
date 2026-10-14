const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const die = (m) => { console.log('!! ' + m); process.exit(1); };
const gj = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gj, 'utf8'));
const g = guides.find(x => x.id === 'premium-interfaces');

// ---------- A. Blur มันก็ Horizon: angulo distinto ----------
const s5 = g.sections[5];
const b5en = 'The Audient Horizon 8P is the console-front-end pick.</strong> Eight discrete console pres with 75 dB gain, Smartgain and digital recall, plus relay-based ORBIT variable impedance that re-voices dynamics and ribbons before conversion.';
if (!s5.content.includes(b5en)) die('blurb Horizon EN no coincide');
s5.content = s5.content.split(b5en).join('Think of the Horizon 8P as eight channels of ASP8024-HE console, minus the console.</strong> Same discrete pres and 75 dB gain with Smartgain, ORBIT impedance voicing per mic, and ESS 32-bit conversion — tracking straight into a Thunderbolt 3 Mac at 0.99 ms with stock plugins. The anti-DSP flagship.');
const b5es = 'La Audient Horizon 8P es la elección con frontal de consola.</strong> Ocho previos discretos de consola con 75 dB, Smartgain y recall digital, más impedancia variable ORBIT por relés que re-vocea dinámicos y cintas antes de convertir.';
if (!s5.content_es.includes(b5es)) die('blurb Horizon ES no coincide');
s5.content_es = s5.content_es.split(b5es).join('Piensa en la Horizon 8P como ocho canales de consola ASP8024-HE sin la consola.</strong> Los mismos previos discretos con 75 dB y Smartgain, impedancia ORBIT por micro y conversión ESS de 32 bits — grabando directo a un Mac por Thunderbolt 3 a 0,99 ms con plugins normales. La insignia anti-DSP.');

// ---------- B. Blurb Orion: angulo distinto ----------
const s6 = g.sections[6];
const b6en = 'The Antelope Orion Studio Synergy Core is the connectivity-per-pound pick.</strong> Twelve discrete 75 dB pres, 30x44 I/O on Thunderbolt 3 plus USB with dual-host backup recording, and 50 Synergy Core FX running on 6 DSP + 2 FPGA chips at near-zero latency.';
if (!s6.content.includes(b6en)) die('blurb Orion EN no coincide');
s6.content = s6.content.split(b6en).join('The Orion Studio is the most I/O per pound here — with its own FX rack built in.</strong> Twelve pres, dual-host Thunderbolt/USB recording, and fifty hardware FX mean bands track with finished-sounding cues and zero CPU load. The 1U hybrid workhorse.');
const b6es = 'El Antelope Orion Studio Synergy Core es el rey de conectividad por libra.</strong> Doce previos discretos de 75 dB, E/S 30x44 por Thunderbolt 3 más USB con grabación de respaldo en doble host, y 50 efectos Synergy Core en 6 DSP + 2 FPGA con latencia casi cero.';
if (!s6.content_es.includes(b6es)) die('blurb Orion ES no coincide');
s6.content_es = s6.content_es.split(b6es).join('El Orion Studio es la mayor E/S por libra aquí, con su propio rack de efectos dentro.</strong> Doce previos, grabación en doble host Thunderbolt/USB y cincuenta efectos en hardware: las bandas graban con cues casi mezcladas y cero carga de CPU. El todoterreno híbrido en 1U.');

// ---------- C. "530 filters" inventado -> verificado ----------
const r8 = g.sections[8];
const f530en = 'leaning on dual DSP with 530 filters plus bass management and room calibration.';
if (!r8.content.includes(f530en)) die('ORIA review EN 530 no encontrado');
r8.content = r8.content.split(f530en).join('leaning on dual DSP with 32 calibration profiles, 8-band EQ per channel, bass management and room calibration.');
const f530es = 'apoyada en DSP dual con 530 filtros además de gestión de graves y calibración de sala';
if (!r8.content_es.includes(f530es)) die('ORIA review ES 530 no encontrado');
r8.content_es = r8.content_es.split(f530es).join('apoyada en DSP dual con 32 perfiles de calibración, EQ de 8 bandas por canal, gestión de graves y calibración de sala');

// ---------- D. FAQ Q3 -> DSP vs nativo ----------
const f = g.featuredSnippet;
if (f.faq_q3_en !== 'How many mics can I plug in at once?') die('Q3 EN no coincide');
f.faq_q3_en = 'Do I need onboard DSP, or is native tracking enough?';
f.faq_a3_en = 'If you track through UAD plugins, Apollo\u2019s HEXA Core (or Orion\u2019s 50 Synergy Core FX) run them with near-zero latency and zero CPU load. If you prefer stock plugins, Horizon\u2019s 0.99ms native path makes DSP unnecessary — but it needs a fast Mac and, for now, macOS.';
if (f.faq_q3_es !== '¿Cuántos micros puedo conectar a la vez?') die('Q3 ES no coincide');
f.faq_q3_es = '¿Necesito DSP a bordo o basta el tracking nativo?';
f.faq_a3_es = 'Si grabas con plugins UAD, el HEXA Core de Apollo (o los 50 efectos Synergy Core del Orion) los corren con latencia casi cero y sin cargar la CPU. Si prefieres plugins normales, la vía nativa de 0,99ms del Horizon vuelve el DSP innecesario — pero pide un Mac rápido y, por ahora, macOS.';

fs.writeFileSync(gj, JSON.stringify(guides, null, 2));
const all = JSON.stringify(g);
console.log('"530" restante:', (all.match(/530/g) || []).length);
console.log('"How many mics" restante:', all.includes('How many mics'));
