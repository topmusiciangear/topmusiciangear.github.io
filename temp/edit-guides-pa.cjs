const fs = require('fs');
const PATH = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const raw = JSON.parse(fs.readFileSync(PATH, 'utf8'));
console.log('TOP-LEVEL isArray:', Array.isArray(raw), Array.isArray(raw) ? '' : 'keys=' + Object.keys(raw).join(','));
const arr = Array.isArray(raw) ? raw : raw.guides;

function find(id) { const g = arr.find(x => x && x.id === id); if (!g) throw new Error('guide not found: ' + id); return g; }
function rep(obj, key, from, to) {
  if (typeof obj[key] !== 'string') return false;
  if (obj[key].indexOf(from) < 0) throw new Error('NOT FOUND [' + key + ']: ' + from.slice(0, 80));
  obj[key] = obj[key].split(from).join(to);
  return true;
}
function col(title, title_es) { return { title: title, title_es: title_es }; }
function v(value, value_es) { return { value: value, value_es: value_es }; }

const EON712 = {
  col: col('JBL EON712 Powered Speaker', 'Altavoz Activo JBL EON712'),
  vals: {
    'Best For': v('Versatile compact powered speaker', 'Altavoz autoamplificado versátil y compacto'),
    'Type': v('Powered PA speaker', 'Altavoz PA autoamplificado'),
    'Power': v('1300W (peak)', '1300W (pico)'),
    'Driver': v('12" + 1" HF', '12" + 1" HF'),
    'Frequency Response': v('50 Hz – 20 kHz', '50 Hz – 20 kHz'),
    'Max SPL': v('127 dB', '127 dB'),
    'Coverage': v('100° x 60°', '100° x 60°'),
    'DSP': v('dbx DriveRack DSP + presets', 'DSP dbx DriveRack + presets'),
    'Inputs': v('2x XLR/combo + XLR thru + Bluetooth', '2x XLR/combo + salida XLR + Bluetooth'),
    'Weight': v('32.2 lb (14.6 kg)', '14,6 kg'),
  },
  pc: {
    name: 'JBL EON712 Powered Speaker', name_es: 'JBL EON712 Powered Speaker',
    pros: ['1300W Class-D amplifier with 127 dB peak SPL in a compact 12-inch cab', 'Built-in mixer — two mic/line channels plus Bluetooth streaming', 'dbx DriveRack DSP with presets (music, live, speech) and music ducking', 'Wide 100° x 60° coverage from the updated image-control waveguide'],
    pros_es: ['Amplificador Clase D de 1300W con 127 dB de SPL pico en una caja compacta de 12"', 'Mezclador integrado — dos canales mic/line más streaming Bluetooth', 'DSP dbx DriveRack con presets (music, live, speech) y music ducking', 'Cobertura amplia de 100° x 60° gracias al waveguide actualizado'],
    cons: ['127 dB peak SPL trails bigger 15-inch powered speakers', 'One XLR thru output only — daisy-chaining more speakers needs a mixer'],
    cons_es: ['Los 127 dB de SPL pico se quedan atrás frente a activos de 15" más grandes', 'Solo una salida XLR thru — encadenar más altavoces requiere un mezclador'],
  },
};
const ICOA = {
  col: col('LD Systems ICOA 12 A BT', 'LD Systems ICOA 12 A BT'),
  vals: {
    'Best For': v('Coaxial all-rounder, full-range + monitor', 'Versátil coaxial, rango completo + monitor'),
    'Type': v('Powered PA speaker', 'Altavoz PA autoamplificado'),
    'Power': v('1200W (peak)', '1200W (pico)'),
    'Driver': v('12" coaxial + 1" HF', '12" coaxial + 1" HF'),
    'Frequency Response': v('50 Hz – 20 kHz', '50 Hz – 20 kHz'),
    'Max SPL': v('126 dB', '126 dB'),
    'Coverage': v('90° x 50°', '90° x 50°'),
    'DSP': v('DynX presets + EQ + delay', 'Presets DynX + EQ + delay'),
    'Inputs': v('2x XLR/combo + 3.5mm + Bluetooth', '2x XLR/combo + 3,5 mm + Bluetooth'),
    'Weight': v('44 lb (19.95 kg)', '19,95 kg'),
  },
  pc: {
    name: 'LD Systems ICOA 12 A BT', name_es: 'LD Systems ICOA 12 A BT',
    pros: ['Coaxial design with rotating, BEM-optimized horn — use vertically or as a monitor', '126 dB peak SPL and 1200W peak Class-D amplification', 'DynX DSP with 4 presets, 3-band EQ and delay function', 'Bluetooth 4.0 streaming plus two mic/line inputs and a mix output'],
    pros_es: ['Diseño coaxial con cuerno BEM rotatorio — úsalo vertical o como monitor', '126 dB de SPL pico y 1200W de amplificación pico Clase D', 'DSP DynX con 4 presets, EQ de 3 bandas y función de delay', 'Streaming Bluetooth 4.0 con dos entradas mic/line y salida mix'],
    cons: ['90° x 50° coverage is tighter than most 12-inch rivals', 'At 44 lb (19.95 kg) it is one of the heavier 12-inch powered cabs'],
    cons_es: ['La cobertura de 90° x 50° es más cerrada que la de la mayoría de rivales de 12"', 'Con 19,95 kg es una de las cajas activas de 12" más pesadas'],
  },
};
const THUMP = {
  col: col('Mackie Thump215XT', 'Mackie Thump215XT'),
  vals: {
    'Best For': v('Powerful budget 15-inch PA speaker', 'Altavoz PA de 15" potente y económico'),
    'Type': v('Powered PA speaker', 'Altavoz PA autoamplificado'),
    'Power': v('1400W (peak)', '1400W (pico)'),
    'Driver': v('15" + 1" HF', '15" + 1" HF'),
    'Frequency Response': v('40 Hz – 20 kHz', '40 Hz – 20 kHz'),
    'Max SPL': v('129 dB', '129 dB'),
    'Coverage': v('90° x 60°', '90° x 60°'),
    'DSP': v('Voicing presets + outdoor mode + app', 'Presets de voicing + modo exterior + app'),
    'Inputs': v('2x XLR/combo + 3.5mm + Bluetooth', '2x XLR/combo + 3,5 mm + Bluetooth'),
    'Weight': v('32.6 lb (14.8 kg)', '14,8 kg'),
  },
  pc: {
    name: 'Mackie Thump215XT', name_es: 'Mackie Thump215XT',
    pros: ['1400W Class-D with 129 dB peak SPL at a genuinely budget price', '15-inch woofer with a 1-inch compression driver for real low end', 'Voicing presets plus indoor/outdoor modes with the Thump Connect 2 app', 'Bluetooth streaming and speaker linking built in'],
    pros_es: ['Clase D de 1400W con 129 dB de SPL pico a un precio realmente económico', 'Woofer de 15" con driver de compresión de 1" para graves reales', 'Presets de voicing más modos interior/exterior con la app Thump Connect 2', 'Streaming Bluetooth y enlace de altavoces integrados'],
    cons: ['129 dB peak SPL is the lowest of the featured 15-inch powered speakers', 'Best used with a subwoofer for serious low-frequency coverage'],
    cons_es: ['Los 129 dB de SPL pico son los más bajos de los activos de 15" destacados', 'Ideal usarlo con un subwoofer para graves serios'],
  },
};
const ELX = {
  col: col('EV ELX200-15P Powered Speaker', 'Altavoz Activo EV ELX200-15P'),
  vals: {
    'Best For': v('Powerful 15-inch powered speaker with pro DSP', 'Altavoz activo de 15" potente con DSP profesional'),
    'Type': v('Powered PA speaker', 'Altavoz PA autoamplificado'),
    'Power': v('1200W (peak)', '1200W (pico)'),
    'Driver': v('15" + 1" HF', '15" + 1" HF'),
    'Frequency Response': v('48 Hz – 19 kHz', '48 Hz – 19 kHz'),
    'Max SPL': v('132 dB', '132 dB'),
    'Coverage': v('90° x 60°', '90° x 60°'),
    'DSP': v('QuickSmartDSP presets + app control', 'QuickSmartDSP presets + control por app'),
    'Inputs': v('2x XLR/combo + RCA + XLR out', '2x XLR/combo + RCA + salida XLR'),
    'Weight': v('41.7 lb (18.9 kg)', '18,9 kg'),
  },
  pc: {
    name: 'EV ELX200-15P Powered Speaker', name_es: 'Altavoz Activo EV ELX200-15P',
    pros: ['1200W Class-D with 132 dB peak SPL — big output for medium venues', 'QuickSmartDSP with music/live/speech/club presets plus app control', 'EV SST waveguide delivers consistent 90° x 60° coverage', '15-inch EVS-15M woofer with 1-inch titanium driver, backed by EV reliability'],
    pros_es: ['Clase D de 1200W con 132 dB de SPL pico — gran salida para locales medianos', 'QuickSmartDSP con presets music/live/speech/club y control por app', 'El waveguide SST de EV ofrece cobertura consistente de 90° x 60°', 'Woofer EVS-15M de 15" con driver de titanio de 1", respaldado por la fiabilidad de EV'],
    cons: ['Low end still needs a sub below 48 Hz for full-range bass', 'No Bluetooth audio streaming — the app handles control only'],
    cons_es: ['Los graves por debajo de 48 Hz siguen necesitando un subwoofer', 'Sin streaming de audio Bluetooth — la app solo gestiona el control'],
  },
};
const PRX = {
  col: col('JBL PRX915', 'JBL PRX915'),
  vals: {
    'Best For': v('Tour-grade 15-inch powered speaker', 'Altavoz activo de 15" para gira'),
    'Type': v('Powered PA speaker', 'Altavoz PA autoamplificado'),
    'Power': v('2000W (peak)', '2000W (pico)'),
    'Driver': v('15" + 1.5" HF', '15" + 1,5" HF'),
    'Frequency Response': v('48 Hz – 19 kHz', '48 Hz – 19 kHz'),
    'Max SPL': v('133 dB', '133 dB'),
    'Coverage': v('90° x 50°', '90° x 50°'),
    'DSP': v('dbx DriveRack DSP + OLED/app control', 'DSP dbx DriveRack + control OLED/app'),
    'Inputs': v('2x XLR/combo + aux + 2x XLR thru', '2x XLR/combo + aux + 2x salidas XLR'),
    'Weight': v('53.1 lb (24.1 kg)', '24,1 kg'),
  },
  pc: {
    name: 'JBL PRX915', name_es: 'JBL PRX915',
    pros: ['2000W Class-D with 133 dB peak SPL and 48 Hz–19 kHz response', 'dbx DriveRack DSP with feedback suppression, 12-band EQ and speaker delay', 'Color OLED screen plus JBL Pro Connect app — control up to 10 speakers', 'G-Sensor auto-tuning and dual 36 mm pole sockets for scalable arrays'],
    pros_es: ['Clase D de 2000W con 133 dB de SPL pico y respuesta de 48 Hz–19 kHz', 'DSP dbx DriveRack con supresión de realimentación, EQ de 12 bandas y delay', 'Pantalla OLED a color y app JBL Pro Connect — controla hasta 10 altavoces', 'Auto-ajuste G-Sensor y doble flange de 36 mm para arrays escalables'],
    cons: ['53.1 lb (24.1 kg) is a heavy single-handed load', 'Premium price keeps it out of budget systems'],
    cons_es: ['Los 24,1 kg son una carga pesada para una sola persona', 'Su precio premium lo deja fuera de los sistemas económicos'],
  },
};
const JRX215 = {
  col: col('JBL JRX215', 'JBL JRX215'),
  vals: {
    'Best For': v('Passive 15-inch for amp-matched systems', 'Pasivo de 15" para sistemas con amplificador'),
    'Type': v('Passive PA speaker', 'Altavoz PA pasivo'),
    'Power': v('250W cont. / 1000W peak (8Ω)', '250W cont. / 1000W pico (8 Ω)'),
    'Driver': v('15" + 1" HF', '15" + 1" HF'),
    'Frequency Response': v('41 Hz – 18 kHz', '41 Hz – 18 kHz'),
    'Max SPL': v('129 dB', '129 dB'),
    'Coverage': v('90° x 50°', '90° x 50°'),
    'DSP': v('None — external amp/crossover', 'Sin DSP — amplificador/crossover externo'),
    'Inputs': v('NL4 + 0.25" jack', 'NL4 + jack 6,35 mm'),
    'Weight': v('60.5 lb (27.4 kg)', '27,4 kg'),
  },
  pc: {
    name: 'JBL JRX215', name_es: 'JBL JRX215',
    pros: ['250W continuous / 1000W peak at 8Ω — proven, road-tested passive workhorse', '41 Hz–18 kHz response with 129 dB peak SPL from a 15-inch woofer', 'SonicGuard HF protection guards the 1-inch driver against overloads', 'Compatible with any amp rated 250–500W into 8Ω per speaker'],
    pros_es: ['250W continuos / 1000W pico a 8Ω — caballo de batalla pasivo probado en la carretera', 'Respuesta de 41 Hz–18 kHz con 129 dB de SPL pico desde un woofer de 15"', 'La protección HF SonicGuard protege el driver de 1" frente a sobrecargas', 'Compatible con cualquier amplificador de 250–500W a 8Ω por altavoz'],
    cons: ['Needs an external amplifier — no built-in DSP or limiting', '60.5 lb (27.4 kg) is heavy to move without casters'],
    cons_es: ['Requiere amplificador externo — sin DSP ni limitador incorporados', 'Los 27,4 kg son pesados de mover sin ruedas'],
  },
};
const JRX212 = {
  col: col('JBL JRX212', 'JBL JRX212'),
  vals: {
    'Best For': v('Passive 12-inch budget workhorse', 'Pasivo de 12" económico todoterreno'),
    'Type': v('Passive PA speaker', 'Altavoz PA pasivo'),
    'Power': v('250W cont. / 1000W peak (8Ω)', '250W cont. / 1000W pico (8 Ω)'),
    'Driver': v('12" + 1" HF', '12" + 1" HF'),
    'Frequency Response': v('60 Hz – 20 kHz', '60 Hz – 20 kHz'),
    'Max SPL': v('128 dB', '128 dB'),
    'Coverage': v('90° x 50°', '90° x 50°'),
    'DSP': v('None — external amp/crossover', 'Sin DSP — amplificador/crossover externo'),
    'Inputs': v('NL4 + 0.25" jack', 'NL4 + jack 6,35 mm'),
    'Weight': v('43 lb (19.5 kg)', '19,5 kg'),
  },
  pc: {
    name: 'JBL JRX212', name_es: 'JBL JRX212',
    pros: ['Compact 12-inch enclosure that doubles as a solid stage monitor', '1000W peak / 250W continuous with SonicGuard overload protection', '60 Hz–20 kHz response and 128 dB peak SPL', 'Budget-friendly entry point into a full passive PA'],
    pros_es: ['Caja compacta de 12" que funciona también como monitor de escenario', '1000W pico / 250W continuos con protección SonicGuard', 'Respuesta de 60 Hz–20 kHz y 128 dB de SPL pico', 'Punto de entrada económico para un PA pasivo completo'],
    cons: ['60 Hz – 20 kHz response rolls off fast without a subwoofer', 'Needs an external amplifier and correct impedance matching'],
    cons_es: ['La respuesta desde 60 Hz se queda corta sin un subwoofer', 'Requiere amplificador externo y coincidencia correcta de impedancia'],
  },
};

function spliceRowValues(row, idx, del, products) {
  const vals = row.values;
  const label = row.label;
  const inserts = products.map(p => p.vals[label]);
  vals.splice(idx, del, ...inserts);
}

// ================= GUIDE 27: live-sound-pa =================
(function g27() {
  const g = find('live-sound-pa');
  const s0 = g.sections[0];
  s0.products = [105, 493, 494, 109, 108, 152];

  // productTable: remove QSC K12.2 col (idx 1), insert EON712 + ICOA at idx 1
  const cols = g.productTable.columns;
  cols.splice(1, 1, EON712.col, ICOA.col);
  g.productTable.rows.forEach(r => spliceRowValues(r, 1, 1, [EON712, ICOA]));

  // prose sec0 EN/ES
  rep(s0, 'content', 'powered speakers like the QSC K12.2 ($1,000/ea) and JBL PRX912 ($1,200/ea)', 'powered speakers like the JBL EON712 ($549) and the LD Systems ICOA 12 A BT ($529)');
  rep(s0, 'content_es', 'los altavoces activos como QSC K12.2 ($1,000/ea) y JBL PRX912 ($1,200/ea)', 'los altavoces activos como JBL EON712 ($549) y LD Systems ICOA 12 A BT ($529)');

  // verdict
  rep(g, 'verdict', 'QSC K12.2 for powered speakers', 'JBL EON712 for powered speakers');
  rep(g, 'verdict_es', 'QSC K12.2 para altavoces activos', 'JBL EON712 para altavoces activos');

  // conclusion
  if (typeof g.conclusion === 'string') rep(g, 'conclusion', '(QSC K12.2)', '(JBL EON712)');
  if (typeof g.conclusion_es === 'string') rep(g, 'conclusion_es', '(QSC K12.2)', '(JBL EON712)');

  // verdictProsCons: drop K12.2, insert EON712 + ICOA after ZLX entry
  const pc = g.verdictProsCons;
  const kIdx = pc.findIndex(x => x.name.indexOf('QSC K12.2') === 0);
  if (kIdx < 0) throw new Error('g27 K12.2 prosCons entry not found');
  const zIdx = pc.findIndex(x => x.name.indexOf('EV ZLX') === 0);
  pc.splice(kIdx, 1);
  pc.splice(zIdx + 1, 0, EON712.pc, ICOA.pc);

  console.log('G27 done. cols=' + g.productTable.columns.length + ' pc=' + pc.length + ' sec0.products=' + JSON.stringify(s0.products));
})();

// ================= GUIDE 82: best-pa-speakers =================
(function g82() {
  const g = find('best-pa-speakers');

  g.featuredProducts = [105, 106, 108, 151, 495, 496];

  // productTable: append Thump215XT, ELX200-15P, PRX915
  g.productTable.columns.push(THUMP.col, ELX.col, PRX.col);
  g.productTable.rows.forEach(r => spliceRowValues(r, r.values.length, 0, [THUMP, ELX, PRX]));

  // sections
  g.sections[0].products = [106, 108, 151, 495, 496];
  g.sections[1].products = [105, 151];
  g.sections[2].products = [106, 105];
  g.sections[3].products = [108, 495, 496];

  // sec0 prose EN/ES
  rep(g.sections[0], 'content', 'Consider wattage, coverage pattern, and whether you need built-in DSP.',
    'Consider wattage, coverage pattern, and whether you need built-in DSP.<p>For 15-inch systems, the Mackie Thump215XT ($400), EV ELX200-15P ($949), and JBL PRX915 ($1,099) extend the lineup from budget to tour-grade.</p>');
  rep(g.sections[0], 'content_es', 'El Yamaha DXR12mkII ofrece calidad de sonido premium con DSP.',
    'El Yamaha DXR12mkII ofrece calidad de sonido premium con DSP.<p>Para sistemas de 15", la Mackie Thump215XT ($400), la EV ELX200-15P ($949) y la JBL PRX915 ($1,099) amplían la línea desde económica hasta nivel gira.</p>');

  // verdict EN/ES
  rep(g, 'verdict', 'and the DXR12mkII is the premium DSP choice.', 'and the DXR12mkII is the premium DSP choice. For 15-inch systems, the ELX200-15P is the smart mid-priced pick, the PRX915 is the tour-grade benchmark, and the Thump215XT is the budget workhorse.');
  rep(g, 'verdict_es', 'y el DXR12mkII es la opción premium con DSP.', 'y el DXR12mkII es la opción premium con DSP. Para sistemas de 15", el ELX200-15P es la opción intermedia más inteligente, el PRX915 es el referente de nivel gira y la Thump215XT es el caballo de batalla económico.');

  // conclusion EN (and ES if present)
  if (typeof g.conclusion === 'string') rep(g, 'conclusion', 'the smart path. <p>', 'the smart path. For 15-inch systems, the ELX200-15P and PRX915 deliver the extra low-end and headroom bigger stages demand. <p>');
  if (typeof g.conclusion_es === 'string') rep(g, 'conclusion_es', 'ofrece calidad premium con DSP avanzado. <p>', 'ofrece calidad premium con DSP avanzado. Para sistemas de 15", el ELX200-15P y el PRX915 aportan los graves extra y el headroom que exigen escenarios más grandes. <p>');

  // verdictProsCons: append the 3 new
  g.verdictProsCons.push(THUMP.pc, ELX.pc, PRX.pc);

  console.log('G82 done. cols=' + g.productTable.columns.length + ' pc=' + g.verdictProsCons.length + ' featured=' + JSON.stringify(g.featuredProducts));
})();

// ================= GUIDE 98: active-vs-passive-pa =================
(function g98() {
  const g = find('active-vs-passive-pa');

  g.featuredProducts = [105, 106, 154, 493, 495, 497, 498];

  // productTable: REPLACE 3 active columns with 2 active + 2 passive (on-topic A/P table)
  g.productTable.columns = [EON712.col, ELX.col, JRX215.col, JRX212.col];
  g.productTable.rows.forEach(r => {
    r.values = [EON712.vals[r.label], ELX.vals[r.label], JRX215.vals[r.label], JRX212.vals[r.label]];
  });

  // sections
  g.sections[1].products = [497, 498];
  g.sections[3].products = [105, 493];
  g.sections[4].products = [106, 105, 495];

  // sec1 prose
  rep(g.sections[1], 'content', '</p>', '</p><p><strong>Good passive options still exist.</strong> The JBL JRX215 (15-inch) and JRX212 (12-inch) are proven, affordable passive speakers — pair them with an amplifier matched as described above.</p>');
  rep(g.sections[1], 'content_es', '</p>', '</p><p><strong>Todavía existen buenas opciones pasivas.</strong> El JBL JRX215 (de 15") y el JBL JRX212 (de 12") son altavoces pasivos probados y asequibles — acompáñalos con un amplificador igualado como se describe arriba.</p>');

  // sec3 prose
  rep(g.sections[3], 'content', 'the ZLX-12P-G2 is the smartest value in powered PA.', 'the ZLX-12P-G2 is the smartest value in powered PA. <p>If you want a step up with a built-in mixer and Bluetooth streaming, the two-channel <strong>JBL EON712</strong> adds an extra input and wireless convenience at a fair price.</p>');
  rep(g.sections[3], 'content_es', 'el ZLX-12P-G2 es el valor más inteligente en PA activo.', 'el ZLX-12P-G2 es el valor más inteligente en PA activo. <p>Si quieres un paso más arriba con mezclador integrado y streaming Bluetooth, el <strong>JBL EON712</strong> de dos canales añade una entrada extra y comodidad inalámbrica a un precio justo.</p>');

  // sec4 prose
  rep(g.sections[4], 'content', 'The K12.2 is the benchmark that all other active PA speakers are measured against.', 'The K12.2 is the benchmark that all other active PA speakers are measured against. <p>For high-output 15-inch powered sound, the <strong>EV ELX200-15P</strong> delivers 132 dB with pro DSP at a mid-range price — a serious contender if you need more reach than a 12-inch.</p>');
  rep(g.sections[4], 'content_es', 'El K12.2 es el punto de referencia contra el que se miden todos los demás altavoces PA activos.', 'El K12.2 es el punto de referencia contra el que se miden todos los demás altavoces PA activos. <p>Para sonido activo de 15" de alta salida, el <strong>EV ELX200-15P</strong> entrega 132 dB con DSP profesional a precio intermedio — un contendiente serio si necesitas más alcance que un 12".</p>');

  // sec2 neutralized prose
  rep(g.sections[2], 'content',
    '<strong>This guide only recommends active (powered) speakers because for the vast majority of users — bands, DJs, events, houses of worship — active speakers deliver better value, convenience, and reliability. Here\'s a breakdown of why:</strong>',
    '<strong>This guide compares active (powered) and passive PA speakers side by side, because each works best in different situations. Here\'s a breakdown of why:</strong>');
  rep(g.sections[2], 'content_es',
    '<strong>Esta guía solo recomienda altavoces activos porque para la gran mayoría de usuarios — bandas, DJs, eventos, iglesias — los altavoces activos ofrecen mejor relación calidad-precio, conveniencia y confiabilidad. Aquí tienes un desglose de por qué:</strong>',
    '<strong>Esta guía compara los altavoces PA activos y pasivos lado a lado, porque cada uno funciona mejor en situaciones diferentes. Aquí tienes un desglose de por qué:</strong>');
  rep(g.sections[2], 'content', '<strong>Why we don\'t recommend passive speakers in this guide:</strong>', '<strong>When passive still wins:</strong>');
  rep(g.sections[2], 'content_es', '<strong>Por qué no recomendamos altavoces pasivos en esta guía:</strong>', '<strong>Cuándo sigue ganando el pasivo:</strong>');

  // verdict EN/ES
  rep(g, 'verdict', 'We recommend three proven options here, and for most bands the active route is the right one.',
    'The JBL EON712 and EV ELX200-15P are our active picks here, with the JBL JRX215 and JRX212 as solid passive alternatives for amp-matched systems.');
  rep(g, 'verdict_es', 'Recomendamos tres opciones probadas aquí, y para la mayoría de las bandas la ruta activa es la correcta.',
    'El JBL EON712 y el EV ELX200-15P son nuestras opciones activas aquí, con el JBL JRX215 y el JBL JRX212 como alternativas pasivas sólidas para sistemas con amplificador.');

  // conclusion EN (and ES if present)
  rep(g, 'conclusion',
    'This guide only recommends active speakers because for nearly every portable PA application, they make more sense. The EV ZLX-12P-G2 offers the best value the QSC K12.2 is the professional touring standard and the Yamaha DBR12 delivers pro sound on a budget.',
    'For nearly every portable PA application, active speakers make more sense — the JBL EON712 and the EV ELX200-15P are our picks for simple setup and strong sound. That said, the JBL JRX215 and JRX212 prove passive still has a place: lighter cabinets you can drive from a single rack amplifier when you already run an amp rig.');
  rep(g, 'conclusion_es',
    'Esta guía solo recomienda altavoces activos porque para casi cualquier uso de PA portátil, simplemente tienen más sentido. El EV ZLX-12P-G2 ofrece la mejor compra, el QSC K12.2 es el estándar profesional para giras, y el Yamaha DBR12 ofrece sonido profesional económico.',
    'Para casi cualquier aplicación PA portátil, los altavoces activos tienen más sentido — el JBL EON712 y el EV ELX200-15P son nuestras opciones por su configuración simple y gran sonido. Dicho esto, el JBL JRX215 y el JBL JRX212 demuestran que el pasivo todavía tiene su lugar: cajas más ligeras que puedes alimentar desde un único amplificador de rack si ya cuentas con un equipo de amplificadores.');

  // verdictProsCons: append the 2 passives
  g.verdictProsCons.push(JRX215.pc, JRX212.pc);

  console.log('G98 done. cols=' + g.productTable.columns.length + ' pc=' + g.verdictProsCons.length + ' featured=' + JSON.stringify(g.featuredProducts));
})();

// validation: table row value lengths must equal columns length
['live-sound-pa', 'best-pa-speakers', 'active-vs-passive-pa'].forEach(id => {
  const g = find(id);
  const n = g.productTable.columns.length;
  g.productTable.rows.forEach(r => {
    if (r.values.length !== n) throw new Error('MISMATCH ' + id + ' row ' + r.label + ': ' + r.values.length + ' vs ' + n);
  });
  console.log('VALIDATED', id, n + ' cols');
});

fs.writeFileSync(PATH, JSON.stringify(Array.isArray(raw) ? arr : Object.assign({}, raw, { guides: arr }), null, 2));
console.log('WROTE', PATH, 'total guides:', arr.length);