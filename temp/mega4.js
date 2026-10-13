var fs = require('fs');
var BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
var d = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));
function SEC(h, hes, c, ces, prods) { return { heading: h, heading_es: hes, content: c, content_es: ces, products: prods }; }

// ---- usb-mics: Yeti section ----
var u = d.find(function (x) { return x.id === 'usb-mics'; });
u.sections.push(
  SEC('The Classic That Started It All: Blue Yeti USB Microphone',
    'El clásico que lo empezó todo: Blue Yeti USB Microphone',
    '<strong>Before USB mics grew up, there was the Yeti.</strong> The Blue Yeti USB Microphone is the plug-and-play classic for first podcasts and streams: multiple pickup patterns with on-mic selection, plus gain, headphone volume and instant mute right on the body. Zero-latency headphone monitoring and driverless USB mean recording in minutes, no interface required.</p><p><strong>The honest trade.</strong> It is big, heavy and honest about it: a large condenser that hears the room and the keyboard as clearly as you. In untreated spaces, a dynamic like the AT2040USB forgives more. For quiet rooms on a budget, the legend still delivers.',
    '<strong>Antes de que los micros USB maduraran, existía el Yeti.</strong> El Blue Yeti USB Microphone es el clásico conectar-y-usar para primeros podcasts y streams: múltiples patrones de captación con selección en el micro, más ganancia, volumen de auriculares y mute instantáneo en el cuerpo. Monitoreo de auriculares sin latencia y USB sin drivers significan grabar en minutos, sin interfaz.</p><p><strong>El trato honesto.</strong> Es grande, pesado y honesto al respecto: un condensador grande que oye la sala y el teclado tan claro como a ti. En espacios sin tratar, un dinámico como el AT2040USB perdona más. Para salas tranquilas con presupuesto, la leyenda sigue cumpliendo.',
    [518])
);
// conclusion: add Yeti pick before link tail
function tailOf(s) { var i = s.indexOf('<p>'); return i > -1 ? s.slice(i) : ''; }
var uTail = tailOf(u.conclusion), uEsTail = tailOf(u.conclusion_es);
var uHead = u.conclusion.slice(0, u.conclusion.indexOf('<p>'));
var uEsHead = u.conclusion_es.slice(0, u.conclusion_es.indexOf('<p>'));
u.conclusion = uHead + ' If you want the classic multi-pattern USB mic that started it all, with gain, mute and headphone volume on the body, get the <strong>Blue Yeti USB Microphone</strong>. ' + uTail;
u.conclusion_es = uEsHead + ' Si quieres el clásico micro USB multipatrón que lo empezó todo, con ganancia, mute y volumen de auriculares en el cuerpo, ve por el <strong>Blue Yeti USB Microphone</strong>. ' + uEsTail;

// ---- tracking-headphones: K371 section ----
var t = d.find(function (x) { return x.id === 'tracking-headphones'; });
t.sections.push(
  SEC('Balanced and Foldable: AKG K371 on the Move',
    'Equilibrados y plegables: AKG K371 en marcha',
    '<strong>Neutral tuning you can fold into a backpack.</strong> The AKG K371 pairs 50 mm titanium-coated drivers with a balanced, Harman-friendly tuning that translates mixes honestly. Closed-back oval cups isolate well for tracking, the cable detaches (two straight plus one coiled cable in the box), and at 255 g they fold flat for the commute with a 5 Hz–40 kHz response on a 32-ohm chassis any interface drives.</p><p><strong>The honest trade.</strong> Owners report hinge and slider failures more often than the metal-reinforced marketing suggests — handle the folding joints with care. Treat them as precision tools, not beater cans, and they repay it.',
    '<strong>Afinación neutra que se pliega a la mochila.</strong> El AKG K371 combina drivers de 50 mm con titanio y una afinación equilibrada cercana a Harman que traslada mezclas con honestidad. Las copas ovaladas cerradas aíslan bien para grabar, el cable se desmonta (dos rectos más uno en espiral en la caja), y con 255 g se pliegan planos para el viaje, con respuesta 5 Hz–40 kHz en chasis de 32 ohmios que mueve cualquier interfaz.</p><p><strong>El trato honesto.</strong> Los dueños reportan fallos de bisagras y deslizadores más de lo que sugiere el marketing con refuerzo metálico — trata las articulaciones con cuidado. Trátalos como herramienta de precisión, no como auriculares de batalla, y lo devuelven.',
    [57])
);

fs.writeFileSync(BASE + 'data/guides.json', JSON.stringify(d, null, 2));
console.log('usb secs=' + u.sections.length + ' trk secs=' + t.sections.length);
