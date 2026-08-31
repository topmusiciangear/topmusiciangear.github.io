var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json','utf8'));

var issues = [];

g.forEach(guide=>{
  // Check all ES fields for personal refs
  var esFields = {intro_es: guide.intro_es, conclusion_es: guide.conclusion_es};
  guide.sections.forEach((s,j)=>{
    esFields['sections['+j+'].content_es'] = s.content_es;
  });
  if(guide.faq) guide.faq.forEach((f,j)=>{
    if(f.q_es) esFields['faq['+j+'].q_es'] = f.q_es;
    if(f.a_es) esFields['faq['+j+'].a_es'] = f.a_es;
  });
  
  Object.entries(esFields).forEach(([field, text])=>{
    if(!text) return;
    // Personal refs
    ['He tenido','He hecho','He encontrado','He visto','He escuchado','He probado'].forEach(p=>{
      if(text.includes(p)) issues.push(guide.id+' '+field+': PERSONAL "'+p+'"');
    });
    // Broken ending (ends mid-word or with orphan preposition)
    if(text.match(/\s(?:de|en|con|por|para|sin|sobre|bajo|hasta|desde|que|y|o|el|la|lo|los|las|un|una|uno)$/)) {
      issues.push(guide.id+' '+field+': BROKEN ENDING');
    }
    // Double spaces
    if(text.includes('  ')) issues.push(guide.id+' '+field+': DOUBLE SPACE');
    // Missing period at end (for content fields, not headings)
    if(field.includes('content_es') && text.length > 50 && !text.match(/[.!?"']\s*$/) && !text.match(/<\/a>\s*$/) && !text.match(/<\/p>\s*$/)) {
      issues.push(guide.id+' '+field+': MISSING END PUNCTUATION');
    }
  });
  
  // Check EN fields for personal refs
  var enFields = {intro: guide.intro, conclusion: guide.conclusion};
  guide.sections.forEach((s,j)=>{
    enFields['sections['+j+'].content'] = s.content;
  });
  if(guide.faq) guide.faq.forEach((f,j)=>{
    if(f.q) enFields['faq['+j+'].q'] = f.q;
    if(f.a) enFields['faq['+j+'].a'] = f.a;
  });
  
  Object.entries(enFields).forEach(([field, text])=>{
    if(!text) return;
    ["I have tested","I've tested","I tested","I have tried","I've tried","I got the chance"].forEach(p=>{
      if(text.includes(p)) issues.push(guide.id+' '+field+': PERSONAL "'+p+'"');
    });
  });
});

// Remove duplicates
issues = [...new Set(issues)];

// Group by type
var grouped = {};
issues.forEach(i=>{
  var type = i.match(/": (.+)$/)?.[1] || 'OTHER';
  if(!grouped[type]) grouped[type] = [];
  grouped[type].push(i);
});

Object.keys(grouped).sort().forEach(type=>{
  console.log('\n=== '+type+' ('+grouped[type].length+') ===');
  grouped[type].slice(0,15).forEach(i=>console.log('  '+i));
  if(grouped[type].length > 15) console.log('  ... and '+ (grouped[type].length-15)+' more');
});

console.log('\n=== TOTAL: '+issues.length+' ===');
