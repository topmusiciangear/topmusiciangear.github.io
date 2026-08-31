var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json','utf8'));

// Fix with correct section indices
function fix(id, section, from, to) {
  var guide = g.find(x=>x.id===id);
  if(!guide) { console.log('NOT FOUND: '+id); return; }
  var s = guide.sections[section];
  if(!s) { console.log(id+' S'+section+': NOT FOUND'); return; }
  if(s.content.includes(from)) {
    s.content = s.content.split(from).join(to);
    console.log(id+' S'+section+': fixed');
  } else {
    console.log(id+' S'+section+': NOT FOUND "'+from.substring(0,30)+'"');
  }
}

// Also fix scarlett-vs-ssl - find it
var ssl = g.find(x=>x.id==='scarlett-vs-ssl');
ssl.sections.forEach((s,j)=>{
  if(s.content && s.content.includes('my desk')) {
    console.log('scarlett-vs-ssl S'+j+' has my desk');
    s.content = s.content.split('The SSL 2+ lives on my desk.').join('The SSL 2+ stays within reach.');
    s.content = s.content.split('in my travel bag').join('in a travel bag');
  }
});

// vocal-plugins
var vp = g.find(x=>x.id==='vocal-plugins');
vp.sections.forEach((s,j)=>{
  if(s.content && s.content.includes('I use for professional')) {
    console.log('vocal-plugins S'+j+' has I use');
    s.content = s.content.split('the exact processing path I use for professional vocal production').join('a professional vocal production signal chain');
  }
});

// best-hardware-samplers
var bhs = g.find(x=>x.id==='best-hardware-samplers');
bhs.sections.forEach((s,j)=>{
  if(s.content && s.content.includes('I use')) {
    console.log('best-hardware-samplers S'+j+' has I use: '+s.content.substring(s.content.indexOf('I use')-20, s.content.indexOf('I use')+30));
  }
});

fix('best-headphones', 1, 'I use these for tracking vocals', 'These are solid for tracking vocals');
fix('budget-mics', 8, "I've used the AT2020 on vocal demos, fingerpicked", "The AT2020 handles vocal demos, fingerpicked");
fix('open-headphones', 2, 'I use the DT 990 Pro for', 'The DT 990 Pro works well for');
fix('tracking-headphones', 1, 'I use the 80 Ohm version,', 'The 80 Ohm version,');
fix('mixing-plugins', 2, 'the only EQ I use', 'a go-to EQ for many engineers');
fix('fx-plugins', 1, 'I use something from Soundtoys on literally every', 'Something from Soundtoys appears on virtually every');
fix('tube-ribbon-mics', 2, "I've used the C414 on drum overheads", "The C414 excels on drum overheads");
fix('sm57-vs-sm58', 1, "I've used SM57s on guitar cabs at Glastonbury and", "SM57s handle guitar cabs at Glastonbury and");
fix('best-samplers-drum-computers', 1, "I've used it to build entire live sets", "It builds entire live sets");
fix('beat-making', 1, "the most fun drum machine I've used", "one of the most enjoyable drum machines available");

// Fix open-headphones 'my room'
var oh = g.find(x=>x.id==='open-headphones');
oh.sections.forEach((s,j)=>{
  if(s.content && s.content.includes('my room')) {
    console.log('open-headphones S'+j+' has my room');
    s.content = s.content.split('treat my room').join('treat a room');
  }
});

fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2), 'utf8');
console.log('\nDone!');
