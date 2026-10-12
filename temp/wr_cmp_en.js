var fs = require('fs');
var P = 'C:/Users/Daniel/projects/topmusiciangear/';
var guides = JSON.parse(fs.readFileSync(P + 'data/guides.json', 'utf8'));
function bySlug(s) { return guides.filter(function (x) { return (x.slug || x.id) === s; })[0]; }
var g = bySlug('compact-rhythm-devices');

g.intro = "Big studios stay home; these boxes fit in a backpack and run on batteries. From the viral pocket sampler to the bar-shaped workstation, these are the compact rhythm devices that prove small hits harder.";
g.intro_es = g.intro_es.replace('estas diez cajas caben', 'estas cajas caben');

var SEC_H = [
  "How to pick a beat box that fits your backpack",
  "Granular surgery in your palm: AIRA Compact P-6",
  "The viral notepad: EP-133 K.O. II",
  "The bar that retired the OP-Z: Yamaha SEQTRAK",
  "Think Elektron, pay entry-level: Model:Samples",
  "No pixels, just ears: Circuit Rhythm",
  "Dust by design: Liven Lofi-12",
  "The cheapest way in: Volca Sample 2",
  "Math you can touch: Tracker Mini",
  "FM on a knob budget: Model:Cycles",
  "Roland classics to go: TR-6S"
];
var SEC_C = [
  "<p><strong>Battery life, weight and one-hand control decide everything when the studio shrinks to backpack space.</strong> Pocket samplers let you sketch beats anywhere but demand memorizing plenty of menu shortcuts; bar- or grid-shaped grooveboxes trade that extreme portability for far more comfortable physical playing. When choosing, prioritize your travel habits first and the sound engine second.</p><p>The options reviewed below are all fully portable, cost less than any flagship model, and each offers an honest balance of features and technical trade-offs.</p>",
  "<p><strong>A powerful granular synth engine and twenty pro master effects in barely 300 grams.</strong> The P-6 samples straight from mobile devices over USB-C, twists tiny audio fragments into dense textures and sequences up to 64 steps with probability control. It is the deepest pocket sampler Roland has ever designed.</p><p>Its four-character screen forces navigation through complex shortcuts and its tiny buttons hinder fluid finger-drumming. But for sound designers traveling light, no other machine offers this much in so little size.</p>",
  "<p><strong>A sampling calculator that takes on traditional grooveboxes by turning ideas into beats in seconds.</strong> The K.O. II captures its surroundings through its built-in mic, chops samples with pressure-sensitive keys and fires live punch-in effects, all under a chassis as sleek as a tablet.</p><p>Its 128 MB of total memory can run short for complex projects, it lacks a traditional song mode, and its plastic body needs careful transport. Even so, as a portable, instant fun tool, it stays unbeaten in its category.</p>",
  "<p><strong>Two thousand sounds, two real synth engines and digital sampling in an elongated chassis of just 500 grams.</strong> SEQTRAK fuses the huge AWM2 engine library with four-operator FM synth depth. It records samples, packs built-in speaker and mic, and edits flawlessly from a top-tier mobile app.</p><p>Since deep editing is fully delegated to the app and the unit lacks native chopping on the hardware itself, the workflow is hybrid. For travelers wanting a complete studio in one bar, it has become the new standard.</p>",
  "<p><strong>Six sample tracks tied to revolutionary parameter locks and trig conditions for the price of a plugin bundle.</strong> Its one-knob-per-function philosophy, 64-step sequences and a native library of 300 Splice-curated sounds make it the fastest Elektron machine to learn.</p><p>It is a pure playback device (it plays imported samples but records no audio directly) and its 64 MB of RAM per project restricts massive files. For getting into DAWless sequencing on a tight budget, no tool teaches this much for this little.</p>",
  "<p><strong>Thirty-two glowing pads, eight sample tracks and zero digital menus between your hands and the beat.</strong> Circuit Rhythm samples straight into the box, chops and resamples internally on its own, fires Grid FX from its interface and runs up to four hours with no plugs needed.</p><p>Project management and backup depend on the Components app, internal memory is finite, and you will memorize light combos for certain advanced functions. In exchange, for intuition-driven live sets it offers addictive working speed.</p>",
  "<p><strong>Genuine 12-bit grit, a four-track sequencer and the Laidback knob built to inject organic, imperfect swing into your rhythms instantly.</strong> Lofi-12 samples with that classic crunchy nineties color, plays chromatically across its two octaves of keys and offers twelve effects per track plus nine master ones.</p><p>The four-second-per-sample limit can stall loop-based compositions and its time-stretch algorithms are basic. Still, for sculpting classic hip-hop and boom-bap textures from the couch, it is one of the most honest, characterful options on the market.</p>",
  "<p><strong>Two hundred sample memory slots, ten sequencable parts and real-time automation (motion sequencing) at an unbeatable price.</strong> The second-generation Volca Sample doubles the original memory, chains up to sixteen patterns for full song structures and manages libraries over USB nimbly.</p><p>Its 8 MB of total memory is small, it runs on traditional AA batteries instead of lithium, and its effects palette is basic. Even so, as a first step into hardware sampling for curious producers, it has no rival in its price range.</p>",
  "<p><strong>Eight dedicated stereo audio tracks, built-in digital synth engines and a mic at just 350 grams.</strong> Tracker Mini composes, resamples, mixes and masters whole tracks with up to 8 hours of battery, exporting separate tracks over USB straight to your computer.</p><p>Its vertical-screen, buttons-and-cursor workflow demands weeks of practice, and the mechanical click of its keys can sound loud in nighttime rooms. For analytical composers who enjoy structuring music visually and numerically, no portable box goes further.</p>",
  "<p><strong>Six FM synth engines (machines), Elektron sequencer power and an ultra-light 800-gram chassis.</strong> Model:Cycles simplifies FM modulation complexity by turning each engine into a hugely intuitive, malleable instrument, bringing grooves alive through parameter-lock automation.</p><p>It has no sampling engine at all (a pure synthesis machine), its OLED screen is compact, and the physical jumps in its pots' travel take getting used to. For shaping electronic sketches with metallic textures anywhere, it is the cheapest entry into Elektron sound.</p>",
  "<p><strong>The legendary 808, 909 and 606 boxes condensed into a battery-powered unit half the size of its big sister.</strong> TR-6S runs authentic ACB virtual-analog models, adds editable FM synthesis and sample import, plus advanced probability, sub-step and motion-recording tools.</p><p>Its sequencer is strictly limited to 6 simultaneous tracks with a single global physical knob for levels, slowing fast live changes. Still, for Roland punch and classic kicks in a fully standalone backpack format, it is the smartest buy next to the flagship.</p>"
];
g.sections.forEach(function (s, i) { s.heading = SEC_H[i]; s.content = SEC_C[i]; });

g.conclusion = "Pick your device by travel habit: to capture quick sketches anywhere, look at the EP-133 K.O. II, Roland P-6 or Volca Sample 2; for a full studio in a backpack, Yamaha SEQTRAK or Tracker Mini are the best all-in-ones; for tactile live improv, your flow will fit Circuit Rhythm or Liven Lofi-12. Finally, Model:Samples and Model:Cycles are the perfect school for learning Elektron's methodical sequencing philosophy for little money, while the TR-6S keeps Roland's rhythmic legacy fully portable.";

g.verdict = "The EP-133 K.O. II rules viral impact for quick sketches, the Roland P-6 stands as the deepest pocket sampler, and the Yamaha SEQTRAK is the most complete travel studio. Model:Samples and Model:Cycles are the cheapest way into Elektron's sequencing brain; Circuit Rhythm and Liven Lofi-12 are the ideal live-performance picks; Volca Sample 2 is the low-cost entry; Tracker Mini is the analytical composer's choice and the TR-6S is Roland's essence in portable form.";

// ES typo: cboxes -> cajas
g.sections[10].content_es = g.sections[10].content_es.replace('las cboxes 808', 'las cajas 808');

fs.writeFileSync(P + 'data/guides.json', JSON.stringify(guides, null, 2));
console.log('compact long-form done');
