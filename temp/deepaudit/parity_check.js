const fs = require('fs');
const data = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/temp/deepaudit/chunk3.json','utf8'));

const results = {};

data.forEach((guide) => {
  const issues = [];
  
  // 1. Translation parity - check EN vs ES sections count
  if (guide.sections) {
    const enCount = guide.sections.filter(s => s.content || s.heading).length;
    const esCount = guide.sections.filter(s => s.content_es || s.heading_es).length;
    if (enCount !== esCount) {
      issues.push({type:'translation_parity', note:'EN sections: '+enCount+', ES sections: '+esCount, severity:'high'});
    }
    // Check each section has both EN and ES
    guide.sections.forEach((s,i) => {
      if ((s.content && !s.content_es) || (!s.content && s.content_es)) {
        issues.push({type:'translation_parity', note:'Section '+i+' missing '+(s.content?'ES':'EN')+' content', severity:'high'});
      }
      if ((s.heading && !s.heading_es) || (!s.heading && s.heading_es)) {
        issues.push({type:'translation_parity', note:'Section '+i+' heading missing '+(s.heading?'ES':'EN'), severity:'medium'});
      }
    });
  }
  
  // 2. Verdict/pros-cons parity
  if (guide.verdictProsCons) {
    guide.verdictProsCons.forEach((v,i) => {
      if ((v.pros && !v.pros_es) || (!v.pros && v.pros_es)) {
        issues.push({type:'translation_parity', note:'VPC '+i+' ('+v.name+') missing '+(v.pros?'ES':'EN')+' pros', severity:'high'});
      }
      if ((v.cons && !v.cons_es) || (!v.cons && v.cons_es)) {
        issues.push({type:'translation_parity', note:'VPC '+i+' ('+v.name+') missing '+(v.cons?'ES':'EN')+' cons', severity:'high'});
      }
    });
  }
  
  // 3. Featured snippet parity
  if (guide.featuredSnippet) {
    for (let i=1; i<=5; i++) {
      const qEn = guide.featuredSnippet['faq_q'+i+'_en'];
      const qEs = guide.featuredSnippet['faq_q'+i+'_es'];
      const aEn = guide.featuredSnippet['faq_a'+i+'_en'];
      const aEs = guide.featuredSnippet['faq_a'+i+'_es'];
      if ((qEn && !qEs) || (!qEn && qEs)) {
        issues.push({type:'translation_parity', note:'FAQ Q'+i+' missing '+(qEn?'ES':'EN'), severity:'medium'});
      }
      if ((aEn && !aEs) || (!aEn && aEs)) {
        issues.push({type:'translation_parity', note:'FAQ A'+i+' missing '+(aEn?'ES':'EN'), severity:'medium'});
      }
    }
  }
  
  // 4. Link check - look for broken href patterns
  const allHtml = [guide.conclusion||'', guide.conclusion_es||'', ...(guide.sections||[]).map(s=>s.content||''+' '+s.content_es||'')];
  const linkRx = /href="([^"]+)"/g;
  allHtml.forEach(html => {
    let m;
    while ((m = linkRx.exec(html)) !== null) {
      const href = m[1];
      // Check for missing _es.html in Spanish pages
      // Check for empty href
      if (href === '' || href === '#') return;
      // Check for double-wrapped links
      if (href.includes('awin1.com') && href.includes('awin1.com')) {
        issues.push({type:'link_error', note:'Possible double-wrapped Awin link: '+href.substring(0,60), severity:'high'});
      }
    }
  });
  
  // 5. EN/ES conclusion + verdict presence
  if ((guide.conclusion && !guide.conclusion_es) || (!guide.conclusion && guide.conclusion_es)) {
    issues.push({type:'translation_parity', note:'Conclusion missing '+(guide.conclusion?'ES':'EN'), severity:'high'});
  }
  if ((guide.verdict && !guide.verdict_es) || (!guide.verdict && guide.verdict_es)) {
    issues.push({type:'translation_parity', note:'Verdict missing '+(guide.verdict?'ES':'EN'), severity:'high'});
  }
  
  // 6. Product table row parity
  if (guide.productTable && guide.productTable.rows) {
    guide.productTable.rows.forEach((row, ri) => {
      if ((row.label && !row.label_es) || (!row.label && row.label_es)) {
        issues.push({type:'translation_parity', note:'Table row '+ri+' label missing '+(row.label?'ES':'EN'), severity:'low'});
      }
      row.values.forEach((v, vi) => {
        if ((v.value && !v.value_es) || (!v.value && v.value_es)) {
          issues.push({type:'translation_parity', note:'Table row '+ri+' col '+vi+' missing '+(v.value?'ES':'EN'), severity:'low'});
        }
      });
    });
  }
  
  // 7. titleTag parity
  if ((guide.titleTag && !guide.titleTag_es) || (!guide.titleTag && guide.titleTag_es)) {
    issues.push({type:'translation_parity', note:'titleTag missing '+(guide.titleTag?'ES':'EN'), severity:'medium'});
  }
  
  // 8. description parity
  if ((guide.description && !guide.description_es) || (!guide.description && guide.description_es)) {
    issues.push({type:'translation_parity', note:'Description missing '+(guide.description?'ES':'EN'), severity:'medium'});
  }
  
  // 9. Check for trailing/leading spaces in pros/cons ES that indicate bad concatenation
  if (guide.verdictProsCons) {
    guide.verdictProsCons.forEach((v,i) => {
      const checkArr = (arr, field) => {
        if (!arr) return;
        arr.forEach((item, j) => {
          if (item.startsWith(' ') || item.endsWith(' ')) {
            issues.push({type:'format', note:v.name+' '+field+'['+j+'] has leading/trailing space', severity:'low'});
          }
        });
      };
      checkArr(v.pros_es, 'pros_es');
      checkArr(v.cons_es, 'cons_es');
    });
  }
  
  if (issues.length > 0) {
    results[guide.id] = issues;
  }
});

// Summary
let totalIssues = 0;
const typeCounts = {};
Object.entries(results).forEach(([id, issues]) => {
  totalIssues += issues.length;
  issues.forEach(i => {
    typeCounts[i.type] = (typeCounts[i.type]||0)+1;
  });
});

console.log('Guides with issues:', Object.keys(results).length, '/', data.length);
console.log('Total issues:', totalIssues);
console.log('Type counts:', JSON.stringify(typeCounts, null, 2));
console.log('---');
Object.entries(results).forEach(([id, issues]) => {
  console.log('\n' + id + ':');
  issues.forEach(i => console.log('  ['+i.severity+'] '+i.type+': '+i.note));
});

fs.writeFileSync('C:/Users/Daniel/projects/topmusiciangear/temp/deepaudit/parity_results.json', JSON.stringify(results, null, 2));
console.log('\n---parity_results.json written---');
