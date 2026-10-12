var fs = require('fs');
var P = 'C:/Users/Daniel/projects/topmusiciangear/';
var guides = JSON.parse(fs.readFileSync(P + 'data/guides.json', 'utf8'));
function bySlug(s) { return guides.filter(function (x) { return (x.slug || x.id) === s; })[0]; }
var V = bySlug('compact-rhythm-devices').verdictProsCons;
var EN_PROS = [
  ["A powerful granular synth engine in a barely 300-gram chassis", "20 master effects inherited straight from Roland's acclaimed SP series", "Samples straight from your phone over USB-C", "64-step sequencer with per-step probability control"],
  ["The fastest workflow from idea to beat for under \u20AC300", "Punch-in 2.0 effects built to show off live", "Built-in mic and highly pressure-sensitive keys", "Ultra-sleek design that fits any backpack pocket"],
  ["AWM2 and FM synth engines with 2,000+ built-in sounds", "Sampling, speaker and mic integrated in the unit itself", "Wireless sample transfer over Wi-Fi", "An excellent companion mobile app for deep editing"],
  ["Genuine Elektron sequencing at a very accessible entry price", "One-knob-per-function control with zero menu diving", "Independent per-track polyrhythms and scales", "A 300-sound library carefully curated by Splice"],
  ["Its screen-free pad grid forces you to produce strictly by ear", "Samples, chops and resamples internally with no external tools", "Grid FX built for dynamic live transitions", "Rechargeable battery with up to 4 real hours"],
  ["Real retro sampling engine at a nostalgic 12 bits", "The Laidback knob adds organic, imperfect swing to your rhythms instantly", "Built-in two-octave keyboard for chromatic melodic lines", "Built-in speaker and battery power for couch improv"],
  ["The most competitive price on the market for hardware sampling", "200 memory slots with nimble USB transfer", "Motion sequencing automates parameters live on the fly", "Pattern chaining builds full song structures"],
  ["A full musical-tracker workflow in just 350 grams", "Stereo sampling backed by 4 built-in digital synth engines", "Up to 8 hours of battery plus a premium rigid travel case in the box", "Separate audio tracks over USB straight to your DAW"],
  ["Elektron sequencer power and parameter locks at the brand's lowest price", "Six tracks of versatile FM digital synthesis for metallic, percussive sounds", "Compact, light design for portable sets as a rhythm generator", "Class-compliant USB audio/MIDI for one-cable laptop setups"],
  ["6 ACB virtual-analog models plus importing your own samples", "Total power flexibility: runs on batteries or over USB", "Advanced sequencer with probability, sub-steps and groove variations", "The punch of legendary Roland boxes on batteries in backpack format"]
];
var EN_CONS = [
  ["Its 4-character screen forces memorizing cryptic command combos", "Tiny buttons make fluid finger-drumming hard", "Limited polyphony if you stack overly dense sequences", "Its 3-hour battery can cut longer creation sessions short"],
  ["128 MB of total memory limits extra-long samples", "No dedicated song mode for structuring complex arrangements standalone", "Its plastic chassis needs protected, careful transport", "Its internal workflow isn't tuned for comfortable advanced resampling"],
  ["Deep patch editing strictly requires the mobile app", "No native sample chopping on the hardware itself", "Its bar shape fits backpacks fine, but forget pockets", "No individual outputs \u2014 everything mixes down to stereo"],
  ["A playback machine: plays samples but has no input for recording them directly", "64 MB of RAM per project restricts massive simultaneous sample loads", "Browsing its digital file system feels a bit rudimentary", "No internal battery; needs the power adapter or its optional battery handle"],
  ["No audio waveform display anywhere physical", "Library management and backup fully depend on the Components app", "Per-project storage memory is somewhat limited", "Its 8 tracks are strictly monophonic, limiting harmonic layer stacking"],
  ["Its rigid plastic chassis feels a bit cheap to the touch", "The 4-second-per-sample limit stalls long-loop ambitions", "No advanced time-stretching algorithms", "A sound tightly focused on one niche (lo-fi/boom-bap), limiting versatility"],
  ["8 MB of total memory is tiny by current standards", "Runs on traditional AA batteries with no lithium cell inside", "Basic effects palette with only a global reverb", "Mini pots can annoy big fingers"],
  ["Button-and-cursor navigation demands an initial learning curve", "Its keys' mechanical click can annoy in fully silent rooms", "No classic fast-pad grid for live rhythm improv", "No built-in speaker \u2014 monitoring needs headphones or USB audio"],
  ["A pure synthesis machine: no sampling engine, plays no audio files", "Its tiny monochrome OLED makes fluid visual menu editing hard", "Physical jumps in its pots' travel can spoil smooth filter sweeps", "No song mode \u2014 chaining patterns is manual work"],
  ["Sequencer strictly limited to 6 simultaneous tracks", "Small readout screen with abbreviations to learn", "Its compact design has a single global physical knob, slowing independent level tweaks in a live set", "Tiny knobs and cramped panel demand menu shortcuts for deep edits"]
];
V.forEach(function (it, i) { it.pros = EN_PROS[i]; it.cons = EN_CONS[i]; });
V[2].cons_es.push("Sin salidas independientes: todo se mezcla a est\u00e9reo");
V[7].cons_es.push("Sin altavoz integrado: el monitoreo exige auriculares o audio USB");
V[8].pros_es.push("Audio/MIDI USB class-compliant para un setup de un solo cable");
V[8].cons_es.push("Sin modo canci\u00f3n: encadenar patrones es trabajo manual");
V[9].cons_es.push("Mandos diminutos y panel compacto que exigen atajos de men\u00fa para la edici\u00f3n profunda");
fs.writeFileSync(P + 'data/guides.json', JSON.stringify(guides, null, 2));
console.log('compact pros/cons done');
