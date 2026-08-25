const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json','utf8'));

const btn1 = '<p><a class="guide-link-btn" href="/guides/best-grooveboxes.html">best grooveboxes</a> <a class="guide-link-btn" href="/guides/digitakt-ii-vs-tr8s.html">Digitakt II vs TR-8S</a></p>';
const btn2 = '<p><a class="guide-link-btn" href="/guides/best-drum-machine.html">best drum machines</a> <a class="guide-link-btn" href="/guides/best-hardware-samplers.html">best hardware samplers</a> <a class="guide-link-btn" href="/guides/digitakt-ii-vs-tr8s.html">Digitakt II vs TR-8S</a></p>';

g.find(x=>x.id==='best-drum-machine').sections[0].content += btn1;
g.find(x=>x.id==='best-samplers-drum-computers').sections[0].content += btn2;

console.log('FIXED: best-drum-machine, best-samplers-drum-computers');
fs.writeFileSync('data/guides.json', JSON.stringify(g,null,2),'utf8');
console.log('Saved');
