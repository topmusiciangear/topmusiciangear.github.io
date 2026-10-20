const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const guides = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'guides.json'), 'utf8'));

const words = /(Speaker|Microphone|Headphones|Headphone|Monitor|Interface|Guitar|Bass|Amplifier|Amp|Mixer|Keyboard|Synthesizer|Synth|Pedal|Stand|Stands|Cable|Case|Bundle|Controller|Recorder|Camera|Oscillator|Module|Drum|Machine|System|Kit|Pack|Pair|Studio|Active|Passive|Powered|Dynamic|Condenser|Wireless|Digital|Analog|Electric|Acoustic|USB|XLR|PA)\b/;
const out = new Map();
for (const g of guides) {
  const v = g.verdict || '';
  for (const m of v.matchAll(/<span class="product-name">([\s\S]*?)<\/span>/g)) {
    const n = m[1];
    if (words.test(n)) out.set(n, (out.get(n) || 0) + 1);
  }
}
console.log('Nombres EN con descriptores (' + out.size + '):');
console.log([...out.keys()].sort().join('\n'));
