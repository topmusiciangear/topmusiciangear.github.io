const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const G = JSON.parse(fs.readFileSync(DIR + 'data/guides.json', 'utf8'));
function rep1(txt, from, to) {
  const c = txt.split(from).length - 1;
  if (c !== 1) throw new Error('found ' + c + 'x: ' + from.slice(0, 70));
  return txt.split(from).join(to);
}
let t = JSON.stringify(G);
// multi verdict + conclusion
t = rep1(t, 'and the GX-1 is the budget all-in-one that still sounds great.',
  'and the GX-1 is the budget all-in-one that still sounds great. Beyond them, the G11, GT-1000CORE, Quad Cortex and GE300 bring bigger screens, amp capture and deeper editing.');
t = rep1(t, 'y el GX-1 es el todo-en-uno económico que aun así suena genial.',
  'y el GX-1 es el todo-en-uno económico que aun así suena genial. Además, el G11, el GT-1000CORE, el Quad Cortex y el GE300 aportan pantallas grandes, captura de amplis y edición profunda.');
t = rep1(t, 'Start with the GX-1 or ME-90 to learn, then step up to the Flex Prime or HX Stomp.',
  'Start with the GX-1 or ME-90 to learn, then step up to the Flex Prime or HX Stomp. The G11, GT-1000CORE, Quad Cortex and GE300 extend the comparison with bigger screens, capture workflows and workstation features.');
t = rep1(t, 'Empieza con el GX-1 o el ME-90 y sube al Flex Prime o al HX Stomp.',
  'Empieza con el GX-1 o el ME-90 y sube al Flex Prime o al HX Stomp. El G11, el GT-1000CORE, el Quad Cortex y el GE300 amplían la comparativa con pantallas grandes, captura y funciones de estación.');
// overdrive verdict + conclusion
t = rep1(t, 'and the RAT 2 is the distortion for gritty rock and punk. They cover the whole spectrum.',
  'and the RAT 2 is the distortion for gritty rock and punk. The OCD, Tumnus Deluxe, Morning Glory, Distortion+ and BD-2W add boutique clipping, Klon EQ, transparency, 70s crunch and Waza Craft refinement.');
t = rep1(t, 'y el RAT 2 es la distorsión para rock crudo y punk. Cubren todo el espectro.',
  'y el RAT 2 es la distorsión para rock crudo y punk. El OCD, el Tumnus Deluxe, el Morning Glory, el Distortion+ y el BD-2W añaden clipping boutique, EQ Klon, transparencia, crunch 70s y refinamiento Waza Craft.');
t = rep1(t, 'Start with the BD-2 for versatility, add the TS9 for that mid-boost magic, and grab the RAT when you need searing distortion.',
  'Start with the BD-2 for versatility, add the TS9 for that mid-boost magic, and grab the RAT when you need searing distortion. The OCD brings MOSFET feel, the Tumnus adds Klon EQ, the Morning Glory stays transparent, the Distortion+ nails 70s crunch and the BD-2W refines the Blues Driver.');
t = rep1(t, 'El ProCo RAT 2 ofrece distorsión legendaria.',
  'El ProCo RAT 2 ofrece distorsión legendaria. El OCD aporta tacto MOSFET, el Tumnus suma EQ Klon, el Morning Glory se mantiene transparente, el Distortion+ clava el crunch 70s y el BD-2W refina el Blues Driver.');
// looper verdict + conclusion
t = rep1(t, 'The Ditto wins for pure simplicity — one button, record, play, that\'s it.',
  'The Ditto wins for pure simplicity — one button, record, play, that\'s it. The RC-500, X4, 720, Infinity 2 and Clone Looper scale up to dual tracks, stereo memories and hi-fi overdubs.');
t = rep1(t, 'El Ditto gana por pura simplicidad — un botón, graba, reproduce, y ya está.',
  'El Ditto gana por pura simplicidad — un botón, graba, reproduce, y ya está. El RC-500, el X4, el 720, el Infinity 2 y el Clone Looper escalan a doble pista, memorias estéreo y overdubs hi-fi.');
t = rep1(t, 'Empieza con el Ditto para aprender y luego sube al RC-5.',
  'Empieza con el Ditto para aprender y luego sube al RC-5. El RC-500 añade segunda pista y micro, el X4 duplica loops en estéreo, el 720 simplifica el estéreo, el Infinity 2 alterna partes sin cortes y el Clone miniaturiza 6 minutos hi-fi.');
t = rep1(t, 'Start with the Ditto learn the basics, then upgrade to the RC-5 for full creative control.',
  'Start with the Ditto learn the basics, then upgrade to the RC-5 for full creative control. The RC-500 adds a second track and mic input, the X4 doubles loops in stereo, the 720 simplifies stereo, the Infinity 2 flips parts gaplessly and the Clone shrinks 6 hi-fi minutes into a mini box.');
fs.writeFileSync(DIR + 'data/guides.json', JSON.stringify(JSON.parse(t), null, 2) + '\n');
console.log('conclusions extended');
