var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json','utf8'));
var p = JSON.parse(fs.readFileSync('data/products.json','utf8'));

var pidMap = {};
p.forEach(x => pidMap[x.id] = x);

var issues = [];

// ============= 1. PROS/CONS CORRECTNESS =============
g.forEach(guide => {
  var allIds = [...new Set(guide.sections.flatMap(s => s.products || []))];
  if (!guide.verdictProsCons) return;

  guide.verdictProsCons.forEach((pc, i) => {
    var pid = allIds[i];
    var prod = pidMap[pid];

    if (!pc.pros || pc.pros.length === 0) {
      issues.push({ id: guide.id, type: 'PROS_EMPTY', detail: 'Product ' + pid + ' has no pros' });
    }
    if (!pc.cons || pc.cons.length === 0) {
      issues.push({ id: guide.id, type: 'CONS_EMPTY', detail: 'Product ' + pid + ' has no cons' });
    }

    // Check if pros/cons mention wrong product names
    if (pc.pros) {
      pc.pros.forEach(pro => {
        if (pro.length < 10) {
          issues.push({ id: guide.id, type: 'PRO_TOO_SHORT', detail: 'Product ' + pid + ': "' + pro + '"' });
        }
        if (pro.match(/^(good|great|excellent|best|amazing)/i)) {
          issues.push({ id: guide.id, type: 'PRO_VAGUE', detail: 'Product ' + pid + ': "' + pro.substring(0, 60) + '"' });
        }
      });
    }
    if (pc.cons) {
      pc.cons.forEach(con => {
        if (con.length < 10) {
          issues.push({ id: guide.id, type: 'CON_TOO_SHORT', detail: 'Product ' + pid + ': "' + con + '"' });
        }
        if (con.match(/^(none|no|n\/a)/i)) {
          issues.push({ id: guide.id, type: 'CON_VAGUE', detail: 'Product ' + pid + ': "' + con + '"' });
        }
      });
    }
  });
});

// ============= 2. FAQ RELEVANCE =============
var aiFaqPatterns = [
  ['what is the best', 'AI cliche question'],
  ['which one should', 'generic'],
  ['how do I choose', 'generic'],
  ['what should I look for', 'generic'],
  ['is it worth', 'check context'],
  ['can I use', 'check context'],
  ['do I need', 'check context'],
  ['what is the difference', 'check relevance'],
];

g.forEach(guide => {
  if (!guide.faq) return;
  guide.faq.forEach((faq, i) => {
    if (!faq.question || faq.question.length < 10) {
      issues.push({ id: guide.id, type: 'FAQ_SHORT_Q', detail: 'FAQ ' + i + ' question too short' });
    }
    if (!faq.answer || faq.answer.length < 20) {
      issues.push({ id: guide.id, type: 'FAQ_SHORT_A', detail: 'FAQ ' + i + ' answer too short' });
    }
    // Check if FAQ mentions products not in guide
    if (faq.answer) {
      var guideProducts = guide.sections.flatMap(s => s.products || []);
      var mentionedProducts = faq.answer.match(/\b(SM57|SM58|SM7B|NT1|AT2020|AT2035|RE20|MD421|C414|U87|MDR-7506|M50x|DT770|DT990|K371|HS8|Rokit|Scarlett|SSL|Volt|Apollo|Babyface|NT1-A|PodMic|MV7|Wave:3|AT2040|Profile)\b/g);
      if (mentionedProducts) {
        mentionedProducts.forEach(prod => {
          // Check if this product is actually in the guide
          // This is a simplified check
        });
      }
    }
    // Check for AI tone in FAQ
    aiFaqPatterns.forEach(([pat, desc]) => {
      if (faq.question && faq.question.toLowerCase().includes(pat)) {
        // Only flag if it's truly generic
        if (faq.question.length < 30) {
          issues.push({ id: guide.id, type: 'FAQ_GENERIC', detail: 'FAQ: "' + faq.question.substring(0, 50) + '"' });
        }
      }
    });
  });
});

// ============= 3. CONCLUSION QUALITY =============
g.forEach(guide => {
  if (!guide.conclusion || guide.conclusion.length < 50) {
    issues.push({ id: guide.id, type: 'CONCLUSION_SHORT', detail: 'EN conclusion ' + (guide.conclusion ? guide.conclusion.length : 0) + ' chars' });
  }
  if (!guide.conclusion_es || guide.conclusion_es.length < 50) {
    issues.push({ id: guide.id, type: 'CONCLUSION_ES_SHORT', detail: 'ES conclusion ' + (guide.conclusion_es ? guide.conclusion_es.length : 0) + ' chars' });
  }
  // Check conclusion mentions specific products
  if (guide.conclusion) {
    var conclusionLower = guide.conclusion.toLowerCase();
    if (conclusionLower.includes('best') && !conclusionLower.includes('for')) {
      issues.push({ id: guide.id, type: 'CONCLUSION_VAGUE', detail: 'Conclusion may be too vague' });
    }
  }
});

// ============= 4. TEXT QUALITY =============
var exaggeratedPatterns = [
  ['best.*ever', 'exaggerated'],
  ['perfect for everyone', 'exaggerated'],
  ['nothing beats', 'exaggerated'],
  ['unbeatable', 'exaggerated'],
  ['incredible deal', 'exaggerated'],
  ['game.changer', 'AI cliche'],
  ['mind.blowing', 'AI cliche'],
  ['blown away', 'AI cliche'],
  ['blows away', 'AI cliche'],
  ['revolutionary', 'AI cliche'],
  ['transform your', 'AI cliche'],
  ['elevate your', 'AI cliche'],
  ['unleash', 'AI cliche'],
  ['supercharge', 'AI cliche'],
  ['world.class', 'exaggerated'],
  ['state.of.the.art', 'exaggerated'],
  ['best.in.class', 'exaggerated'],
  ['iconic.*sound', 'check if justified'],
  ['legendary', 'check if justified'],
  ['unmatched', 'exaggerated'],
  ['unrivaled', 'exaggerated'],
  ['unparalleled', 'exaggerated'],
  ['phenomenal', 'exaggerated'],
  ['exceptional', 'check frequency'],
  ['stunning', 'check frequency'],
  ['breathtaking', 'exaggerated'],
  ['utterly', 'exaggerated'],
  ['simply the best', 'exaggerated'],
  ['you need to buy', 'pushy'],
  ['you should buy', 'pushy'],
  ['you must buy', 'pushy'],
  ['don.t miss out', 'FOMO'],
  ['limited time', 'FOMO'],
  ['before it.s gone', 'FOMO'],
];

var exaggeratedPatternsES = [
  ['el mejor.*de la historia', 'exagerado'],
  ['revolucionar', 'AI cliche'],
  ['liberar todo el potencial', 'AI cliche'],
  ['elevar tu', 'AI cliche'],
  ['llevar.*al siguiente nivel', 'AI cliche'],
  ['el definitivo', 'exagerado'],
  ['incomparable', 'exagerado'],
  ['excepcional', 'revisar frecuencia'],
  ['fenomenal', 'exagerado'],
  ['impresionante', 'revisar frecuencia'],
  ['no puedes equivocarte', 'exagerado'],
  ['sin duda', 'revisar frecuencia'],
  ['definitivamente', 'revisar frecuencia'],
  ['debes comprar', 'agresivo'],
  ['no te lo pierdas', 'FOMO'],
  ['oferta increíble', 'salesy'],
  ['mejor precio', 'salesy'],
  ['no dejes pasar', 'FOMO'],
  ['antes de que se agote', 'FOMO'],
  ['imbatible', 'exagerado'],
  ['indiscutible', 'exagerado'],
  ['te sorprenderá', 'AI cliche'],
  ['te encantará', 'AI cliche'],
  ['te fascinará', 'AI cliche'],
  ['disfrutarás de', 'AI cliche'],
  ['no busques más', 'AI cliche'],
  ['encaja perfectamente', 'AI cliche'],
  ['se siente como en casa', 'AI cliche'],
];

g.forEach(guide => {
  // Check EN content
  guide.sections.forEach((s, i) => {
    if (!s.content) return;

    exaggeratedPatterns.forEach(([pat, desc]) => {
      var re = new RegExp(pat, 'gi');
      var m = s.content.match(re);
      if (m) {
        issues.push({ id: guide.id, type: 'EN_' + desc.toUpperCase(), detail: 'sec' + i + ': "' + m[0] + '"' });
      }
    });
  });

  // Check ES content
  guide.sections.forEach((s, i) => {
    if (!s.content_es) return;

    exaggeratedPatternsES.forEach(([pat, desc]) => {
      var re = new RegExp(pat, 'gi');
      var m = s.content_es.match(re);
      if (m) {
        issues.push({ id: guide.id, type: 'ES_' + desc.toUpperCase(), detail: 'sec' + i + ': "' + m[0] + '"' });
      }
    });
  });

  // Check intro/conclusion
  ['intro', 'conclusion', 'intro_es', 'conclusion_es'].forEach(f => {
    if (!guide[f]) return;
    exaggeratedPatterns.forEach(([pat, desc]) => {
      var re = new RegExp(pat, 'gi');
      var m = guide[f].match(re);
      if (m) {
        issues.push({ id: guide.id, type: 'EN_' + desc.toUpperCase(), detail: f + ': "' + m[0] + '"' });
      }
    });
    exaggeratedPatternsES.forEach(([pat, desc]) => {
      var re = new RegExp(pat, 'gi');
      var m = guide[f].match(re);
      if (m) {
        issues.push({ id: guide.id, type: 'ES_' + desc.toUpperCase(), detail: f + ': "' + m[0] + '"' });
      }
    });
  });
});

// ============= 5. PRODUCT MISMATCHES IN PROS/CONS =============
g.forEach(guide => {
  var allIds = [...new Set(guide.sections.flatMap(s => s.products || []))];
  if (!guide.verdictProsCons) return;

  guide.verdictProsCons.forEach((pc, i) => {
    var pid = allIds[i];
    var prod = pidMap[pid];
    if (!prod) return;

    // Check if pros mention wrong product name
    if (pc.pros) {
      pc.pros.forEach(pro => {
        // Check if pro mentions a different product name
        var otherProducts = p.filter(x => x.id !== pid && x.title);
        otherProducts.forEach(other => {
          if (pro.includes(other.title) && !pro.includes(prod.title)) {
            issues.push({ id: guide.id, type: 'WRONG_PRODUCT', detail: 'Product ' + pid + ' pros mention "' + other.title + '"' });
          }
        });
      });
    }
  });
});

// ============= REPORT =============
var grouped = {};
issues.forEach(i => {
  if (!grouped[i.type]) grouped[i.type] = [];
  grouped[i.type].push(i);
});

Object.keys(grouped).sort().forEach(k => {
  console.log('\n=== ' + k + ' (' + grouped[k].length + ') ===');
  grouped[k].slice(0, 8).forEach(i => {
    console.log('  ' + i.id + ': ' + i.detail);
  });
  if (grouped[k].length > 8) console.log('  ...+' + (grouped[k].length - 8) + ' more');
});

console.log('\n=== TOTAL: ' + issues.length + ' issues ===');
