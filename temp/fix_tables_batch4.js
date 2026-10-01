// practice-amps +3 cols/verdicts; bass-amps +3 cols/verdicts + RB210 450W->500W fix.
const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const V = (value, value_es) => ({ value, value_es });
{
  const g = G.find(x => x.id === 'best-practice-amps');
  g.productTable.columns.push(
    { title: 'Yamaha THR10II', title_es: 'Yamaha THR10II' },
    { title: 'Positive Grid Spark 2', title_es: 'Positive Grid Spark 2' },
    { title: 'Boss Waza-Air', title_es: 'Boss Waza-Air' }
  );
  const rows = {};
  g.productTable.rows.forEach(r => { rows[r.label] = r; });
  rows['Best For'].values.push(
    V('Desktop tone with Bluetooth', 'Tono de sobremesa con Bluetooth'),
    V('Smart fun with app', 'Diversión inteligente con app'),
    V('Silent wireless practice', 'Práctica silenciosa inalámbrica'));
  rows['Type'].values.push(
    V('Desktop modeling', 'Modelado de sobremesa'),
    V('Smart modeling combo', 'Combo inteligente'),
    V('Wireless headphone amp', 'Ampli inalámbrico de auriculares'));
  rows['Power'].values.push(V('20W', '20W'), V('50W RMS', '50W RMS'), V('Battery (5h)', 'Batería (5h)'));
  rows['Channels'].values.push(
    V('5 amp types (+10 via app)', '5 amplis (+10 por app)'),
    V('Amp models via app', 'Modelos por app'),
    V('5 Katana amps + 50 FX', '5 amplis Katana + 50 FX'));
  rows['Speaker'].values.push(V('2x3.1"', '2x3,1"'), V('2x4"', '2x4"'), V('50mm headphone drivers', 'Drivers de 50 mm'));
  rows['Outputs'].values.push(
    V('Phones, USB, AUX', 'Auriculares, USB, AUX'),
    V('Phones, USB, line outs', 'Auriculares, USB, salidas'),
    V('Phones only, USB charge', 'Solo auriculares, carga USB'));
  rows['Reverb / FX'].values.push(
    V('Reverb, chorus, delay + app', 'Reverb, chorus, delay + app'),
    V('App FX + looper', 'FX por app + looper'),
    V('Spatial + 50 FX via app', 'Espacial + 50 FX por app'));
  rows['Weight'].values.push(V('3.0 kg (6.6 lb)', '3,0 kg'), V('5.5 kg (12.1 lb)', '5,5 kg'), V('320 g', '320 g'));
  g.verdictProsCons.push(
    { name: 'Yamaha THR10II', name_es: 'Yamaha THR10II',
      pros: ['Hi-fi stereo sound from 2x3.1-inch speakers doubles as Bluetooth speaker', '15 amp models with app editing plus acoustic, bass and flat modes', 'USB recording out of the box with Extended Stereo playback', 'Loved by desktop players for a decade of refinements'],
      cons: ['20W will not gig without PA support', 'AC outlet required — no battery onboard', 'Small speakers thin out at volume', 'App needed for deep editing'],
      pros_es: ['Sonido estéreo hi-fi con 2x3,1 pulgadas que sirve de altavoz Bluetooth', '15 amplis con edición por app más modos acústico, bajo y plano', 'Grabación USB directa con reproducción estéreo extendida', 'Querido por usuarios de escritorio tras una década de refinamientos'],
      cons_es: ['20W no dan para bolos sin PA', 'Necesita enchufe — sin batería a bordo', 'Los altavoces pequeños adelgazan a volumen', 'La app es necesaria para edición profunda'] },
    { name: 'Positive Grid Spark 2', name_es: 'Positive Grid Spark 2',
      pros: ['Loudest desktop amp here with 50W RMS and 120dB peak', 'Looper plus app backing tracks for endless jamming', 'Line outs plus USB for recording and PA', 'Stereo 2x4-inch speakers with real low end'],
      cons: ['Battery sold separately, not included', '5.5 kg — least portable of the desktop trio', 'App required for full FX control', 'Mono instrument input only'],
      pros_es: ['El ampli de escritorio más potente aquí con 50W RMS y 120dB de pico', 'Looper más pistas de la app para jamear sin fin', 'Salidas de línea más USB para grabar y PA', 'Estéreo 2x4 pulgadas con graves reales'],
      cons_es: ['La batería se vende por separado', '5,5 kg — el menos portable del trío', 'La app es necesaria para control total de FX', 'Solo una entrada de instrumento'] },
    { name: 'Boss Waza-Air', name_es: 'Boss Waza-Air',
      pros: ['Total silence with amp-in-room gyro sound', 'No cables at all — wireless transmitter included', '5 Katana amps plus 50 FX via Tone Studio app', '5-hour battery with Bluetooth streaming onboard'],
      cons: ['Headphones only — never fills a room', '320g on the head gets heavy in long sessions', 'Two devices to keep charged', 'Premium price for a practice tool'],
      pros_es: ['Silencio total con sonido amp-in-room por giroscopio', 'Cero cables — transmisor inalámbrico incluido', '5 amplis Katana más 50 FX por la app Tone Studio', '5 horas de batería con streaming Bluetooth'],
      cons_es: ['Solo auriculares — nunca llena una sala', '320 g en la cabeza pesan en sesiones largas', 'Dos aparatos que mantener cargados', 'Precio premium para practicar'] }
  );
}
{
  const g = G.find(x => x.id === 'best-bass-amps');
  g.productTable.columns.push(
    { title: 'Positive Grid Spark LIVE', title_es: 'Positive Grid Spark LIVE' },
    { title: 'Orange Crush Bass 50', title_es: 'Orange Crush Bass 50' },
    { title: 'Darkglass DG210A Microtubes 500', title_es: 'Darkglass DG210A Microtubes 500' }
  );
  const rows = {};
  g.productTable.rows.forEach(r => { rows[r.label] = r; });
  rows['Best For'].values.push(
    V('Smart rehearsals and silent practice', 'Ensayos inteligentes y práctica silenciosa'),
    V('Analog tone on a budget', 'Tono analógico económico'),
    V('Modern pro stage power', 'Potencia pro moderna'));
  rows['Type'].values.push(
    V('Smart modeling combo + PA', 'Combo inteligente + PA'),
    V('All-analog solid-state', 'Estado sólido analógico'),
    V('Analog Class-D, 500W', 'Analógico Clase D, 500W'));
  rows['Power'].values.push(V('150W', '150W'), V('50W', '50W'), V('500W (4Ω)', '500W (4Ω)'));
  rows['Channels'].values.push(V('1 + app models', '1 + modelos por app'), V('1', '1'), V('1', '1'));
  rows['Speaker'].values.push(V('Full-range smart speaker', 'Altavoz inteligente'), V('1x12"', '1x12"'), V('2x10" Eminence + horn', '2x10" Eminence + trompeta'));
  rows['Outputs'].values.push(
    V('Phones, USB, line outs', 'Auriculares, USB, salidas'),
    V('XLR DI, FX loop, phones, tuner', 'XLR DI, loop, auriculares, afinador'),
    V('XLR DI, phones, ext. cab out', 'XLR DI, auriculares, salida cabina'));
  rows['Reverb / FX'].values.push(
    V('App FX and models', 'FX y modelos por app'),
    V('Overdrive + 3-band sweepable EQ', 'Overdrive + EQ 3 bandas barrido'),
    V('VMT/B3K drives + 4-band EQ', 'Drives VMT/B3K + EQ 4 bandas'));
  rows['Weight'].values.push(V('Not published', 'No publicado'), V('14.45 kg (31.9 lb)', '14,45 kg'), V('17.3 kg (38.1 lb)', '17,3 kg'));
  g.verdictProsCons.push(
    { name: 'Positive Grid Spark LIVE', name_es: 'Positive Grid Spark LIVE',
      pros: ['150W combo, mini PA and streamer in one wireless box', 'App tones with Bluetooth streaming built in', 'USB recording plus silent headphone practice', 'Lighter rig than any 2x10 combo here'],
      cons: ['Modeling feel divides analog purists', 'Deep control lives in the app', 'Single-box bass cannot move 4x10 air', 'Premium price for the feature set'],
      pros_es: ['Combo de 150W, mini PA y streamer en una caja inalámbrica', 'Tonos por app con streaming Bluetooth integrado', 'Grabación USB más práctica silenciosa con auriculares', 'Equipo más ligero que cualquier 2x10 de aquí'],
      cons_es: ['El tacto digital divide a puristas analógicos', 'El control profundo vive en la app', 'Una sola caja no mueve el aire de un 4x10', 'Precio premium por las funciones'] },
    { name: 'Orange Crush Bass 50', name_es: 'Orange Crush Bass 50',
      pros: ['All-analog Orange tone through a 12-inch speaker', 'Sweepable parametric mid cuts any mix', 'CabSim headphone out plus tuner and FX loop aboard', 'Gig-ready volume for rehearsals and small shows'],
      cons: ['31.9 lb — heaviest small combo here', 'Single channel with no presets', 'Footswitch sold separately', 'No USB recording onboard'],
      pros_es: ['Tono Orange analógico con altavoz de 12 pulgadas', 'Medio paramétrico barrido que corta cualquier mezcla', 'Salida CabSim más afinador y loop a bordo', 'Volumen de bolo para ensayos y salas pequeñas'],
      cons_es: ['14,45 kg — el combo pequeño más pesado aquí', 'Un solo canal sin presets', 'Pedal vendido por separado', 'Sin grabación USB a bordo'] },
    { name: 'Darkglass DG210A Microtubes 500', name_es: 'Darkglass DG210A Microtubes 500',
      pros: ['500W Microtubes analog power with VMT/B3K drives', 'Cab-emulated XLR DI straight to front of house', 'Eminence 2x10 plus horn punch with 4-band EQ', 'Compressor and effects loop aboard'],
      cons: ['$1,230 premium price', '38 lb to carry to the gig', 'Needs an extra cab for the full 500W', 'Analog only — no presets or app'],
      pros_es: ['500W analógicos Microtubes con drives VMT/B3K', 'XLR con emulación de cabina directo a mesa', 'Pegada Eminence 2x10 más trompeta con EQ de 4 bandas', 'Compresor y loop de efectos a bordo'],
      cons_es: ['Precio premium de $1.230', '17,3 kg hasta el bolo', 'Necesita otra cabina para los 500W completos', 'Solo analógico — sin presets ni app'] }
  );
  g.conclusion = g.conclusion.split('450W of solid-state power').join('500W of solid-state power');
  g.conclusion_es = g.conclusion_es.split('450W de potencia de estado sólido').join('500W de potencia de estado sólido');
}
fs.writeFileSync('data/guides.json', JSON.stringify(G, null, 2));
const gg = id => JSON.parse(fs.readFileSync('data/guides.json', 'utf8')).find(x => x.id === id);
['best-practice-amps', 'best-bass-amps'].forEach(id => {
  const g = gg(id);
  const union = [...new Set(g.sections.flatMap(s => s.products))];
  console.log(id + ': cards=' + union.length + ' cols=' + g.productTable.columns.length + ' verdict=' + g.verdictProsCons.length +
    ' rowsok=' + g.productTable.rows.every(r => r.values.length === g.productTable.columns.length));
});
