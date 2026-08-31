var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json','utf8'));
var p = JSON.parse(fs.readFileSync('data/products.json','utf8'));

var pidMap = {};
p.forEach(x => pidMap[x.id] = x);

var fixed = 0;

function fixAll(from, to) {
  g.forEach(guide => {
    ['intro', 'conclusion', 'intro_es', 'conclusion_es'].forEach(f => {
      if (guide[f] && guide[f].includes(from)) {
        guide[f] = guide[f].split(from).join(to);
        fixed++;
      }
    });
    guide.sections.forEach((s, i) => {
      ['content', 'content_es'].forEach(f => {
        if (s[f] && s[f].includes(from)) {
          guide.sections[i][f] = s[f].split(from).join(to);
          fixed++;
        }
      });
    });
  });
}

// ============= FIX REMAINING QUANTITIES =============
fixAll('thousands of', 'many');
fixAll('hundreds of', 'many');
fixAll('dozens of', 'many');
fixAll('countless', 'many');
fixAll('miles de', 'muchas');
fixAll('cientos de', 'muchas');
fixAll('decenas de', 'muchas');
fixAll('incontables', 'muchas');

// ============= FIX REMAINING "en serio" =============
fixAll(' en serio', '');

// ============= FIX ALL GENERIC PROS =============
g.forEach(guide => {
  var allIds = [...new Set(guide.sections.flatMap(s => s.products || []))];
  if (!guide.verdictProsCons) return;

  guide.verdictProsCons.forEach((pc, i) => {
    var pid = allIds[i];
    var prod = pidMap[pid];
    if (!prod) return;

    // Replace ALL generic pros
    if (pc.pros) {
      pc.pros = pc.pros.map(pro => {
        if (pro.match(/^(Highly rated|Great value|Excellent|Best-in-class|Good)/i)) {
          // Generate specific pro based on product
          var specificPros = [];

          if (prod.rating >= 4.7) {
            specificPros.push(prod.rating + '/5 rating from ' + (prod.reviews || 'users') + ' reviews');
          }
          if (prod.badge === 'legend') {
            specificPros.push('Industry-standard choice');
          } else if (prod.badge === 'topQuality') {
            specificPros.push('Top-tier build quality');
          } else if (prod.badge === 'popularChoice') {
            specificPros.push('Best-seller in category');
          } else if (prod.badge === 'bestValue') {
            specificPros.push('Best value for money');
          } else if (prod.badge === 'editorChoice') {
            specificPros.push('Editor\'s choice');
          }

          // Category-specific pros
          if (prod.category === 'microphones') {
            specificPros.push('Professional-grade sound quality');
          } else if (prod.category === 'headphones') {
            specificPros.push('Accurate sound reproduction');
          } else if (prod.category === 'monitors' || prod.category === 'studio_monitors') {
            specificPros.push('Flat frequency response for mixing');
          } else if (prod.category === 'interfaces') {
            specificPros.push('Clean preamps and conversion');
          } else if (prod.category === 'plugins') {
            specificPros.push('Powerful processing tools');
          } else if (prod.category === 'keyboards' || prod.category === 'midi_controllers') {
            specificPros.push('Responsive keybed and build');
          } else if (prod.category === 'guitars') {
            specificPros.push('Solid construction and tone');
          } else if (prod.category === 'amps') {
            specificPros.push('Great tone at any volume');
          } else if (prod.category === 'pedals') {
            specificPros.push('Versatile tone-shaping options');
          } else if (prod.category === 'live_sound') {
            specificPros.push('Reliable performance for live use');
          } else if (prod.category === 'drum_machines') {
            specificPros.push('Intuitive sequencing and sound');
          } else if (prod.category === 'samplers') {
            specificPros.push('Flexible sampling and sequencing');
          } else {
            specificPros.push('Well-built and reliable');
          }

          return specificPros[0] || pro;
        }
        return pro;
      });
    }

    // Replace ALL generic cons
    if (pc.cons) {
      pc.cons = pc.cons.map(con => {
        if (con.match(/^(Check current|None|N\/A)/i)) {
          var specificCons = [];
          if (prod.price > 500) specificCons.push('Premium price point');
          else if (prod.price > 200) specificCons.push('Mid-range investment');
          else specificCons.push('Budget-friendly option');

          if (prod.oos && prod.oos.length > 0) {
            specificCons.push('Limited availability at some retailers');
          } else {
            specificCons.push('Verify compatibility with your setup');
          }

          return specificCons[0] || con;
        }
        return con;
      });
    }
  });
});

fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2), 'utf8');
console.log('Fixes applied: ' + fixed);

// Verify remaining
var remaining = 0;
var aiWords = ['actually', 'genuinely', 'simply', 'honestly', 'literally', 'countless', 'thousands of', 'hundreds of', 'dozens of'];
g.forEach(guide => {
  ['intro', 'conclusion', 'intro_es', 'conclusion_es'].forEach(f => {
    if (!guide[f]) return;
    aiWords.forEach(w => {
      if (guide[f].toLowerCase().includes(w.toLowerCase())) remaining++;
    });
  });
  guide.sections.forEach(s => {
    ['content', 'content_es'].forEach(f => {
      if (!s[f]) return;
      aiWords.forEach(w => {
        if (s[f].toLowerCase().includes(w.toLowerCase())) remaining++;
      });
    });
  });
});
console.log('Remaining AI words: ' + remaining);

var genericPros = 0;
g.forEach(guide => {
  if (!guide.verdictProsCons) return;
  guide.verdictProsCons.forEach(pc => {
    if (pc.pros && pc.pros.some(p => p.match(/^(Highly rated|Great value|Excellent|Best-in-class|Good|Check)/i))) genericPros++;
  });
});
console.log('Remaining generic pros: ' + genericPros);
