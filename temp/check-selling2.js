var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json','utf8'));

// Find exact location of "you need to buy" / "you should buy"
var ids = ['budget-mics','stage-wireless','best-beginner-electric-guitar','best-looper-pedals','stream-controllers','best-practice-amps','best-hardware-samplers','best-amp-modelers'];

ids.forEach(gid=>{
  var guide = g.find(x=>x.id===gid);
  if(!guide) return;
  
  guide.sections.forEach((s,i)=>{
    ['content','content_es'].forEach(f=>{
      if(!s[f]) return;
      var lower = s[f].toLowerCase();
      ['you need to buy','you should buy','you need a','you need an'].forEach(pat=>{
        if(lower.includes(pat)) {
          var idx = lower.indexOf(pat);
          var before = s[f].substring(Math.max(0,idx-60), idx);
          var after = s[f].substring(idx, idx+pat.length+60);
          console.log(gid+' sec'+i+' '+f+':');
          console.log('  ...'+before+'['+after+']...');
        }
      });
    });
  });
});

// budget-bass-like-expensive sec4 - expand
console.log('\n=== budget-bass-like-expensive sec4 ===');
var guide = g.find(x=>x.id==='budget-bass-like-expensive');
var s4 = guide.sections[4];
console.log('EN length: '+s4.content.replace(/<[^>]+>/g,'').split(/\s+/).length);
console.log('ES length: '+s4.content_es.replace(/<[^>]+>/g,'').split(/\s+/).length);
console.log('EN first 200: '+s4.content.replace(/<[^>]+>/g,'').substring(0,200));
console.log('ES first 200: '+s4.content_es.replace(/<[^>]+>/g,'').substring(0,200));
