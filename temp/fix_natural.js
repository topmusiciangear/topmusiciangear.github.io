const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const G = JSON.parse(fs.readFileSync(DIR + 'data/guides.json', 'utf8'));
function rep1(txt, from, to) {
  const c = txt.split(from).length - 1;
  if (c !== 1) throw new Error('found ' + c + 'x: ' + from.slice(0, 70));
  return txt.split(from).join(to);
}
let t = JSON.stringify(G);
// --- OCD duplicated sentence (EN+ES) ---
t = rep1(t, 'made the OCD a modern classic for players who pick hard and want the pedal to bark back, the OCD\u2019s MOSFET clipping made it a modern classic.',
  'made the OCD a modern classic for players who pick hard and want the pedal to bark back.');
t = rep1(t, 'hizo del OCD un cl\u00e1sico moderno para quienes atacan fuerte y quieren que el pedal responda, el clipping MOSFET del OCD lo hizo un cl\u00e1sico moderno.',
  'hizo del OCD un cl\u00e1sico moderno para quienes atacan fuerte y quieren que el pedal responda.');
// --- ES naturalness ---
t = rep1(t, 'El DSP quad-core a 2 GHz mueve modelos', 'El DSP quad-core a 2 GHz procesa modelos');
t = rep1(t, 'el GT-1000CORE mete todo el motor GT', 'el GT-1000CORE comprime todo el motor GT');
t = rep1(t, 'recuerda presets o activa efectos', 'recupera presets o activa efectos');
t = rep1(t, 'para integrar y reampear', 'para integrarlo y hacer reamp');
t = rep1(t, 'La pantalla a color de 5 pulgadas deja arrastrar', 'La pantalla a color de 5 pulgadas permite arrastrar');
t = rep1(t, 'Aseg\u00farate de que te van bien los controles compactos', 'Aseg\u00farate de sentirte c\u00f3modo con los controles compactos');
t = rep1(t, 'el lateral alterna bypass con buffer o true', 'el switch lateral alterna entre bypass con buffer o true');
t = rep1(t, 'Comprueba que el solo-9V encaja en tu fuente', 'Comprueba que la alimentaci\u00f3n solo-9V encaja en tu fuente');
t = rep1(t, 'dobla como boost v\u00eda Red Remote', 'funciona tambi\u00e9n como boost v\u00eda Red Remote');
t = rep1(t, 'cero comederas de cabeza', 'cero complicaciones');
t = rep1(t, 'ambos con respuesta a la din\u00e1mica y limpieza con el volumen', 'ambos responden a la din\u00e1mica y se limpian con el volumen');
t = rep1(t, '164 efectos y 43 pantallas corren en doble DSP', '164 efectos y 43 pantallas funcionan con doble DSP');
t = rep1(t, 'Es para trasteadores que quieren m\u00e1ximas funciones por euro', 'Es para quienes exprimen cada euro en funciones');
t = rep1(t, 'Es para trasteadores del delay que programan sonidos por tema', 'Es para quienes disfrutan trasteando delays y programan sonidos por tema');
t = rep1(t, 'Revisa su tama\u00f1o en tu pedalera y que te encaje', 'Revisa que quepa en tu pedalera y que te encaje');
t = rep1(t, 'Aqu\u00ed viven cantautores y arreglistas que superaron', 'Ideal para cantautores y arreglistas que superaron');
t = rep1(t, 'Solo nota su mayor tama\u00f1o frente a un looper simple', 'A cambio, ocupa m\u00e1s que un looper simple');
t = rep1(t, 'esta es vuestra herramienta', 'esta es tu herramienta ideal');
t = rep1(t, 'Solo esperad menos extras', 'Solo espera menos extras');
t = rep1(t, 'Sigue el l\u00edmite de una pista frente a estaciones multipista', 'con el l\u00edmite de una pista frente a estaciones multipista');
t = rep1(t, 'Solo cuenta con su tama\u00f1o y la curva de men\u00fas profundos', 'Ten en cuenta su tama\u00f1o y la curva de men\u00fas profundos');
t = rep1(t, 'Solo espera m\u00e1s curva que pedales de mando por funci\u00f3n', 'Solo prep\u00e1rate para m\u00e1s curva de aprendizaje que con pedales de mando por funci\u00f3n');
t = rep1(t, 'Solo sabe que la interfaz acusa a\u00f1os', 'Solo ten presente que la interfaz acusa los a\u00f1os');
t = rep1(t, 'Solo nota que lo profundo vive en la app, no en el pedal', 'Solo recuerda que lo profundo vive en la app, no en el pedal');
t = rep1(t, 'Solo acepta operaci\u00f3n mono', 'A cambio, todo funciona en mono');
t = rep1(t, 'Solo sabe que lo profundo se ajusta en la app', 'Solo ten en cuenta que los ajustes profundos se hacen en la app');
t = rep1(t, 'Solo nota que 600 ms limitan ambientes largos', 'Su l\u00edmite: 600 ms que recortan ambientes largos');
t = rep1(t, 'Solo nota la pantalla peque\u00f1a frente a estaciones insignia', 'Su punto d\u00e9bil: la pantalla peque\u00f1a frente a estaciones insignia');
t = rep1(t, 'el Nemesis ADT estira un pedal a todo', 'el Nemesis ADT lo cubre todo con un solo pedal');
t = rep1(t, 'el TimeFactor corre dos delays Eventide como uno', 'el TimeFactor maneja dos delays Eventide como uno');
t = rep1(t, 'el Caverns V2 casa ambos de maravilla', 'el Caverns V2 combina ambos de maravilla');
t = rep1(t, 'el RV-200 mete doce tipos m\u00e1s Arpverb', 'el RV-200 incluye doce tipos m\u00e1s Arpverb');
t = rep1(t, 'el Golden embotella tres springs', 'el Golden re\u00fane tres springs');
// --- EN closers variety ---
t = rep1(t, 'Single-track limits versus multi-track stations remain.', 'Single-track limits still apply.');
t = rep1(t, 'Only note the larger footprint next to single loopers.', 'The trade-off: a larger footprint.');
t = rep1(t, 'Just know it has more menu depth than the simple RC-5.', 'The trade-off: more menu depth.');
t = rep1(t, 'Just note the size and the learning curve of deep menus.', 'The trade-off: size and deep menus.');
t = rep1(t, 'Just note deep editing lives in the app, not on the pedal.', 'Deep editing, though, lives in the app.');
t = rep1(t, 'Just accept mono operation throughout.', 'The trade-off: mono throughout.');
t = rep1(t, 'Just know deep tweaking happens in the app.', 'Deep tweaking happens in the app.');
t = rep1(t, 'Just note 600ms caps long ambient washes.', 'The limit: 600ms caps long ambient washes.');
t = rep1(t, 'Just note the small screen next to flagship workstations.', 'The trade-off: a small screen.');
fs.writeFileSync(DIR + 'data/guides.json', JSON.stringify(JSON.parse(t), null, 2) + '\n');
console.log('naturalness fixes applied');
