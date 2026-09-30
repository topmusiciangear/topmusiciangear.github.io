// Batch: DT770 table col + TR-6S full + Sig12MTK full.
const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const V = (value, value_es) => ({ value, value_es });

// ---------- 1. best-headphones-for-mixing: DT770 column ----------
{
  const g = G.find(x => x.id === 'best-headphones-for-mixing');
  g.productTable.columns.push({ title: 'Beyerdynamic DT 770 Pro', title_es: 'Beyerdynamic DT 770 Pro' });
  const rows = {};
  g.productTable.rows.forEach(r => { rows[r.label] = r; });
  rows['Best For'].values.push(V('Closed-back tracking', 'Grabación con cerrados'));
  rows['Type'].values.push(V('Closed-back', 'Cerrados'));
  rows['Driver Size'].values.push(V('45mm', '45 mm'));
  rows['Impedance'].values.push(V('80 Ω', '80 Ω'));
  rows['Sensitivity'].values.push(V('96 dB', '96 dB'));
  rows['Frequency Response'].values.push(V('5 Hz – 35 kHz', '5 Hz – 35 kHz'));
  rows['Cable'].values.push(V('3 m straight, fixed', 'Recto de 3 m, fijo'));
  rows['Weight'].values.push(V('270 g', '270 g'));
}

// ---------- 2. best-grooveboxes: TR-6S full ----------
{
  const g = G.find(x => x.id === 'best-grooveboxes');
  g.productTable.columns.push({ title: 'Roland TR-6S', title_es: 'Roland TR-6S' });
  const rows = {};
  g.productTable.rows.forEach(r => { rows[r.label] = r; });
  rows['Best For'].values.push(V('Compact ACB classics on battery', 'Clásicos ACB compactos a batería'));
  rows['Type'].values.push(V('6-track rhythm performer', 'Rhythm performer de 6 pistas'));
  rows['Sound Engine'].values.push(V('ACB (808, 909, 606, 707, 727, CR-78), FM, samples', 'ACB (808, 909, 606, 707, 727, CR-78), FM, samples'));
  rows['Tracks'].values.push(V('6 instrument parts', '6 partes'));
  rows['Sequencer'].values.push(V('16 steps, 8 variations, probability, motion rec', '16 pasos, 8 variaciones, probabilidad, grab. movimiento'));
  rows['Effects'].values.push(V('Inst FX, reverb, delay, master FX, sidechain', 'FX inst., reverb, delay, FX master, sidechain'));
  rows['Power'].values.push(V('4xAA or USB bus', '4 pilas AA o bus USB'));
  rows['Weight'].values.push(V('0.7 kg (1 lb 9 oz)', '0,7 kg'));
  g.verdictProsCons.push({
    name: 'Roland TR-6S', name_es: 'Roland TR-6S',
    pros: ['ACB models of the 808, 909, 606, 707 and 727 plus editable FM and samples in one compact box', 'Deep sequencer with sub-steps, probability, motion recording and 8 variations per pattern', 'Runs on AA batteries or USB bus and doubles as a USB audio interface', '300+ preset tones plus user samples via SD card'],
    cons: ['Only 6 tracks against 11 on the TR-8S', 'Small screen means menu-diving for deep edits', 'No individual outputs — stereo mix only', 'Compact plastic build for the price'],
    pros_es: ['Modelos ACB de 808, 909, 606, 707 y 727 más FM editable y samples en una caja compacta', 'Secuenciador profundo con sub-pasos, probabilidad, grabación de movimiento y 8 variaciones por patrón', 'Funciona con pilas AA o bus USB y además es interfaz de audio USB', 'Más de 300 sonidos de fábrica más samples de usuario por SD'],
    cons_es: ['Solo 6 pistas frente a las 11 de la TR-8S', 'La pantalla pequeña obliga a navegar menús para edición profunda', 'Sin salidas individuales — solo mezcla estéreo', 'Construcción compacta de plástico para su precio']
  });
  g.sections.push({
    heading: 'Is the Roland TR-6S the Best Compact Drum Machine?',
    heading_es: '¿Es la Roland TR-6S la mejor caja de ritmos compacta?',
    content: '<p><strong>The Roland TR-6S squeezes the TR-8S formula into a battery-powered box half the size.</strong> Six tracks of ACB models — 808, 909, 606, 707, 727 and CR-78 — plus editable FM, 300+ preset samples and user samples via SD. The sequencer goes deep with sub-steps, probability, motion recording and 8 variations per pattern, and it doubles as a USB audio interface.</p><p><strong>The catch: </strong>six tracks against the TR-8S eleven, no individual outputs and a small screen with menu-diving. But for desk producing and mobile beats, nothing this small sounds this big.</p>',
    content_es: '<p><strong>La Roland TR-6S comprime la fórmula de la TR-8S en una caja a baterías de medio tamaño.</strong> Seis pistas de modelos ACB — 808, 909, 606, 707, 727 y CR-78 — más FM editable, más de 300 samples de fábrica y samples de usuario por SD. El secuenciador es profundo con sub-pasos, probabilidad, grabación de movimiento y 8 variaciones por patrón, y además funciona como interfaz de audio USB.</p><p><strong>El inconveniente: </strong>seis pistas frente a las once de la TR-8S, sin salidas individuales y pantalla pequeña con menús. Pero para producir en el escritorio y beats en marcha, nada tan pequeño suena tan grande.</p>',
    products: [128]
  });
  Object.assign(g.featuredSnippet, {
    faq_q7_en: 'Is the Roland TR-6S enough compared to the TR-8S?',
    faq_a7_en: 'For most beat-makers, yes. The TR-6S packs the same ACB models, editable FM, samples and a deep sequencer with probability and motion recording into a battery-powered box half the size. You lose five tracks, individual outputs and hands-on faders — if you perform live with full control, the TR-8S earns its price. If you produce on the desk or on the move, the 6S is the smarter buy.',
    faq_q7_es: '¿Basta la Roland TR-6S frente a la TR-8S?',
    faq_a7_es: 'Para la mayoría, sí. La TR-6S mete los mismos modelos ACB, FM editable, samples y un secuenciador profundo con probabilidad y grabación de movimiento en una caja a baterías de medio tamaño. Pierdes cinco pistas, salidas individuales y faders físicos — si actúas en vivo con control total, la TR-8S justifica su precio. Si produces en el escritorio o en marcha, la 6S es la compra inteligente.'
  });
  g.verdict += ' The TR-6S is the compact Roland — same ACB classics in a battery-powered box.';
  g.verdict_es += ' La TR-6S es la Roland compacta — los mismos clásicos ACB en una caja a baterías.';
  g.conclusion = g.conclusion.replace(' For most producers, the Circuit Tracks offers the best balance of features, portability, and price.',
    ' Need the Roland classics in a portable box? The TR-6S runs the same ACB sounds on batteries. For most producers, the Circuit Tracks offers the best balance of features, portability, and price.');
  g.conclusion_es = g.conclusion_es.replace(' <p>También te interesa:',
    ' ¿Necesitas los clásicos Roland en una caja portable? La TR-6S lleva los mismos sonidos ACB a baterías. <p>También te interesa:');
}

// ---------- 3. best-analog-mixers: Signature 12 MTK full ----------
{
  const g = G.find(x => x.id === 'best-analog-mixers');
  g.productTable.columns.push({ title: 'Soundcraft Signature 12 MTK', title_es: 'Soundcraft Signature 12 MTK' });
  const rows = {};
  g.productTable.rows.forEach(r => { rows[r.label] = r; });
  rows['Best For'].values.push(V('Live + multitrack USB recording', 'Directo + grabación USB multipista'));
  rows['Type'].values.push(V('12-ch analog + 14x12 USB', 'Analógica 12 canales + USB 14x12'));
  rows['Channels'].values.push(V('12 (8 mic)', '12 (8 micro)'));
  rows['Preamps'].values.push(V('8 Ghost', '8 Ghost'));
  rows['EQ'].values.push(V('3-band Sapphyre, swept mid', 'Sapphyre 3 bandas, medio barrido'));
  rows['Aux Sends'].values.push(V('3 aux', '3 aux'));
  rows['Built-in FX'].values.push(V('Lexicon FX + dbx limiters', 'FX Lexicon + limitadores dbx'));
  rows['Connectivity'].values.push(V('USB 14-in/12-out', 'USB 14 entradas/12 salidas'));
  rows['Weight'].values.push(V('5.86 kg (12.9 lb)', '5,86 kg'));
  g.verdictProsCons.push({
    name: 'Soundcraft Signature 12 MTK', name_es: 'Soundcraft Signature 12 MTK',
    pros: ['Ghost mic preamps with console-grade headroom and clarity', '14-in/12-out USB captures every channel straight to the DAW', 'Lexicon FX plus dbx limiters on the input channels', 'Sapphyre British EQ with swept mids per channel'],
    cons: ['Discontinued by Soundcraft — remaining stock only', 'Heavier and bulkier than 10-channel rivals', '60 mm faders instead of 100 mm long-throw', 'No Bluetooth or modern wireless extras'],
    pros_es: ['Previos Ghost con headroom y claridad de consola', 'USB 14 entradas/12 salidas que captura cada canal directo al DAW', 'FX Lexicon más limitadores dbx en los canales de entrada', 'EQ británica Sapphyre con medios barridos por canal'],
    cons_es: ['Descatalogada por Soundcraft — solo stock restante', 'Más pesada y voluminosa que rivales de 10 canales', 'Faders de 60 mm en vez de 100 mm largos', 'Sin Bluetooth ni extras inalámbricos modernos']
  });
  g.sections.push({
    heading: 'Is the Soundcraft Signature 12 MTK the Best Mixer for Live Recording?',
    heading_es: '¿Es la Soundcraft Signature 12 MTK la mejor mesa para grabar en vivo?',
    content: '<p><strong>The Soundcraft Signature 12 MTK is an analog mixer that records like an interface.</strong> Eight Ghost mic preamps, Sapphyre British EQ with swept mids, Lexicon FX and dbx limiters on the inputs — plus a 14-in/12-out USB interface that captures every channel to the DAW in one pass. Track the whole band live, then mix with real faders.</p><p><strong>The catch: </strong>Soundcraft discontinued it, so you buy remaining stock, and it is heavier than modern 10-channel rivals. But nothing else at this size gives you multitrack analog recording with Ghost preamps.</p>',
    content_es: '<p><strong>La Soundcraft Signature 12 MTK es una mesa analógica que graba como una interfaz.</strong> Ocho previos Ghost, EQ británica Sapphyre con medios barridos, FX Lexicon y limitadores dbx en las entradas — más una interfaz USB 14 entradas/12 salidas que captura cada canal al DAW de una pasada. Graba a toda la banda en vivo y mezcla con faders de verdad.</p><p><strong>El inconveniente: </strong>Soundcraft la descatalogó, así que compras stock restante, y pesa más que rivales modernas de 10 canales. Pero nada más de este tamaño te da grabación multipista analógica con previos Ghost.</p>',
    products: [487]
  });
  g.verdict += ' The Signature 12 MTK is the live-recording pick — multitrack USB with Ghost preamps.';
  g.verdict_es += ' La Signature 12 MTK es la opción para grabar en vivo — USB multipista con previos Ghost.';
  g.conclusion = g.conclusion.replace(' <p><a href="/guides/best-live-sound-mixers.html"',
    ' Need to record the gig too? The Signature 12 MTK captures every channel over USB. <p><a href="/guides/best-live-sound-mixers.html"');
  g.conclusion_es = g.conclusion_es.replace(' <p>También te interesa:',
    ' ¿Necesitas grabar el concierto también? La Signature 12 MTK captura cada canal por USB. <p>También te interesa:');
}

fs.writeFileSync('data/guides.json', JSON.stringify(G, null, 2));
const gg = id => JSON.parse(fs.readFileSync('data/guides.json', 'utf8')).find(x => x.id === id);
['best-headphones-for-mixing', 'best-grooveboxes', 'best-analog-mixers'].forEach(id => {
  const g = gg(id);
  const union = [...new Set(g.sections.flatMap(s => s.products))];
  console.log(id + ': cards=' + union.length + ' cols=' + g.productTable.columns.length + ' verdict=' + g.verdictProsCons.length +
    ' rowsok=' + g.productTable.rows.every(r => r.values.length === g.productTable.columns.length));
});
