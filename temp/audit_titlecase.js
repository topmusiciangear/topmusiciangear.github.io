const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));

const ACRO = /^[A-Z0-9&]{1,5}(\+|-|\d)*$/;
const BRANDS = new Set(['iZotope','Sonible','Waves','Zynaptiq','Acon','Ableton','FL','Studio','Pro','Vx','RX','smart','deess','Unveil','Clarity','Standard','Digital','Restoration','Suite','Audio','Neumann','Shure','AKG','Rode','Yamaha','Fender','Martin','Taylor','Gibson','JBL','EV','QSC','Mackie','Roland','Boss','Korg','Nord','Moog','Sequential','Arturia','Native','Instruments','Universal','RME','Focusrite','PreSonus','Behringer','MOTU','Audient','SSL','Solid','State','Logic','X','Gen','Twin','Babyface','Apollo','Scarlett','Clarett','Volt','SiX','BiG','Les','Paul','Stratocaster','Telecaster','Strat','Tele','Jazzmaster','Jaguar','Mustang','Precision','Jazz','Bass','Guitar','Acoustic','Electric','Dynamic','Condenser','Ribbon','Microphone','Mic','Vocal','Live','Stage','Wireless','System','Monitor','Monitors','Speaker','Speakers','Headphones','Headphone','Ear','Drum','Drums','Machine','Machines','Pedal','Pedals','Effects','Effect','FX','Amp','Amps','Amplifier','Amplifiers','Interface','Interfaces','Mixer','Mixers','Console','Consoles','DAW','DAWs','Plugin','Plugins','VST','VST2','VST3','AU','AAX','MIDI','USB','XLR','EQ','DSP','IA','AI','Max','Mini','Plus','Ultra','Elite','Premium','Professional','Budget','Best','Top','Guide','Guides','Review','Reviews','Comparison','Versus','And','Or','The','For','In','On','At','To','Of','With','By','From']);

let titleCaseCount = 0;
const examples = [];

guides.forEach(g => {
  (g.sections || []).forEach((s, i) => {
    const h = s.heading_es || '';
    const words = h.split(/[\s\-–—,()]+/).filter(Boolean);
    let hasTitleCase = false;
    const badWords = [];
    for (let j = 1; j < words.length; j++) {
      const w = words[j].replace(/^[¿¡"'«*[]/, '');
      if (w.length > 1 && w[0] === w[0].toUpperCase() && w[0] !== w[0].toLowerCase() && !ACRO.test(w) && !BRANDS.has(w)) {
        hasTitleCase = true;
        badWords.push(w);
      }
    }
    if (hasTitleCase) {
      titleCaseCount++;
      if (examples.length < 30) examples.push({ id: g.id, heading: h, badWords: badWords });
    }
  });
});

console.log('Sections with Title Case in heading_es:', titleCaseCount);
console.log('Examples:');
examples.forEach(e => {
  console.log(e.id + ': ' + e.heading);
  console.log('  Bad words: ' + e.badWords.join(', '));
});