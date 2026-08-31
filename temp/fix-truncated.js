var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json','utf8'));

var fixed = 0;
var skipped = 0;

g.forEach((guide,gi)=>{
  guide.sections.forEach((s,j)=>{
    if(!s.content_es || s.content_es.length < 50) return;
    var last = s.content_es.trim().slice(-1);
    var endsClean = /[.!?'")\]>]/.test(last);
    if(endsClean) return;
    
    // This section is truncated in ES
    var enText = s.content;
    var esText = s.content_es;
    
    // Find the last complete sentence in ES
    var lastPeriod = Math.max(
      esText.lastIndexOf('.'),
      esText.lastIndexOf('!'),
      esText.lastIndexOf('?'),
      esText.lastIndexOf('"'),
      esText.lastIndexOf('</a>'),
      esText.lastIndexOf('</p>')
    );
    
    if(lastPeriod < 0) { skipped++; return; }
    
    // Get the truncated part (after last period)
    var truncated = esText.substring(lastPeriod+1).trim();
    if(truncated.length < 3) return; // Already complete
    
    // Get the corresponding EN part - find what comes after the similar point in EN
    // Simple approach: count sentences in EN and ES
    var enSentences = enText.split(/(?<=[.!?])\s+/);
    var esSentences = esText.split(/(?<=[.!?])\s+/);
    
    // If ES has fewer sentences than EN, add the missing ones
    if(esSentences.length < enSentences.length) {
      var missing = enSentences.slice(esSentences.length);
      // Simple translation of common endings
      var completions = {
        'For more options, see our guide.': 'Para más opciones, consulta nuestra guía.',
        'For more budget options, see our budget guide.': 'Para más opciones económicas, consulta nuestra guía económica.',
        'See our full guide for more details.': 'Consulta nuestra guía completa para más detalles.',
        'Check out our comparison for more.': 'Consulta nuestra comparativa para más información.',
      };
      
      // Find a matching completion
      var addedText = '';
      missing.forEach(m=>{
        var trimmed = m.trim();
        if(completions[trimmed]) {
          addedText += ' ' + completions[trimmed];
        } else {
          // Generic: just add a period if the truncated text needs it
        }
      });
      
      if(addedText) {
        guide.sections[j].content_es = esText + addedText;
        fixed++;
      }
    }
  });
});

console.log('Fixed: '+fixed);
console.log('Skipped: '+skipped);

// Count remaining truncated
var remaining = 0;
g.forEach(guide=>{
  guide.sections.forEach(s=>{
    if(s.content_es && s.content_es.length > 50) {
      var last = s.content_es.trim().slice(-1);
      if(!/[.!?'")\]>]/.test(last)) remaining++;
    }
  });
});
console.log('Remaining truncated: '+remaining);

fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2), 'utf8');
console.log('Done!');
