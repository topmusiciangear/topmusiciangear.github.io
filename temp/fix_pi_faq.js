const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const die = (m) => { console.log('!! ' + m); process.exit(1); };
const gj = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gj, 'utf8'));
const g = guides.find(x => x.id === 'premium-interfaces');

const fixH = (i, hEn, hEs) => {
  const s = g.sections[i];
  if (!s) die('seccion ' + i + ' no existe');
  s.h = hEn; s.h_es = hEs;
  delete s.heading; delete s.heading_es;
};
fixH(0, 'What Flagship Money Actually Buys', 'Lo que el dinero insignia compra de verdad');
fixH(1, 'Is the Neumann MT 48 the Best Desktop Interface for Network Audio?', '¿Es la Neumann MT 48 la mejor interfaz de sobremesa para audio en red?');
fixH(2, 'Is the Audient ORIA the Best Atmos Controller Without a Second Box?', '¿Es la Audient ORIA el mejor controlador Atmos sin segunda caja?');
fixH(3, 'Is the Apollo x8p Gen 2 the Best UAD Tracking Room?', '¿Es la Apollo x8p Gen 2 la mejor sala de tracking UAD?');
fixH(4, 'Is the RME Fireface UFX III the Best Uptime Guarantee?', '¿Es la RME Fireface UFX III la mejor garantía de no fallar?');
fixH(5, 'Is the Audient Horizon 8P the Best Console Front-End for Tracking?', '¿Es la Audient Horizon 8P el mejor frontal de consola para tracking?');
fixH(6, 'Is the Antelope Orion Studio the Best DSP Hub for Hybrid Studios?', '¿Es el Antelope Orion Studio el mejor hub DSP para estudios híbridos?');

// intros 5/6 + limpieza duplicado en intro_es de SEC0
const s5 = g.sections[5];
s5.intro = 'Eight console pres with ORBIT impedance feeding ESS 32-bit conversion at 0.99ms.';
s5.intro_es = 'Ocho previos de consola con impedancia ORBIT y conversión ESS de 32 bits a 0,99ms.';
const s6 = g.sections[6];
s6.intro = 'Twelve pres and fifty FX on 6 DSP + 2 FPGA in a single 1U box.';
s6.intro_es = 'Doce previos y cincuenta efectos en 6 DSP + 2 FPGA en una sola caja 1U.';
const s0 = g.sections[0];
const dup = 'revisa la conversión, el reloj y los drivers para tu flujo y empiezas a comprar certeza.';
if (!s0.intro_es.includes(dup)) die('duplicado SEC0 ES no encontrado');
s0.intro_es = s0.intro_es.split(dup).join('revisa la conversión, el reloj y los drivers según tu flujo de trabajo.');

fs.writeFileSync(gj, JSON.stringify(guides, null, 2));
const all = JSON.stringify(g);
['Apogee Symphony', 'Lynx Aurora', 'Galaxy 32'].forEach(w => {
  console.log('"' + w + '" restante: ' + (all.split(w).length - 1));
});
console.log('keys heading restantes:', (all.match(/"heading/g) || []).length);
