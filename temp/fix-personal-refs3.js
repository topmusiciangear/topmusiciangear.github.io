var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json','utf8'));

// vocal-plugins conclusion
var vp = g.find(x=>x.id==='vocal-plugins');
if(vp.conclusion.includes('I use for professional')) {
  vp.conclusion = vp.conclusion.split('the exact processing path I use for professional vocal production').join('a professional vocal production signal chain');
  console.log('vocal-plugins conclusion: fixed');
}

// ts9-vs-bd2 intro
var ts = g.find(x=>x.id==='ts9-vs-bd2');
if(ts.intro.includes("I've used both")) {
  ts.intro = ts.intro.split("I've used both extensively on stage and in the studio").join("Both appear extensively on stage and in the studio");
  console.log('ts9-vs-bd2 intro: fixed');
}

// scarlett-vs-ssl - check sections again
var ssl = g.find(x=>x.id==='scarlett-vs-ssl');
ssl.sections.forEach((s,j)=>{
  if(s.content && s.content.includes('my desk')) {
    console.log('scarlett-vs-ssl S'+j+' still has my desk');
  }
});

fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2), 'utf8');
console.log('\nDone!');
