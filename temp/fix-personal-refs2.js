var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json','utf8'));

// open-headphones intro has "my room"
var oh = g.find(x=>x.id==='open-headphones');
if(oh.intro && oh.intro.includes('my room')) {
  oh.intro = oh.intro.split('treat my room').join('treat a room');
  console.log('open-headphones intro: fixed my room');
}
oh.sections.forEach((s,j)=>{
  if(s.content && s.content.includes('my room')) {
    oh.sections[j].content = s.content.split('treat my room').join('treat a room');
    console.log('open-headphones S'+j+': fixed my room');
  }
});

// vocal-plugins - check all sections
var vp = g.find(x=>x.id==='vocal-plugins');
vp.sections.forEach((s,j)=>{
  if(s.content && s.content.includes('I use for professional')) {
    vp.sections[j].content = s.content.split('the exact processing path I use for professional vocal production').join('a professional vocal production signal chain');
    console.log('vocal-plugins S'+j+': fixed');
  }
});

// scarlett-vs-ssl - check all sections
var ssl = g.find(x=>x.id==='scarlett-vs-ssl');
ssl.sections.forEach((s,j)=>{
  if(s.content && s.content.includes('my desk')) {
    ssl.sections[j].content = s.content.split('The SSL 2+ lives on my desk.').join('The SSL 2+ stays within reach.');
    ssl.sections[j].content = ssl.sections[j].content.split('in my travel bag').join('in a travel bag');
    console.log('scarlett-vs-ssl S'+j+': fixed');
  }
});
// Also check intro/conclusion
if(ssl.intro && ssl.intro.includes('my desk')) {
  ssl.intro = ssl.intro.split('The SSL 2+ lives on my desk.').join('The SSL 2+ stays within reach.');
  console.log('scarlett-vs-ssl intro: fixed');
}
if(ssl.conclusion && ssl.conclusion.includes('my desk')) {
  ssl.conclusion = ssl.conclusion.split('The SSL 2+ lives on my desk.').join('The SSL 2+ stays within reach.');
  console.log('scarlett-vs-ssl conclusion: fixed');
}

// ts9-vs-bd2
var ts = g.find(x=>x.id==='ts9-vs-bd2');
ts.sections.forEach((s,j)=>{
  if(s.content && s.content.includes("I've used both")) {
    ts.sections[j].content = s.content.split("I've used both extensively on stage and in the st").join("Both appear extensively on stage and in the st");
    console.log('ts9-vs-bd2 S'+j+': fixed');
  }
});

// best-hardware-samplers - false positive (use microSD is product feature)
// Skip this one

fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2), 'utf8');
console.log('\nDone!');
