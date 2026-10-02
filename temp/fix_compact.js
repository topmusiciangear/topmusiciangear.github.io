// best-compact-mixers: 3 -> 6 products (MG10XU 137, ZEDi-10FX 333, X1222USB 150).
const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const V = (value, value_es) => ({ value, value_es });
const W = (t) => ({ title: t, title_es: t });
const VD = (name, pros, cons, pros_es, cons_es) => ({ name, name_es: name, pros, cons, pros_es, cons_es });

const g = G.find(x => x.id === 'best-compact-mixers');
['Yamaha MG10XU', 'Allen & Heath ZEDi-10FX', 'Behringer Xenyx X1222USB'].forEach(t => g.productTable.columns.push(W(t)));

const rows = {};
g.productTable.rows.forEach(r => { rows[r.label] = r; });
const put = (label, arr) => rows[label].values.push(...arr);

put('Best For', [
  V('Compact USB mixing for streaming/small gigs', 'Mezcla USB compacta para streaming/bolos pequeños'),
  V('British EQ + 4x4 USB interface built in', 'EQ británica + interfaz USB 4x4 integrada'),
  V('Maximum channels per dollar with FX', 'Máximos canales por dólar con FX')
]);
put('Type', [
  V('Analog mixer with USB', 'Mezclador analógico con USB'),
  V('Analog mixer with USB interface', 'Mezclador analógico con interfaz USB'),
  V('Analog mixer with USB', 'Mezclador analógico con USB')
]);
put('Channels', [
  V('10-input (4 mic + 3 stereo line)', '10 entradas (4 mic + 3 línea estéreo)'),
  V('10-input (4 mic/line + 2 stereo)', '10 entradas (4 mic/línea + 2 estéreo)'),
  V('16-input (6 mic + stereo line)', '16 entradas (6 mic + línea estéreo)')
]);
put('Preamps', [
  V('4x D-PRE (discrete Class-A)', '4x D-PRE (Clase-A discretos)'),
  V('4x GSPre (high-headroom)', '4x GSPre (alto headroom)'),
  V('6x XENYX (130 dB dynamic range)', '6x XENYX (130 dB rango dinámico)')
]);
put('EQ', [
  V('3-band on mono channels', '3 bandas en canales mono'),
  V('3-band with MusiQ dual-slope', '3 bandas con MusiQ doble pendiente'),
  V('3-band + 2 aux sends (FX/MON)', '3 bandas + 2 envíos aux (FX/MON)')
]);
put('Aux Sends', [
  V('1 (shared with FX)', '1 (compartido con FX)'),
  V('1 (FX send)', '1 (envío FX)'),
  V('2 (FX + MON)', '2 (FX + MON)')
]);
put('Built-in FX', [
  V('SPX: 24 programs (reverb/delay)', 'SPX: 24 programas (reverb/delay)'),
  V('16 FX models with tap tempo', '16 modelos FX con tap tempo'),
  V('24-bit FX: 100 presets', 'FX 24-bit: 100 presets')
]);
put('Connectivity', [
  V('USB 2x2, XLR + TRS outs', 'USB 2x2, salidas XLR + TRS'),
  V('USB 4x4 24-bit/96 kHz, XLR outs', 'USB 4x4 24-bit/96 kHz, salidas XLR'),
  V('USB, RCA I/O, Main + Alt outs', 'USB, RCA I/O, salidas Main + Alt')
]);
put('Weight', [
  V('2.1 kg', '2,1 kg'),
  V('3.3 kg', '3,3 kg'),
  V('3.7 kg', '3,7 kg')
]);

g.verdictProsCons.push(
  VD('Yamaha MG10XU',
    ['D-PRE Class-A preamps sound clean and open', 'SPX effects usable without outboard', 'USB 2x2 for streaming/recording', 'Metal chassis survives gig bags'],
    ['Single aux shared with FX limits monitors', 'No mute/alt routing per channel', 'USB is 2x2 only (no multitrack)', 'Faders are 60 mm, not 100 mm'],
    ['Preamps D-PRE Clase-A limpios y abiertos', 'Efectos SPX usables sin outboard', 'USB 2x2 para streaming/grabación', 'Chasis metal aguanta fundas de bolo'],
    ['Un solo aux compartido con FX limita monitores', 'Sin mute/ruteo alt por canal', 'USB solo 2x2 (sin multipista)', 'Faders de 60 mm, no 100 mm']),
  VD('Allen & Heath ZEDi-10FX',
    ['GSPre preamps with massive headroom', 'MusiQ EQ with dual-slope high-mid', 'USB 4x4 interface at 24-bit/96 kHz', 'Guitar DI inputs (no DI box needed)'],
    ['Single aux send', 'Plastic end cheeks scuff easily', 'FX models are good, not great'],
    ['Preamps GSPre con headroom masivo', 'EQ MusiQ con medio-agudo doble pendiente', 'Interfaz USB 4x4 a 24-bit/96 kHz', 'Entradas DI guitarra (sin caja DI)'],
    ['Un solo envío aux', 'Laterales plástico se rayan fácil', 'Modelos FX buenos, no excelentes']),
  VD('Behringer Xenyx X1222USB',
    ['16 inputs with 6 XENYX mic preamps', 'Two aux sends (separate monitors + FX)', '100-preset 24-bit FX engine', 'Cheapest way to mix a full band'],
    ['Preamps noisier than Yamaha/A&H', 'Long-term fader reliability varies', 'USB is stereo only (no multitrack)', 'Power supply is external brick'],
    ['16 entradas con 6 preamps XENYX', 'Dos envíos aux (monitores + FX separados)', 'Motor FX 24-bit de 100 presets', 'La forma más barata de mezclar banda completa'],
    ['Preamps más ruidosos que Yamaha/A&H', 'Fiabilidad faders varía a largo plazo', 'USB solo estéreo (sin multipista)', 'Fuente de poder externa'])
);

// Sections for the 3 new products (cards render from sections)
g.sections.push(
  { heading: 'Yamaha MG10XU: Compact USB Mixing for Streamers', heading_es: 'Yamaha MG10XU: Mezcla USB compacta para streamers', content: '<strong>The MG10XU is the default answer for small-format analog mixing with USB.</strong> Four D-PRE Class-A mic preamps, three-band EQ, one aux shared with a 24-program SPX effects engine, and stereo USB for streaming or recording. Two kilograms of metal that survive gig bags.', content_es: '<strong>El MG10XU es la respuesta por defecto para mezcla analógica pequeña con USB.</strong> Cuatro preamps D-PRE Clase-A, EQ de tres bandas, un aux compartido con motor SPX de 24 programas y USB estéreo para streaming o grabación. Dos kilos de metal que aguantan fundas de bolo.', products: [137] },
  { heading: 'Allen & Heath ZEDi-10FX: British EQ With Interface Built In', heading_es: 'Allen & Heath ZEDi-10FX: EQ británica con interfaz integrada', content: '<strong>The ZEDi-10FX brings Allen & Heath preamps and MusiQ EQ to a 10-input footprint with a real 4x4 USB interface.</strong> GSPre preamps with huge headroom, dual-slope high-mid EQ, 16 tap-tempo effects models, and guitar DI inputs that skip the DI box. The pick for players who record what they mix.', content_es: '<strong>El ZEDi-10FX trae preamps y EQ MusiQ de Allen & Heath a 10 entradas con interfaz USB 4x4 real.</strong> Preamps GSPre con headroom enorme, EQ de medio-agudo doble pendiente, 16 modelos de efectos con tap tempo y entradas DI de guitarra que evitan la caja DI. La elección para músicos que graban lo que mezclan.', products: [333] },
  { heading: 'Behringer Xenyx X1222USB: Maximum Channels Per Dollar', heading_es: 'Behringer Xenyx X1222USB: Máximos canales por dólar', content: '<strong>Sixteen inputs, six XENYX mic preamps, two aux sends and a 100-preset effects engine for less than a single boutique preamp.</strong> Separate monitor and FX sends, three-band EQ, stereo USB and Main plus Alt outputs. The cheapest honest way to mix a full band.', content_es: '<strong>Dieciséis entradas, seis preamps XENYX, dos envíos aux y motor de efectos de 100 presets por menos que un solo preamp boutique.</strong> Envíos separados de monitores y FX, EQ de tres bandas, USB estéreo y salidas Main más Alt. La forma honesta más barata de mezclar una banda completa.', products: [150] }
);

fs.writeFileSync('data/guides.json', JSON.stringify(G, null, 2));
const gg = JSON.parse(fs.readFileSync('data/guides.json', 'utf8')).find(x => x.id === 'best-compact-mixers');
console.log('compact: cols=' + gg.productTable.columns.length + ' rowsok=' + gg.productTable.rows.every(r => r.values.length === gg.productTable.columns.length) + ' verdict=' + gg.verdictProsCons.length);
