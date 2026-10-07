const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const G = JSON.parse(fs.readFileSync(DIR + 'data/guides.json', 'utf8'));
function rep1(txt, from, to) {
  const c = txt.split(from).length - 1;
  if (c !== 1) throw new Error('found ' + c + 'x: ' + from.slice(0, 70));
  return txt.split(from).join(to);
}
let t = JSON.stringify(G);
// --- overdrive openers ---
t = rep1(t, '<strong>If you pick hard and want the pedal to bark back,',
  '<strong>Touch-sensitive MOSFET clipping made the OCD a modern classic for players who pick hard and want the pedal to bark back,');
t = rep1(t, '<strong>Si atacas fuerte y quieres que el pedal responda,',
  '<strong>El clipping MOSFET sensible al tacto hizo del OCD un clásico moderno para quienes atacan fuerte y quieren que el pedal responda,');
t = rep1(t, '<strong>If you love the Klon sound but need real tone controls,',
  '<strong>Klon sound with real tone controls:');
t = rep1(t, '<strong>Si amas el sonido Klon pero necesitas controles de tono de verdad,',
  '<strong>Sonido Klon con controles de tono de verdad:');
t = rep1(t, '<strong>If your amp is almost there and needs a transparent push,',
  '<strong>Almost-there amps need a transparent push:');
t = rep1(t, '<strong>Si tu ampli casi llega y necesita un empujón transparente,',
  '<strong>Los amplis que casi llegan necesitan un empujón transparente:');
t = rep1(t, '<strong>If two knobs are all you want to think about,',
  '<strong>Two knobs, zero overthinking:');
t = rep1(t, '<strong>Si dos mandos son todo lo que quieres pensar,',
  '<strong>Dos mandos, cero comederas de cabeza:');
t = rep1(t, '<strong>If the BD-2 earned its place but you want the premium take,',
  '<strong>The BD-2 earned its place; the BD-2W is the premium take:');
t = rep1(t, '<strong>Si el BD-2 se ganó su sitio pero quieres la versión premium,',
  '<strong>El BD-2 se ganó su sitio; el BD-2W es la versión premium:');
// --- multi-effects new-section openers ---
t = rep1(t, '<strong>If you want a full stage rig with a big touchscreen and deep routing,',
  '<strong>A full stage rig with big touchscreen and deep routing:');
t = rep1(t, '<strong>Si quieres un sistema completo de escenario con pantalla grande y ruteo profundo,',
  '<strong>Un sistema completo de escenario, pantalla grande y ruteo profundo:');
t = rep1(t, '<strong>If you want flagship Boss tone in the smallest possible box,',
  '<strong>Flagship Boss tone in the smallest possible box:');
t = rep1(t, '<strong>Si quieres el tono insignia de Boss en la caja más pequeña posible,',
  '<strong>El tono insignia de Boss en la caja más pequeña posible:');
t = rep1(t, '<strong>If you want to clone your own amps and carry them in a compact floorboard,',
  '<strong>Clone your own amps and carry them in a compact floorboard:');
t = rep1(t, '<strong>Si quieres clonar tus propios amplis y llevarlos en una pedalera compacta,',
  '<strong>Clona tus propios amplis y llévalos en una pedalera compacta:');
t = rep1(t, '<strong>If you want amp modeling plus a synth engine and sampling tricks at a lower price,',
  '<strong>Amp modeling plus synth engine and sampling tricks at a lower price:');
t = rep1(t, '<strong>Si quieres modelado más motor de sinte y trucos de muestreo a menor precio,',
  '<strong>Modelado más motor de sinte y trucos de muestreo a menor precio:');
fs.writeFileSync(DIR + 'data/guides.json', JSON.stringify(JSON.parse(t), null, 2) + '\n');
console.log('openers varied');
