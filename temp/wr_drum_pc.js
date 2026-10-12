var fs = require('fs');
var P = 'C:/Users/Daniel/projects/topmusiciangear/';
var guides = JSON.parse(fs.readFileSync(P + 'data/guides.json', 'utf8'));
function bySlug(s) { return guides.filter(function (x) { return (x.slug || x.id) === s; })[0]; }
var g = bySlug('best-drum-machine');
var V = g.verdictProsCons;
var EN_PROS = [
  ["Iconic 808, 909 and 606 sounds plus a TB-303 bassline in barely 310 grams", "Built-in rechargeable battery for laying down grooves anywhere", "Classic hands-on TR-REC workflow with no learning curve", "The cheapest entry into genuine Roland virtual-analog sound"],
  ["Screen-free workflow that forces you to arrange songs by ear alone", "Built-in battery and microSD slot for carrying entire sample packs anywhere", "Huge versatility: two digital synths, four drum tracks and two extra MIDI channels in one box", "One of the friendliest, fastest grooveboxes to learn on the market"],
  ["Ten pure analog voices with a dedicated Color distortion knob", "Advanced 64-step polyrhythmic sequencer with instant roller functions", "Global master distortion circuit plus individual physical outputs for separate processing", "The most fun per euro spent on pure analog rhythm hardware"],
  ["The definitive standard for techno live sets thanks to dedicated faders per channel", "Combines circuit-modeling (ACB) synthesis with importing your own samples", "Scene functions switch whole kits and variations mid-bar, smoothly", "Six independent physical outputs plus multichannel USB audio straight to your mixer"],
  ["The iconic pad workflow that invented hip-hop, now with twice the processing power", "Song structuring and finishing right on its standalone touchscreen with built-in stem support", "Huge capacity with 32 plugin instances, 16 stereo audio tracks and 64 GB of internal storage", "Massive connectivity with 24-channel USB-C audio, Wi-Fi, Bluetooth and the renewed MPC 3 OS"],
  ["Sixteen native stereo tracks for sampling absolutely any external or digital audio source", "Advanced sequencer up to 128 steps with revolutionary parameter locks and Euclidean rhythm generation", "Plenty of headroom with 400 MB of RAM per project and 20 GB of fast internal storage", "One of the deepest, most inspiring digital sampling instruments in this guide"],
  ["The best of both worlds: visceral analog drum punch and exotic digital textures in one box", "Extreme versatility with 37 synth engines (machines) ranging from thunderous kicks to crystalline chords", "Full song mode plus native Overbridge for sending separate tracks over USB", "Any of its 12 tracks can instantly become an external MIDI sequencing track"],
  ["An imposing physical interface with one control per function, suitcase-sized reinforced chassis and zero digital menus", "Devastating built-in analog filters with a BBD tape-style delay module ideal for industrial textures", "Plays and behaves like an expressive analog instrument, not a mere programmable box", "Nothing on the market looks this aggressive or hits this hard down low"]
];
var EN_CONS = [
  ["Tiny knobs punish players with big fingers", "No sampling engine of its own; you depend strictly on its factory sounds", "3.5 mm minijack MIDI forces you to carry adapter cables", "Its pocket size makes it prone to drops and careless losses"],
  ["Deep synth-patch design strictly requires its computer or tablet app", "Basic sequences can fall short for highly complex arrangements unless you chain patterns aggressively", "Rubber pads show cosmetic wear under heavy live use", "No sampling engine on board \u2014 you play its synths and loaded samples only"],
  ["No internal audio memory or sample engine; a pure synthesis machine through and through", "Real analog circuitry means tuning can drift slightly with room temperature", "Its thunderous lows guarantee neighbor visits or complaints if you don't watch the volume", "No preset storage \u2014 every sound has to be rebuilt by hand"],
  ["Advanced settings hide behind several menu layers under its tactile surface", "Its 2.1 kg and permanent mains power anchor it to stage or studio", "Priced in premium territory next to more compact alternatives", "No built-in battery \u2014 it lives plugged into the wall"],
  ["Touchscreen can feel cramped in big projects if you're used to a large computer monitor", "4 GB of RAM sets the technical ceiling for projects with massive loaded sample counts", "No built-in battery for working outdoors portably", "Drops its classic red paint for a sober black design"],
  ["Elektron's sequencer logic imposes a demanding initial learning curve for beginners", "Its 128x64 monochrome OLED screen will make you squint when editing complex waves", "Its price demands serious money before entering its sound-design ecosystem", "No built-in battery or speakers \u2014 desk-bound by design"],
  ["No sampling engine; relies exclusively on its internal synth generators", "Its small screen keeps Elektron's classic menu-diving alive", "Its workflow feels more abstract and cold than pad-based traditional grooveboxes", "Only 12 tracks shared between internal voices and MIDI \u2014 big setups run out fast"],
  ["Its 3.7 kg of heavy metal chassis means it rarely leaves your main studio desk", "Zero sampling options despite a flagship price", "What this box costs could fund a full studio or live rig of several alternative machines", "Only four voices \u2014 dense chords and long releases eat through polyphony fast"]
];
var ES_4TH = {
  1: "Sin motor de sampling integrado: solo tocas sus sintes y las muestras cargadas",
  2: "Sin memoria de presets: cada sonido hay que reconstruirlo a mano",
  3: "Sin bater\u00eda integrada: vive enchufada a la corriente",
  5: "Sin bater\u00eda ni altavoces integrados: dise\u00f1ada para el escritorio",
  6: "Solo 12 pistas compartidas entre voces internas y MIDI: los sets grandes se quedan cortos r\u00e1pido",
  7: "Solo cuatro voces: acordes densos y releases largos agotan la polifon\u00eda r\u00e1pido"
};
V.forEach(function (it, i) { it.pros = EN_PROS[i]; it.cons = EN_CONS[i]; });
Object.keys(ES_4TH).forEach(function (k) { V[+k].cons_es.push(ES_4TH[k]); });
fs.writeFileSync(P + 'data/guides.json', JSON.stringify(guides, null, 2));
console.log('drum pros/cons done');
