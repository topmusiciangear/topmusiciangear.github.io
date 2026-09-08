var fs = require('fs');

var tags = {
  'starter-studio': ['Best Home Studio Starter Kits Under $1,000', 'Mejores Kits de Estudio Casero por Menos de $1,000'],
  'best-headphones': ['Best Studio Headphones for Every Budget', 'Mejores Auriculares de Estudio para Cada Presupuesto'],
  'usb-mics': ['Best USB Microphones for Streaming & Podcasts', 'Mejores Micrófonos USB para Streaming y Podcasts'],
  'stage-mics': ['Best Stage & Live Performance Mics', 'Mejores Micrófonos de Directo y Escenario'],
  'open-headphones': ['Best Open-Back Headphones for Mixing', 'Mejores Auriculares Abiertos para Mezcla y Hi-Fi'],
  'mixing-plugins': ['Best EQ, Compressor & Mastering Plugins', 'Mejores Plugins de EQ, Compresor y Mastering'],
  'fx-plugins': ['Best Creative FX Plugins for Producers', 'Mejores Plugins de Efectos para Productores'],
  'studio-furniture': ['Best Studio Furniture, Desks & Racks', 'Mejores Muebles, Escritorios y Racks de Estudio'],
  'best-condenser-mics': ['Best Studio Condenser Microphones', 'Mejores Micrófonos Condensadores para Estudio'],
  'fender-guide': ['Best Fender Guitars: Strat, Tele & More', 'Mejores Guitarras Fender: Strat, Tele y Más'],
  'budget-interfaces': ['Best Budget Audio Interfaces Under $300', 'Mejores Interfaces de Audio por Menos de $300'],
  'hs8-vs-rokit-7': ['Yamaha HS8 vs KRK Rokit 7 G5: Which Wins?', 'Yamaha HS8 vs KRK Rokit 7 G5: ¿Cuál Es Mejor?'],
  'best-keyboard': ['Best Keyboard & Synth Workstations', 'Mejores Teclados y Workstations para Músicos'],
  'scarlett-vs-volt': ['Scarlett 2i2 vs UA Volt 2: Interface Duel', 'Scarlett 2i2 vs UA Volt 2: Duelo de Interfaz'],
  'audient-vs-motu': ['Audient iD14 vs MOTU M2: Interface Duel', 'Audient iD14 vs MOTU M2: Duelo de Interfaces'],
  'jbl-vs-kali': ['JBL 305P vs Kali LP-6: Monitor Duel', 'JBL 305P vs Kali LP-6: Duelo de Monitores'],
  'hd490-pro-vs-dt990': ['HD 490 Pro vs DT 990 Pro: Open-Back Duel', 'HD 490 Pro vs DT 990 Pro: Duelo Abierto'],
  'm50x-vs-dt770': ['ATH-M50x vs DT 770 Pro: Closed-Back Duel', 'ATH-M50x vs DT 770 Pro: Duelo de Auriculares'],
  'sm7b-vs-nt1': ['Shure SM7B vs Rode NT1: Vocal Mic Duel', 'Shure SM7B vs Rode NT1 5ª Gen: Duelo Vocal'],
  'c414-vs-u87': ['AKG C414 vs Neumann U 87: Condenser Duel', 'AKG C414 vs Neumann U 87: Duelo de Condensadores'],
  'zlx-vs-k12': ['EV ZLX-12P vs QSC K12.2: PA Duel', 'EV ZLX-12P vs QSC K12.2: Duelo de PA'],
  'dxr-vs-prx': ['Yamaha DXR12 vs JBL PRX ONE: Which PA?', 'Yamaha DXR12 vs JBL PRX ONE: ¿Cuál Es Mejor?'],
  'katana-vs-dsl': ['Boss Katana 50 vs DSL40CR: Amp Duel', 'Boss Katana 50 vs Marshall DSL40CR: Duelo'],
  'fix-clipping-scarlett': ['Fix Scarlett 2i2 Clipping: Step-by-Step', 'Cómo Arreglar el Clipping en la Scarlett 2i2'],
  'ts9-vs-bd2': ['Ibanez TS9 vs Boss BD-2: Overdrive Duel', 'Ibanez TS9 vs Boss BD-2: Duelo de Overdrive'],
  'best-digital-pianos': ['Best Digital Pianos for Every Budget', 'Mejores Pianos Digitales para Estudio y Hogar'],
  'best-digital-mixers': ['Best Digital Mixers for Live & Studio', 'Mejores Mezcladores Digitales para Directo y Estudio'],
  'precision-vs-jazz': ['Precision vs Jazz Bass: Which Fender Wins?', 'Precision Bass vs Jazz Bass: ¿Cuál Eliges?'],
  'fender-bass-guide': ['Best Fender Bass Guitars: Jazz, Precision & More', 'Mejores Bajos Fender: Jazz, Precision y Más'],
  'scarlett-vs-motu': ['Scarlett 2i2 vs MOTU M2: Interface Duel', 'Focusrite Scarlett 2i2 vs MOTU M2: Duelo'],
  'best-bass-under-700': ['Best Budget Bass Guitars Under $700', 'Mejores Bajos por Menos de $700'],
  'beat-making': ['Best Gear for Beat-Making Studios', 'Mejor Equipo para Estudios de Beat-Making'],
  'best-looper-pedals': ['Best Looper Pedals for Guitarists', 'Mejores Pedales de Loop para Guitarra'],
  'best-multi-effects-pedals': ['Best Multi-Effects Guitar Pedals', 'Mejores Pedales Multi-Efectos para Guitarra'],
  'stage-wedges': ['Best Powered Stage Wedges for Live Sound', 'Mejores Cuñas Activas de Escenario'],
  'best-hardware-samplers': ['Best Hardware Samplers for Beat Makers', 'Mejores Samplers de Hardware para Beatmakers'],
  'best-wireless-iems': ['Best Wireless In-Ear Monitor Systems', '7 Mejores Sistemas In-Ear Inalámbricos'],
  'best-ribbon-mics': ['Best Ribbon Microphones for Recording', 'Mejores Micrófonos de Cinta para Estudio'],
  'ai-tools-plugins': ['Best AI Tools for Music & Mixing', 'Mejores Herramientas IA para Producción Musical'],
  'sidechain-modulation-plugins': ['Best Sidechain & Modulation Plugins', 'Mejores Plugins de Sidechain y Modulación']
};

var over = [];
Object.keys(tags).forEach(function (id) {
  var en = tags[id][0], es = tags[id][1];
  if (en.length > 52) over.push(id + ' EN=' + en.length);
  if (es.length > 52) over.push(id + ' ES=' + es.length);
});
if (over.length) { console.log('LEN OVER 52:\n' + over.join('\n')); process.exit(1); }

var path = 'data/guides.json';
var t = fs.readFileSync(path, 'utf8');
var inserted = 0, missing = 0;
Object.keys(tags).forEach(function (id) {
  var marker = '    "id": "' + id + '",\n';
  var i = t.indexOf(marker);
  if (i < 0) { missing++; console.log('NO SE ENCONTRÓ id:', id); return; }
  var esStart = t.indexOf('"title_es": "', i);
  if (esStart < 0) { missing++; console.log('NO title_es para:', id); return; }
  var lineEnd = t.indexOf('\n', esStart);
  var pair = '    "titleTag": "' + tags[id][0] + '",\n    "titleTag_es": "' + tags[id][1] + '",\n';
  t = t.slice(0, lineEnd) + '\n' + pair + t.slice(lineEnd + 1);
  inserted++;
});
console.log('insertados:', inserted, '| errores:', missing);
fs.writeFileSync(path, t, 'utf8');

var d = JSON.parse(fs.readFileSync(path, 'utf8'));
var check = d.filter(function (g) { return tags[g.id]; });
var bad = check.filter(function (g) { return g.titleTag !== tags[g.id][0] || g.titleTag_es !== tags[g.id][1]; });
console.log('validados:', check.length, '| sin coincidir:', bad.length);
bad.forEach(function (g) { console.log('  MISMATCH:', g.id); });
console.log('JSON válido:', true);