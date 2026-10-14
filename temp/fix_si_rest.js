const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const die = (m) => { console.log('!! ' + m); process.exit(1); };
const gj = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gj, 'utf8'));
const g = guides.find(x => x.id === 'streaming-interfaces');

const iEn = 'the Universal Audio Volt 276 and the Focusrite Vocaster One and the Zoom PodTrak P4next are the t';
if (!g.intro.includes(iEn)) die('intro EN no coincide');
g.intro = g.intro.split('the Universal Audio Volt 276 and the Focusrite Vocaster One and the Zoom PodTrak P4next').join('the Universal Audio Volt 276, the Yamaha URX44V and the Zoom PodTrak P4next');
const iEs = 'el Universal Audio Volt 276 y el Focusrite Vocaster One y el Zoom PodTrak P4next son las mejo';
if (!g.intro_es.includes(iEs)) die('intro ES no coincide');
g.intro_es = g.intro_es.split('el Universal Audio Volt 276 y el Focusrite Vocaster One y el Zoom PodTrak P4next').join('el Universal Audio Volt 276, la Yamaha URX44V y el Zoom PodTrak P4next');

const f = g.featuredSnippet;
const tEn = 'the Focusrite Vocaster One is the best simple solo podcaster int';
if (!f.text_en.includes(tEn)) die('text_en no coincide');
f.text_en = f.text_en.split('the Focusrite Vocaster One is the best simple solo podcaster interface').join('the Yamaha URX44V is the streaming hub with HDMI and multitrack backup');
const tEs = 'el Focusrite Vocaster One es la mejor interfaz simple para podc';
if (!f.text_es.includes(tEs)) die('text_es no coincide');
f.text_es = f.text_es.split('el Focusrite Vocaster One es la mejor interfaz simple para podcasters').join('la Yamaha URX44V es el hub de streaming con HDMI y respaldo multipista');

const qEn = '(Rodecaster Duo, Bridge Cast X, Focusrite Vocaster One, Zoom PodTrak P4next)';
if (!f.faq_a5_en.includes(qEn)) die('A5 EN no coincide');
f.faq_a5_en = f.faq_a5_en.split(qEn).join('(Rodecaster Duo, Bridge Cast X, Yamaha URX44V, Zoom PodTrak P4next)');
const qEs = '(Rodecaster Duo, Bridge Cast X, Focusrite Vocaster One, Zoom PodTrak P4next)';
if (!f.faq_a5_es.includes(qEs)) die('A5 ES no coincide');
f.faq_a5_es = f.faq_a5_es.split(qEs).join('(Rodecaster Duo, Bridge Cast X, Yamaha URX44V, Zoom PodTrak P4next)');

fs.writeFileSync(gj, JSON.stringify(guides, null, 2));
const all = JSON.stringify(g);
console.log('Vocaster restante:', (all.match(/Vocaster/g) || []).length);
