const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const G = id => guides.find(g => g.id === id);
function swap(guide, pairs) {
  let s = JSON.stringify(guide);
  pairs.forEach(([a, b]) => { s = s.split(a).join(b); });
  const g2 = JSON.parse(s);
  Object.keys(guide).forEach(k => delete guide[k]);
  Object.assign(guide, g2);
}

// ==================== REPAIR (5 products) ====================
(function () {
  const gd = G('best-audio-repair-plugins');
  gd.sections[1] = {
    heading: 'Baby Audio Smooth Operator Pro: Resonance Control With a Single Knob',
    heading_es: 'Baby Audio Smooth Operator Pro: Control de Resonancias Con Una Sola Perilla',
    products: [472],
    content: '<p><strong>Smooth Operator Pro finds harsh resonances and tames them with a single threshold control.</strong> Its spectral engine listens across the frequency range, spots what sticks out, and smooths only those spots in real time. Vocals lose their harsh edge, guitars lose their boxiness, and masters lose their digital glare, all without the pumping of a traditional compressor.</p><p>For mix engineers who want fast, musical resonance control without studying a manual, this is the modern shortcut. It will not replace a surgical tool like RX for rescue missions, but for everyday harshness it is the fastest fix available.</p>',
    content_es: '<p><strong>Smooth Operator Pro encuentra resonancias duras y las doma con un solo control de umbral.</strong> Su motor espectral escucha en todo el rango de frecuencia, detecta lo que sobresale y suaviza solo esos puntos en tiempo real. Las voces pierden su filo duro, las guitarras su encajonamiento y los masters su brillo digital, todo sin el bombeo de un compresor tradicional.</p><p>Para ingenieros de mezcla que quieren control de resonancias rápido y musical sin estudiar un manual, este es el atajo moderno. No reemplazará una herramienta quirúrgica como RX para misiones de rescate, pero para dureza cotidiana es el arreglo más veloz disponible.</p>',
    pros: ['Single-knob spectral resonance control', 'Smooths harshness without compressor pumping', 'Works on vocals, guitars, bass and masters', 'Instant results with no learning curve'],
    pros_es: ['Control espectral de resonancias de una sola perilla', 'Suaviza dureza sin bombeo de compresor', 'Funciona en voces, guitarras, bajos y masters', 'Resultados instantáneos sin curva de aprendizaje'],
    cons: ['Not a surgical repair tool like RX', 'Single-knob design limits fine control', 'Can over-smooth aggressive material', 'No offline spectral editing'],
    cons_es: ['No es herramienta quirúrgica como RX', 'El diseño de una perilla limita control fino', 'Puede suavizar en exceso material agresivo', 'Sin edición espectral offline']
  };
  // remove Chameleon section + verdict (verify first)
  const ci = gd.sections.findIndex(s => (s.heading || '').toLowerCase().includes('chameleon'));
  if (ci > -1) { gd.sections.splice(ci, 1); console.log('repair: chameleon section removed'); }
  else console.log('repair: chameleon section NOT FOUND');
  const cvi = gd.verdictProsCons.findIndex(v => (v.name || '').toLowerCase().includes('chameleon'));
  if (cvi > -1) { gd.verdictProsCons.splice(cvi, 1); console.log('repair: chameleon verdict removed'); }
  gd.verdictProsCons.forEach(v => {
    if (/Soothe/i.test(v.name || '')) { v.name = 'Smooth Operator Pro'; v.name_es = 'Smooth Operator Pro'; }
  });
  const rv = gd.verdictProsCons[1];
  rv.pros = ['One-knob resonance control', 'No compressor pumping', 'Vocals, guitars, bass, masters', 'Instant results'];
  rv.pros_es = ['Control de resonancias de una perilla', 'Sin bombeo de compresor', 'Voces, guitarras, bajos, masters', 'Resultados instantáneos'];
  rv.cons = ['Not surgical like RX', 'Limited fine control', 'Can over-smooth', 'No spectral editing'];
  rv.cons_es = ['No quirúrgico como RX', 'Control fino limitado', 'Puede suavizar en exceso', 'Sin edición espectral'];
  gd.featuredProducts = [1025, 472, 1027, 1028, 1030];
  gd.faq[2] = { q: 'What is the difference between Smooth Operator Pro and a de-esser?',
    q_es: '¿Cuál es la diferencia entre Smooth Operator Pro y un de-esser?',
    q_a: 'Smooth Operator Pro tames resonances across the full frequency range with a single control, while a de-esser targets sibilance in a narrow band, usually 4-8 kHz. Use Smooth Operator when whole mixes or instruments sound harsh. Use smart:deess when only the vocal esses need precise, AI-driven control.',
    q_a_es: 'Smooth Operator Pro doma resonancias en todo el rango de frecuencia con un solo control, mientras un de-esser se enfoca en sibilancia en una banda estrecha, generalmente 4-8 kHz. Usa Smooth Operator cuando mezclas o instrumentos enteros suenan duros. Usa smart:deess cuando solo las eses vocales necesitan control preciso con IA.' };
  gd.faq[3] = { q: 'Can UNVEIL remove reverb from a finished mix?',
    q_es: '¿Puede UNVEIL eliminar el reverb de una mezcla terminada?',
    q_a: 'No. UNVEIL works on individual tracks or stems, not finished mixes. It separates direct sound from room reflections using de-mixing, which rescues live recordings, podcast interviews and dialogue tracked in reflective rooms. For reducing reverb before mixing, process each track individually, then balance with automation and EQ.',
    q_a_es: 'No. UNVEIL funciona en pistas individuales o stems, no en mezclas terminadas. Separa el sonido directo de las reflexiones de la sala usando de-mixing, lo que rescata grabaciones en vivo, entrevistas de podcast y diálogo capturado en salas reflectantes. Para reducir reverb antes de mezclar, procesa cada pista individualmente, luego balancea con automatización y EQ.' };
  swap(gd, [
    ['RX 12, Soothe3, smart:deess, Restoration Suite 2, Chameleon and UNVEIL', 'RX 12, Smooth Operator Pro, smart:deess, Restoration Suite 2 and UNVEIL'],
    ['RX 12, Soothe3, smart:deess, Restoration Suite 2, Chameleon y UNVEIL', 'RX 12, Smooth Operator Pro, smart:deess, Restoration Suite 2 y UNVEIL'],
    ['Oeksound Soothe3 for dynamic resonance suppression', 'Baby Audio Smooth Operator Pro for one-knob resonance control'],
    ['Oeksound Soothe3 para supresión dinámica de resonancias', 'Baby Audio Smooth Operator Pro para control de resonancias de una perilla'],
    ['Accentize Chameleon for neural reverb removal, and Zynaptiq UNVEIL', 'Zynaptiq UNVEIL'],
    ['Accentize Chameleon para eliminación neural de reverb, y Zynaptiq UNVEIL', 'Zynaptiq UNVEIL'],
    ['Soothe3 handles resonances that traditional tools cannot touch.', 'Smooth Operator Pro tames resonances that traditional tools cannot touch.'],
    ['Soothe3 maneja resonancias que las herramientas tradicionales no pueden tocar.', 'Smooth Operator Pro doma resonancias que las herramientas tradicionales no pueden tocar.'],
    ['Chameleon removes or transplants reverb using neural networks. UNVEIL rescues live recordings from bad rooms.', 'UNVEIL rescues live recordings from bad rooms.'],
    ['Chameleon elimina o trasplanta reverb usando redes neuronales. UNVEIL rescata grabaciones en vivo de salas malas.', 'UNVEIL rescata grabaciones en vivo de salas malas.'],
    ['Oeksound Soothe3', 'Baby Audio Smooth Operator Pro'],
    ['Oeksound', 'Baby Audio'],
    ['Soothe3', 'Smooth Operator Pro'],
    ['Soothe', 'Smooth Operator'],
    ['Accentize Chameleon', 'Zynaptiq UNVEIL'],
    ['Chameleon', 'UNVEIL']
  ]);
  let ds = JSON.stringify(gd);
  while (ds.includes('Smooth Operator Pro Pro')) ds = ds.split('Smooth Operator Pro Pro').join('Smooth Operator Pro');
  while (ds.includes('UNVEIL UNVEIL')) ds = ds.split('UNVEIL UNVEIL').join('UNVEIL');
  const g3 = JSON.parse(ds);
  Object.keys(gd).forEach(k => delete gd[k]);
  Object.assign(gd, g3);
  console.log('repair done, sections=' + gd.sections.length + ' verdicts=' + gd.verdictProsCons.length);
})();

// ==================== AUTOTUNE ====================
(function () {
  const gd = G('autotune-vs-melodyne');
  swap(gd, [
    ['The 2026 version adds 35% better CPU efficiency, a modernized interface, and improved natural mode.', 'Pro 11 refines the natural mode, modernizes the interface, and stays light on CPU.'],
    ['La versión 2026 añade 35% mejor eficiencia de CPU, una interfaz modernizada y modo natural mejorado.', 'Pro 11 refina el modo natural, moderniza la interfaz y mantiene bajo el uso de CPU.'],
    ['buy Auto-Tune 2026 first', 'buy Auto-Tune Pro 11 first'],
    ['compra Auto-Tune 2026 primero', 'compra Auto-Tune Pro 11 primero'],
    ['AutoTune 2026', 'Auto-Tune Pro 11'],
    ['Auto-Tune 2026', 'Auto-Tune Pro 11']
  ]);
  const v0 = gd.verdictProsCons[0];
  v0.name = 'Auto-Tune Pro 11'; v0.name_es = 'Auto-Tune Pro 11';
  console.log('autotune done');
})();

// ==================== VOCALIGN ====================
(function () {
  const gd = G('vocalign-vs-revoice-pro');
  const vv = gd.verdictProsCons.find(v => /Revoice/i.test(v.name || ''));
  if (vv) { vv.name = 'Revoice Pro 5'; vv.name_es = 'Revoice Pro 5'; console.log('vocalign: verdict renamed'); }
  console.log('vocalign done');
})();

// ==================== MIXING (remove SSL) ====================
(function () {
  const gd = G('mixing-plugins');
  const si = gd.sections.findIndex(s => (s.heading || '').includes('SSL Mastering Bundle'));
  if (si > -1) { gd.sections.splice(si, 1); console.log('mixing: SSL section removed'); }
  else console.log('mixing: SSL section NOT FOUND');
  const vi = gd.verdictProsCons.findIndex(v => (v.name || '').includes('SSL Mastering'));
  if (vi > -1) { gd.verdictProsCons.splice(vi, 1); console.log('mixing: SSL verdict removed'); }
  const fi = (gd.featuredProducts || []).indexOf(1037);
  if (fi > -1) gd.featuredProducts.splice(fi, 1);
  // remove table column 1037 (find by title)
  const t = gd.productTable;
  if (t && t.columns) {
    const ci = t.columns.findIndex(c => /SSL Mastering/i.test(c.title || ''));
    if (ci > -1) {
      t.columns.splice(ci, 1);
      t.rows.forEach(r => { if (r.values && r.values.length > ci) r.values.splice(ci, 1); });
      console.log('mixing: SSL table column removed, cols=' + t.columns.length);
    }
  }
  console.log('mixing done, featured=' + JSON.stringify(gd.featuredProducts));
})();

fs.writeFileSync(B + 'data/guides.json', JSON.stringify(guides, null, 2), 'utf8');
console.log('PART B2 saved');
