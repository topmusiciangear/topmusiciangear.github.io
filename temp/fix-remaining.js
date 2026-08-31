var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json','utf8'));

var fixed = 0;

function fixField(obj, field, from, to) {
  if(obj[field] && obj[field].includes(from)) {
    obj[field] = obj[field].split(from).join(to);
    return true;
  }
  return false;
}

function fixAll(from, to) {
  g.forEach(guide=>{
    ['intro','conclusion','intro_es','conclusion_es'].forEach(f=>{
      if(fixField(guide, f, from, to)) fixed++;
    });
    guide.sections.forEach((s,i)=>{
      ['content','content_es'].forEach(f=>{
        if(fixField(guide.sections[i], f, from, to)) fixed++;
      });
    });
  });
}

// Duplicate words
fixAll('cara cara', 'cara');
fixAll('the a', 'a');

// ES space before ¿
fixAll(' ¿', '¿');

// ES double conjunction in live-sound-pa new sections
fixAll('o o ', 'o ');

// EN selling - contextual fixes
// "you need to buy" patterns - check context
fixAll('you need to buy the', 'consider buying the');
fixAll('you need to buy a', 'consider buying a');
fixAll('you should buy the', 'consider buying the');
fixAll('you should buy a', 'consider buying a');

// Stage-wireless: we need to find what product 107 is
// It's referenced in stage-wireless - likely Shure BLX24R/SM58 or similar
// Let's check what's in the guide
g.forEach(guide=>{
  if(guide.id === 'stage-wireless') {
    var allIds = [...new Set(guide.sections.flatMap(s=>s.products||[]))];
    console.log('stage-wireless products: '+allIds.join(', '));
  }
});

// For translation ratio issues - these are usually sections where one language
// has significantly more content. The main fix is to check if ES has broken content.
// re20-vs-sm7b, blx288-vs-ewd - let's check
g.forEach(guide=>{
  if(guide.id === 're20-vs-sm7b' || guide.id === 'blx288-vs-ewd') {
    guide.sections.forEach((s,i)=>{
      var enW = s.content ? s.content.replace(/<[^>]+>/g,'').split(/\s+/).length : 0;
      var esW = s.content_es ? s.content_es.replace(/<[^>]+>/g,'').split(/\s+/).length : 0;
      console.log(guide.id+' sec'+i+': EN='+enW+' ES='+esW+' ratio='+(esW/enW).toFixed(2));
    });
  }
});

fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2), 'utf8');
console.log('\nTotal fixes: '+fixed);
