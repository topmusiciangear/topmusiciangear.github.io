var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json','utf8'));

// Check the actual selling patterns in context
var ids = ['budget-mics','stage-wireless','best-beginner-electric-guitar','best-looper-pedals','stream-controllers','best-practice-amps','best-hardware-samplers','best-amp-modelers'];

ids.forEach(gid=>{
  var guide = g.find(x=>x.id===gid);
  if(!guide) return;
  
  guide.sections.forEach((s,i)=>{
    if(!s.content) return;
    var patterns = ['you need to buy','you should buy','you must buy'];
    patterns.forEach(pat=>{
      if(s.content.toLowerCase().includes(pat)) {
        var idx = s.content.toLowerCase().indexOf(pat);
        var ctx = s.content.substring(Math.max(0,idx-40), Math.min(s.content.length, idx+pat.length+60));
        console.log(gid+' sec'+i+': "'+pat+'" -> ...'+ctx+'...');
      }
    });
  });
});

// Check translation ratio extremes
console.log('\n=== TRANSLATION RATIO DETAILS ===');
['re20-vs-sm7b','blx288-vs-ewd','c414-vs-u87'].forEach(gid=>{
  var guide = g.find(x=>x.id===gid);
  if(!guide) return;
  guide.sections.forEach((s,i)=>{
    if(s.content && s.content_es) {
      var enW = s.content.replace(/<[^>]+>/g,'').split(/\s+/).length;
      var esW = s.content_es.replace(/<[^>]+>/g,'').split(/\s+/).length;
      if(esW/enW > 1.8 || esW/enW < 0.5) {
        console.log(gid+' sec'+i+': EN='+enW+' ES='+esW);
        console.log('  EN first 100: '+s.content.replace(/<[^>]+>/g,'').substring(0,100));
        console.log('  ES first 100: '+s.content_es.replace(/<[^>]+>/g,'').substring(0,100));
      }
    }
  });
});
