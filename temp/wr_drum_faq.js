var fs = require('fs');
var P = 'C:/Users/Daniel/projects/topmusiciangear/';
var guides = JSON.parse(fs.readFileSync(P + 'data/guides.json', 'utf8'));
function bySlug(s) { return guides.filter(function (x) { return (x.slug || x.id) === s; })[0]; }
var g = bySlug('best-drum-machine');
var F = g.featuredSnippet;
F.faq_q1 = "Which drum machine should an absolute beginner buy?";
F.faq_a1 = "The Roland T-8 on a tight budget, or the Novation Circuit Tracks for a complete, real groovebox. The T-8 gives you genuine 808/909/606 sounds plus a TB-303 bassline with a built-in battery. Circuit Tracks adds synth, sample and MIDI-track management in a screen-free environment that feels extremely intuitive. Both let you arrange songs without touching a computer from day one.";
F.faq_q2 = "Is the MPC One G2 better than a computer and DAW for making beats?";
F.faq_a2 = "For a purely tactile workflow free of internet distractions, yes. The Akai MPC One G2 runs 100% standalone, letting you sample, sequence and finish full productions right from its pads. It supports 32 plugin instances, stem separation and 100+ built-in effects. A computer DAW gives you more screens and raw processing power, but the MPC locks you into a classic hip-hop environment that many beatmakers find faster and more inspiring.";
F.faq_q3 = "Do I need a drum machine if I already have a DAW in my studio?";
F.faq_a3 = "Not mandatory, but it radically changes how you produce. Hardware like the Roland TR-8S, Digitakt II or Syntakt takes the mouse out of your creative loop, forcing you to jam, sculpt sound and arrange using only hands and ears. Compact boxes like the T-8 or Circuit Tracks are perfect for sketching ideas on the move, while stations like the MPC One G2 or the mighty P\u0113rkons HD-01 act as definitive production hubs.";
F.faq_q4 = "Digitakt II or Syntakt: which Elektron machine should I pick?";
F.faq_a4 = "The golden rule is simple: Digitakt II for sampling, Syntakt for synthesizing. Digitakt II gives you 16 native stereo tracks, 400 MB of working memory per project and advanced algorithms for chopping and modulating external audio across a powerful 128-step sequencer. Syntakt is a multitimbral synth with 12 hybrid tracks (analog and digital) powered by 37 virtual synth engines. Both share the brand's revolutionary parameter locks and song mode.";
F.faq_q5 = "Which box is best for producing and playing techno: TR-8S, Syntakt or P\u0113rkons?";
F.faq_a5 = "Depends on your on-stage role: pick the Roland TR-8S for absolute live control with physical faders per channel and smooth scene transitions; go Elektron Syntakt to design complex hybrid patches and rhythmic textures in one compact box; or jump on the Erica Synths P\u0113rkons HD-01 for a premium industrial-techno instrument with absolute one-knob-per-function control. All three are excellent professional tools; your budget decides between a versatile workhorse and an aspirational studio grail.";
// ES typo: duplicated word
if (F.faq_a5_es.indexOf('un todoterreno todoterreno') >= 0) F.faq_a5_es = F.faq_a5_es.replace('un todoterreno todoterreno', 'un todoterreno vers\u00e1til');
else console.log('ES Q5 typo not found!');
fs.writeFileSync(P + 'data/guides.json', JSON.stringify(guides, null, 2));
console.log('drum FAQ done');
