var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json','utf8'));

var issues = [];

// Check for broken HTML tags
g.forEach(guide=>{
  ['intro','conclusion','intro_es','conclusion_es'].forEach(f=>{
    if(!guide[f]) return;
    // Unclosed strong tags
    var strongOpen = (guide[f].match(/<strong>/g)||[]).length;
    var strongClose = (guide[f].match(/<\/strong>/g)||[]).length;
    if(strongOpen !== strongClose) {
      issues.push({id:guide.id, field:f, issue:'Unclosed <strong>: '+strongOpen+' open, '+strongClose+' close'});
    }
    // Unclosed p tags
    var pOpen = (guide[f].match(/<p>/g)||[]).length;
    var pClose = (guide[f].match(/<\/p>/g)||[]).length;
    if(pOpen !== pClose) {
      issues.push({id:guide.id, field:f, issue:'Unclosed <p>: '+pOpen+' open, '+pClose+' close'});
    }
  });
  guide.sections.forEach((s,si)=>{
    ['content','content_es'].forEach(f=>{
      if(!s[f]) return;
      var strongOpen = (s[f].match(/<strong>/g)||[]).length;
      var strongClose = (s[f].match(/<\/strong>/g)||[]).length;
      if(strongOpen !== strongClose) {
        issues.push({id:guide.id, field:f+'sec'+si, issue:'Unclosed <strong>: '+strongOpen+' open, '+strongClose+' close'});
      }
      var pOpen = (s[f].match(/<p>/g)||[]).length;
      var pClose = (s[f].match(/<\/p>/g)||[]).length;
      if(pOpen !== pClose) {
        issues.push({id:guide.id, field:f+'sec'+si, issue:'Unclosed <p>: '+pOpen+' open, '+pClose+' close'});
      }
    });
  });
});

// Check for sections ending without punctuation
g.forEach(guide=>{
  guide.sections.forEach((s,si)=>{
    if(s.content_es) {
      var last = s.content_es.trim().slice(-1);
      if(last && last !== '.' && last !== '!' && last !== '?' && last !== '>' && last !== ')') {
        issues.push({id:guide.id, field:'sec'+si+'_es', issue:'No period ending: ...'+s.content_es.slice(-50)});
      }
    }
    if(s.content) {
      var last = s.content.trim().slice(-1);
      if(last && last !== '.' && last !== '!' && last !== '?' && last !== '>' && last !== ')') {
        issues.push({id:guide.id, field:'sec'+si+'_en', issue:'No period ending: ...'+s.content.slice(-50)});
      }
    }
  });
});

// Check for empty sections
g.forEach(guide=>{
  guide.sections.forEach((s,si)=>{
    if(!s.content || s.content.trim().length < 20) {
      issues.push({id:guide.id, field:'sec'+si+'_en', issue:'Empty or too short content'});
    }
    if(!s.content_es || s.content_es.trim().length < 20) {
      issues.push({id:guide.id, field:'sec'+si+'_es', issue:'Empty or too short content_es'});
    }
  });
});

// Check for duplicate consecutive words
g.forEach(guide=>{
  ['intro','conclusion','intro_es','conclusion_es'].forEach(f=>{
    if(!guide[f]) return;
    var dup = guide[f].match(/\b(\w+)\s+\1\b/gi);
    if(dup) {
      dup.forEach(d => {
        if(!d.match(/^(the the|that that|and and)$/i)) {
          issues.push({id:guide.id, field:f, issue:'Duplicate word: "'+d+'"'});
        }
      });
    }
  });
  guide.sections.forEach((s,si)=>{
    ['content','content_es'].forEach(f=>{
      if(!s[f]) return;
      var dup = s[f].match(/\b(\w+)\s+\1\b/gi);
      if(dup) {
        dup.forEach(d => {
          if(!d.match(/^(the the|that that|and and)$/i)) {
            issues.push({id:guide.id, field:f+'sec'+si, issue:'Duplicate word: "'+d+'"'});
          }
        });
      }
    });
  });
});

console.log('=== ISSUES FOUND: '+issues.length+' ===\n');
issues.forEach(i=>{
  console.log(i.id+' '+i.field+': '+i.issue.substring(0,120));
});
