var fs=require('fs');
var BASE='C:/Users/Daniel/projects/topmusiciangear/';
var d=JSON.parse(fs.readFileSync(BASE+'data/guides.json','utf8'));
var g=d.find(function(x){return x.id==='best-digital-mixers'});
function SEC(h,hes,c,ces,prods){return{heading:h,heading_es:hes,content:c,content_es:ces,products:prods};}
g.sections.push(
  SEC('Soundcraft Ui16: Tablet Mixing for Small Stages',
    'Soundcraft Ui16: mezcla con tableta para escenarios pequeños',
    '<strong>When the budget says browser, not faders.</strong> The Soundcraft Ui16 is a 16-channel digital mixer — 8 XLR combo mic/line inputs, 4 XLR mic inputs, 2 Hi-Z instrument channels and stereo RCA — driven entirely by browser on tablet, phone or PC, with integrated Wi-Fi and up to 10 control devices at once. Genuine Harman processing (dbx AFS2, DigiTech amp modeling, 3 Lexicon FX buses) runs inside.</p><p><strong>The honest trade.</strong> USB recording is stereo only — no multitrack — so bands that must capture every channel to USB need the Ui24R instead. For bars and small venues mixing from tables, it is the cheapest way into real digital processing.',
    '<strong>Cuando el presupuesto dice navegador, no faders.</strong> El Soundcraft Ui16 es una mesa digital de 16 canales — 8 entradas combo XLR mic/línea, 4 XLR de micro, 2 Hi-Z de instrumento y RCA estéreo — gobernada por navegador en tableta, móvil o PC, con WiFi integrado y hasta 10 dispositivos de control a la vez. Proceso Harman genuino (dbx AFS2, modelado DigiTech, 3 buses Lexicon) dentro.</p><p><strong>El trato honesto.</strong> La grabación USB es solo estéreo — sin multipista — así que las bandas que deban capturar cada canal por USB necesitan el Ui24R. Para bares y locales pequeños mezclando desde las mesas, es la vía más barata al proceso digital real.',
    [486]),
  SEC('Behringer WING Compact: Flagship Power Without the Flight Case',
    'Behringer WING Compact: potencia insignia sin flight case',
    '<strong>Touring power that fits the van, not the truck.</strong> The Behringer WING Compact squeezes 48 stereo channels and 28 buses with 24 Midas PRO preamps behind a 10.1-inch touch screen and 13 motorized 100 mm faders. A 48-channel USB interface, dual-SD recorder for up to 64 tracks, 3 AES50 ports for 144 stagebox signals and optional Dante or Waves SoundGrid cards make it a genuine fly-date console.</p><p><strong>The honest trade.</strong> At nearly 16 kg it is compact next to a full WING, not next to a backpack mixer — and 13 faders means constant banking on big channel counts. For engineers who need flagship buses on small stages, nothing else here competes.',
    '<strong>Potencia de gira que cabe en la furgoneta, no en el camión.</strong> El Behringer WING Compact aprieta 48 canales estéreo y 28 buses con 24 previos Midas PRO tras una táctil de 10,1 pulgadas y 13 faders motorizados de 100 mm. Interfaz USB de 48 canales, grabadora dual-SD de hasta 64 pistas, 3 puertos AES50 para 144 señales de stagebox y tarjetas opcionales Dante o Waves SoundGrid lo convierten en una auténtica consola de bolo.</p><p><strong>El trato honesto.</strong> Con casi 16 kg es compacto junto a una WING grande, no junto a una mesa de mochila — y 13 faders obligan a cambiar de bancos en cuentas grandes. Para técnicos que necesitan buses insignia en escenarios pequeños, nada más aquí compite.',
    [482])
);
fs.writeFileSync(BASE+'data/guides.json',JSON.stringify(d,null,2));
console.log('mixer sections now: '+g.sections.length);
