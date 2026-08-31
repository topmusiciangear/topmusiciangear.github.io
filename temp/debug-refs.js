var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json','utf8'));

// Check vocal-plugins
var vp = g.find(x=>x.id==='vocal-plugins');
vp.sections.forEach((s,j)=>{
  if(s.content && s.content.includes('use for professional')) {
    console.log('vocal-plugins S'+j+': ...'+s.content.substring(s.content.indexOf('use for professional')-30, s.content.indexOf('use for professional')+50)+'...');
  }
});

// Check ts9-vs-bd2
var ts = g.find(x=>x.id==='ts9-vs-bd2');
ts.sections.forEach((s,j)=>{
  if(s.content && s.content.includes('used both')) {
    console.log('ts9-vs-bd2 S'+j+': ...'+s.content.substring(s.content.indexOf('used both')-20, s.content.indexOf('used both')+50)+'...');
  }
});

// Check scarlett-vs-ssl
var ssl = g.find(x=>x.id==='scarlett-vs-ssl');
ssl.sections.forEach((s,j)=>{
  if(s.content && s.content.includes('desk')) {
    console.log('scarlett-vs-ssl S'+j+': ...'+s.content.substring(s.content.indexOf('desk')-30, s.content.indexOf('desk')+30)+'...');
  }
});

// Check open-headphones
var oh = g.find(x=>x.id==='open-headphones');
oh.sections.forEach((s,j)=>{
  if(s.content && s.content.includes('my room')) {
    console.log('open-headphones S'+j+': ...'+s.content.substring(s.content.indexOf('my room')-20, s.content.indexOf('my room')+30)+'...');
  }
});
