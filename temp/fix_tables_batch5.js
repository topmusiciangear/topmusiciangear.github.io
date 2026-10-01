// live-mixers +3 cols/verdicts + prose; streaming +3 cols/verdicts/sections + prose.
const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const V = (value, value_es) => ({ value, value_es });
{
  const g = G.find(x => x.id === 'best-live-sound-mixers');
  g.productTable.columns.push(
    { title: 'Yamaha MG16XU', title_es: 'Yamaha MG16XU' },
    { title: 'Behringer X Air XR18', title_es: 'Behringer X Air XR18' },
    { title: 'Allen & Heath CQ-18T', title_es: 'Allen & Heath CQ-18T' }
  );
  const rows = {};
  g.productTable.rows.forEach(r => { rows[r.label] = r; });
  rows['Best For'].values.push(
    V('Analog mixer for more channels', 'Mezcla analógica con más canales'),
    V('Rack digital stagebox mixing', 'Mezcla digital en rack'),
    V('Touchscreen digital mixing', 'Mezcla digital táctil'));
  rows['Type'].values.push(V('Analog mixer', 'Mezcladora analógica'), V('Digital mixer', 'Mezcladora digital'), V('Digital mixer', 'Mezcladora digital'));
  rows['Channels'].values.push(V('16 (8 mic)', '16 (8 micro)'), V('18 (16 mic)', '18 (16 micro)'), V('16 mono + 3 stereo', '16 mono + 3 estéreo'));
  rows['Preamps'].values.push(V('8 D-PRE', '8 D-PRE'), V('16 Midas', '16 Midas'), V('16 recallable digital', '16 digitales recuperables'));
  rows['EQ'].values.push(V('3-band + 1-knob comp', '3 bandas + compresor 1-knob'), V('4-band fully parametric', 'Paramétrico 4 bandas'), V('Parametric + Quick Channels', 'Paramétrico + Quick Channels'));
  rows['Aux Sends'].values.push(V('4 aux sends', '4 envíos aux'), V('6 aux buses', '6 buses aux'), V('6 aux outputs', '6 salidas aux'));
  rows['Built-in FX'].values.push(V('SPX digital FX', 'FX digitales SPX'), V('4 FX engines', '4 motores FX'), V('4 FX engines', '4 motores FX'));
  rows['Connectivity'].values.push(V('USB, 4 groups', 'USB, 4 grupos'), V('USB 18x18, Ultranet, WiFi', 'USB 18x18, Ultranet, WiFi'), V('USB 24x22, SD, BT, WiFi', 'USB 24x22, SD, BT, WiFi'));
  rows['Weight'].values.push(V('6.8 kg (15.0 lb)', '6,8 kg'), V('3.2 kg (7.1 lb)', '3,2 kg'), V('3 kg (6.6 lb)', '3 kg'));
  rows['Monitor Outputs'].values.push(V('2 stereo', '2 estéreo'), V('6 aux buses', '6 buses aux'), V('6 aux outputs', '6 salidas aux'));
  g.verdictProsCons.push(
    { name: 'Yamaha MG16XU', name_es: 'Yamaha MG16XU',
      pros: ['16 channels with D-PRE pres and 1-knob compressors', '4 aux plus 4 groups for monitors and routing', 'SPX effects with 24 programs aboard', 'USB recording with rack kit included'],
      cons: ['No tablet control or app mixing', '6.8 kg rack format needs stage space', '2-track USB only, no multitrack', 'FX editing via small screen'],
      pros_es: ['16 canales con previos D-PRE y compresores 1-knob', '4 aux más 4 grupos para monitores y ruteo', 'Efectos SPX con 24 programas a bordo', 'Grabación USB con kit de rack incluido'],
      cons_es: ['Sin control por tablet ni app', 'El formato rack de 6,8 kg pide espacio', 'USB solo 2 pistas, sin multipista', 'Edición de FX en pantalla pequeña'] },
    { name: 'Behringer X Air XR18', name_es: 'Behringer X Air XR18',
      pros: ['18x18 USB interface records the whole band live', '16 Midas pres with 6 aux monitor mixes', 'Stagebox format hides at the side of the stage', '4 FX engines plus Ultranet personal mixing'],
      cons: ['No physical faders — tablet required', 'Built-in WiFi drops in crowded venues', '48kHz ceiling, no 96k option', 'Real learning curve on the app'],
      pros_es: ['Interfaz USB 18x18 que graba a toda la banda en vivo', '16 previos Midas con 6 mezclas de monitores', 'El formato stagebox se esconde al lado del escenario', '4 motores FX más mezcla personal Ultranet'],
      cons_es: ['Sin faders físicos — tablet obligatoria', 'El WiFi integrado cae en recintos saturados', 'Techo de 48kHz, sin opción 96k', 'Curva de aprendizaje real en la app'] },
    { name: 'Allen & Heath CQ-18T', name_es: 'Allen & Heath CQ-18T',
      pros: ['7-inch touchscreen mixes with no tablet needed', 'Auto gain plus feedback assistant set up fast', '24x22 USB and SD multitrack recording', '3 kg featherweight with Bluetooth streaming'],
      cons: ['No motor faders for tactile mixing', 'Small screen for 16-plus channels', 'Young platform with fewer scene libraries', 'External PSU brick to carry'],
      pros_es: ['Pantalla táctil de 7 pulgadas sin tablet', 'Auto-gain más asistente anti-feedback rapidísimos', 'Grabación multipista USB 24x22 y SD', 'Pluma de 3 kg con streaming Bluetooth'],
      cons_es: ['Sin faders motorizados para mezcla táctil', 'Pantalla pequeña para más de 16 canales', 'Plataforma joven con menos librerías', 'Fuente externa que cargar'] }
  );
  g.verdict += ' MG16XU is the analog step-up with 16 channels, XR18 the rack stagebox value, CQ-18T the touchscreen modern pick.';
  g.verdict_es += ' MG16XU es el salto analógico con 16 canales, XR18 el stagebox en rack, CQ-18T la opción táctil moderna.';
  g.conclusion = g.conclusion.replace(' <p><a href="/guides/live-sound-pa.html"',
    ' Need more channels in analog? The MG16XU doubles the MG10XU. Going stageless? The XR18 lives in a rack, and the CQ-18T mixes from its own touchscreen. <p><a href="/guides/live-sound-pa.html"');
  g.conclusion_es = g.conclusion_es.replace(' <p>También te interesa:',
    ' ¿Necesitas más canales en analógico? El MG16XU dobla al MG10XU. ¿Sin escenario? El XR18 vive en un rack y el CQ-18T mezcla desde su pantalla. <p>También te interesa:');
}
{
  const g = G.find(x => x.id === 'streaming-interfaces');
  g.productTable.columns.push(
    { title: 'Universal Audio Apollo Twin X Gen 2', title_es: 'Universal Audio Apollo Twin X Gen 2' },
    { title: 'Audient iD14 MkII', title_es: 'Audient iD14 MkII' },
    { title: 'Focusrite Scarlett 2i2 4th Gen', title_es: 'Focusrite Scarlett 2i2 4th Gen' }
  );
  const rows = {};
  g.productTable.rows.forEach(r => { rows[r.label] = r; });
  rows['Best For'].values.push(
    V('Pro tracking with UAD plugins', 'Grabación pro con plugins UAD'),
    V('Console-grade desktop recording', 'Grabación de escritorio con calidad de consola'),
    V('Beginner interface standard', 'Estándar para principiantes'));
  rows['Type'].values.push(
    V('Desktop interface + DSP', 'Interfaz de escritorio + DSP'),
    V('USB-C interface', 'Interfaz USB-C'),
    V('USB-C interface', 'Interfaz USB-C'));
  rows['Mic Inputs'].values.push(
    V('2 Unison pres', '2 previos Unison'),
    V('2 Audient console pres', '2 previos de consola'),
    V('2 Scarlett pres, 69dB', '2 previos, 69dB'));
  rows['Power'].values.push(
    V('External PSU (Thunderbolt)', 'Fuente externa (Thunderbolt)'),
    V('USB bus-powered', 'USB por bus'),
    V('USB bus-powered', 'USB por bus'));
  rows['Key Extras'].values.push(
    V('UAD HEXA DSP, Unison pres, LUNA', 'UAD HEXA DSP, previos Unison, LUNA'),
    V('ScrollControl, ADAT, JFET DI, 2 HP outs', 'ScrollControl, ADAT, DI JFET, 2 salidas'),
    V('Auto Gain, Clip Safe, loopback, Air mode', 'Auto Gain, Clip Safe, loopback, modo Air'));
  rows['Video Capture'].values.push(V('No', 'No'), V('No', 'No'), V('No', 'No'));
  g.verdictProsCons.push(
    { name: 'Universal Audio Apollo Twin X Gen 2', name_es: 'Universal Audio Apollo Twin X Gen 2',
      pros: ['Unison pres recreate Neve and API through UAD DSP', 'HEXA Core tracks plugins with near-zero latency', 'LUNA integration with premium conversion', 'Talkback and monitor control aboard'],
      cons: ['Thunderbolt only — no USB option', 'UAD plugin costs stack up fast', 'Two inputs limit bands and drums', 'Premium price per channel'],
      pros_es: ['Los previos Unison recrean Neve y API con DSP UAD', 'HEXA Core graba plugins con latencia casi nula', 'Integración LUNA con conversión premium', 'Talkback y control de monitores a bordo'],
      cons_es: ['Solo Thunderbolt — sin opción USB', 'Los plugins UAD se acumulan en precio', 'Dos entradas limitan bandas y baterías', 'Precio premium por canal'] },
    { name: 'Audient iD14 MkII', name_es: 'Audient iD14 MkII',
      pros: ['Console-grade pres with ScrollControl monitor knob', 'ADAT expansion grows to 10 inputs', 'JFET DI plus dual headphone outs', 'Compact steel chassis built to last'],
      cons: ['No MIDI I/O aboard', 'Software mixer takes learning', 'Single USB-C port — hub life', 'No DSP tracking effects'],
      pros_es: ['Previos de consola con knob ScrollControl', 'La expansión ADAT crece a 10 entradas', 'DI JFET más doble salida de auriculares', 'Chasis de acero compacto duradero'],
      cons_es: ['Sin MIDI a bordo', 'El mezclador por software pide aprendizaje', 'Un solo puerto USB-C — vida con hub', 'Sin FX DSP para grabar'] },
    { name: 'Focusrite Scarlett 2i2 4th Gen', name_es: 'Focusrite Scarlett 2i2 4th Gen',
      pros: ['69dB gain range drives SM7B-class dynamics', 'Auto Gain plus Clip Safe nail levels fast', 'Air mode plus loopback for streamers', 'Huge community with bundled software'],
      cons: ['No MIDI I/O on the 2i2', 'Latency above Thunderbolt rivals', 'USB-C only with no expansion', 'Knobs feel lighter than premium rivals'],
      pros_es: ['69dB de ganancia mueven dinámicos tipo SM7B', 'Auto Gain más Clip Safe clavan niveles rápido', 'Modo Air más loopback para streamers', 'Comunidad enorme con software incluido'],
      cons_es: ['Sin MIDI en el 2i2', 'Latencia mayor que rivales Thunderbolt', 'Solo USB-C sin expansión', 'Knobs más ligeros que rivales premium'] }
  );
  g.sections.push(
    { heading: 'Is the Apollo Twin X the Best Interface for UAD Tracking?',
      heading_es: '¿Es el Apollo Twin X la mejor interfaz para grabar con UAD?',
      content: '<p><strong>The Apollo Twin X Gen 2 records through plugins, not after them.</strong> Two Unison preamps become Neve, API or Manley with UAD DSP running at near-zero latency, tracked straight into LUNA. Talkback, monitor control and premium conversion make it a desktop studio centerpiece.</p><p><strong>The catch: </strong>Thunderbolt only, two inputs, and the UAD plugin habit gets expensive. But for UAD tracking tone, nothing else here qualifies.</p>',
      content_es: '<p><strong>El Apollo Twin X Gen 2 graba a través de plugins, no después.</strong> Dos previos Unison se convierten en Neve, API o Manley con DSP UAD a latencia casi nula, directo en LUNA. Talkback, control de monitores y conversión premium lo hacen centro del estudio.</p><p><strong>El inconveniente: </strong>solo Thunderbolt, dos entradas, y el hábito UAD sale caro. Pero para tono UAD grabando, nada más aquí califica.</p>',
      products: [16] },
    { heading: 'Is the Audient iD14 MkII the Best Desktop Interface Value?',
      heading_es: '¿Es la Audient iD14 MkII la mejor interfaz de escritorio?',
      content: '<p><strong>The Audient iD14 MkII puts console pres on any desk.</strong> Two clean console-grade preamps, ScrollControl monitor knob, ADAT expansion to 10 inputs, JFET DI and dual headphone outs in a steel box. No menus, no apps — gain knobs and go.</p><p><strong>The catch: </strong>no MIDI, no DSP tracking FX, and one USB-C port. But per preamp dollar, nothing here touches it.</p>',
      content_es: '<p><strong>La Audient iD14 MkII pone previos de consola en cualquier escritorio.</strong> Dos previos limpios de consola, knob ScrollControl, expansión ADAT a 10 entradas, DI JFET y doble salida de auriculares en caja de acero. Sin menús ni apps — perillas de ganancia y listo.</p><p><strong>El inconveniente: </strong>sin MIDI, sin FX DSP para grabar y un solo USB-C. Pero por previo y euro, nada aquí la toca.</p>',
      products: [54] },
    { heading: 'Is the Scarlett 2i2 the Best First Interface?',
      heading_es: '¿Es la Scarlett 2i2 la mejor primera interfaz?',
      content: '<p><strong>The Scarlett 2i2 4th Gen is the default answer for a reason.</strong> 69dB of clean gain drives SM7B-class dynamics without a booster, Auto Gain plus Clip Safe set levels for you, and Air mode, loopback and bundled software cover streaming day one. The biggest user community in audio means every question is already answered.</p><p><strong>The catch: </strong>no MIDI, no expansion, latency above Thunderbolt rivals. But as a first interface, it is the safest money in recording.</p>',
      content_es: '<p><strong>La Scarlett 2i2 4th Gen es la respuesta por defecto por algo.</strong> 69dB de ganancia limpia mueven dinámicos tipo SM7B sin booster, Auto Gain más Clip Safe ajustan niveles por ti, y el modo Air, loopback y software incluido cubren el streaming desde el día uno. La mayor comunidad del audio significa que cada duda ya está respondida.</p><p><strong>El inconveniente: </strong>sin MIDI, sin expansión, latencia mayor que rivales Thunderbolt. Pero como primera interfaz, es el dinero más seguro de la grabación.</p>',
      products: [15] }
  );
  g.verdict += ' Apollo Twin X is the UAD tracking pick, iD14 the console-value pick, Scarlett 2i2 the beginner standard.';
  g.verdict_es += ' Apollo Twin X es la opción UAD, iD14 la de valor con consola, Scarlett 2i2 el estándar principiante.';
}
fs.writeFileSync('data/guides.json', JSON.stringify(G, null, 2));
const gg = id => JSON.parse(fs.readFileSync('data/guides.json', 'utf8')).find(x => x.id === id);
['best-live-sound-mixers', 'streaming-interfaces'].forEach(id => {
  const g = gg(id);
  const union = [...new Set(g.sections.flatMap(s => s.products))];
  console.log(id + ': cards=' + union.length + ' cols=' + g.productTable.columns.length + ' verdict=' + g.verdictProsCons.length +
    ' rowsok=' + g.productTable.rows.every(r => r.values.length === g.productTable.columns.length));
});
