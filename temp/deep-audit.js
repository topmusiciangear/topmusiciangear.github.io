var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json','utf8'));

var issues = [];

function check(guideId, field, text) {
  if(!text || !Array.isArray(text)) {
    if(!text) return;
    text = [text];
  }
  text.forEach((t,i)=>{
    if(!t || typeof t !== 'string') return;
    var suffix = Array.isArray(text) ? '['+i+']' : '';
    
    // Empty or too short
    if(t.trim().length < 5 && field !== 'heading_es') {
      issues.push(guideId+' '+field+suffix+': TOO SHORT: "'+t+'"');
    }
    
    // Broken HTML
    if((t.match(/<strong>/g)||[]).length !== (t.match(/<\/strong>/g)||[]).length) {
      issues.push(guideId+' '+field+suffix+': BROKEN <strong> tag');
    }
    if((t.match(/<p>/g)||[]).length !== (t.match(/<\/p>/g)||[]).length) {
      issues.push(guideId+' '+field+suffix+': BROKEN <p> tag');
    }
    if((t.match(/<a /g)||[]).length !== (t.match(/<\/a>/g)||[]).length) {
      issues.push(guideId+' '+field+suffix+': BROKEN <a> tag');
    }
    
    // Broken phrases ES
    if(field.includes('_es')) {
      if(t.includes('A más que')) issues.push(guideId+' '+field+suffix+': BROKEN "A más que"');
      if(t.includes('A cuesta más que')) issues.push(guideId+' '+field+suffix+': BROKEN "A cuesta más que"');
      if(t.includes('asi que')) issues.push(guideId+' '+field+suffix+': MISSING ACCENT "asi que"');
      if(t.includes('contrapartida')) issues.push(guideId+' '+field+suffix+': ODD "contrapartida"');
      if(t.includes('interesar')) issues.push(guideId+' '+field+suffix+': WRONG "interesar"');
      if(t.includes('estás al aire')) issues.push(guideId+' '+field+suffix+': LITERAL "estás al aire"');
      if(t.includes('lo que sacrifice')) issues.push(guideId+' '+field+suffix+': AWKWARD "lo que sacrifice"');
      if(t.includes('El USB-C significa')) issues.push(guideId+' '+field+suffix+': AWKWARD "El USB-C"');
      if(t.match(/\bprobar\b/) && !field.includes('faq')) issues.push(guideId+' '+field+suffix+': HAS "probar" (check context)');
    }
    
    // Broken phrases EN
    if(!field.includes('_es')) {
      if(t.includes('I have tested')) issues.push(guideId+' '+field+suffix+': PERSONAL "I have tested"');
      if(t.includes('I use ')) issues.push(guideId+' '+field+suffix+': PERSONAL "I use"');
      if(t.includes("I've used")) issues.push(guideId+' '+field+suffix+': PERSONAL "I\'ve used"');
      if(t.includes('my desk')) issues.push(guideId+' '+field+suffix+': PERSONAL "my desk"');
      if(t.includes('my room')) issues.push(guideId+' '+field+suffix+': PERSONAL "my room"');
      if(t.includes('today today')) issues.push(guideId+' '+field+suffix+': DUPLICATE "today today"');
    }
  });
}

g.forEach(guide=>{
  // Check intro/conclusion
  check(guide.id, 'intro', guide.intro);
  check(guide.id, 'intro_es', guide.intro_es);
  check(guide.id, 'conclusion', guide.conclusion);
  check(guide.id, 'conclusion_es', guide.conclusion_es);
  
  // Check sections
  guide.sections.forEach((s,j)=>{
    check(guide.id, 'sections['+j+'].heading', s.heading);
    check(guide.id, 'sections['+j+'].heading_es', s.heading_es);
    check(guide.id, 'sections['+j+'].content', s.content);
    check(guide.id, 'sections['+j+'].content_es', s.content_es);
  });
  
  // Check FAQ
  if(guide.faq) guide.faq.forEach((f,j)=>{
    check(guide.id, 'faq['+j+'].q', f.q);
    check(guide.id, 'faq['+j+'].q_es', f.q_es);
    check(guide.id, 'faq['+j+'].a', f.a);
    check(guide.id, 'faq['+j+'].a_es', f.a_es);
  });
  
  // Check verdictProsCons
  if(guide.verdictProsCons) guide.verdictProsCons.forEach((v,j)=>{
    check(guide.id, 'verdictProsCons['+j+'].pros_es', v.pros_es);
    check(guide.id, 'verdictProsCons['+j+'].cons_es', v.cons_es);
    check(guide.id, 'verdictProsCons['+j+'].pros', v.pros);
    check(guide.id, 'verdictProsCons['+j+'].cons', v.cons);
  });
  
  // Check productTable
  if(guide.productTable && guide.productTable.rows) {
    guide.productTable.rows.forEach((r,j)=>{
      if(r.cells) r.cells.forEach((c,k)=>{
        if(typeof c === 'string' && c.length < 1 && k > 0) {
          issues.push(guide.id+' productTable.row['+j+'].cell['+k+']: EMPTY');
        }
      });
    });
  }
});

// Group by type
var grouped = {};
issues.forEach(i=>{
  var type = i.match(/: (.+)$/)?.[1] || 'OTHER';
  if(!grouped[type]) grouped[type] = [];
  grouped[type].push(i);
});

Object.keys(grouped).sort().forEach(type=>{
  console.log('\n=== '+type+' ('+grouped[type].length+') ===');
  grouped[type].slice(0,10).forEach(i=>console.log('  '+i));
  if(grouped[type].length > 10) console.log('  ... and '+ (grouped[type].length-10)+' more');
});

console.log('\n=== TOTAL ISSUES: '+issues.length+' ===');
