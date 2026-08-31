var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json','utf8'));
var p = JSON.parse(fs.readFileSync('data/products.json','utf8'));

var pidMap = {};
p.forEach(x => pidMap[x.id] = x);

// ============= 1. CHECK TABLES =============
console.log('=== TABLAS COMPARATIVAS ===\n');

var tablesWithPrices = 0;
var tablesMissing = 0;
var tableIssues = [];

g.forEach(guide => {
  var hasTable = false;
  guide.sections.forEach((s, i) => {
    if (s.table) {
      hasTable = true;
      // Check if table has prices
      var headers = s.table.headers || [];
      var hasPriceHeader = headers.some(h => h.toLowerCase().includes('price') || h.toLowerCase().includes('precio'));
      if (hasPriceHeader) {
        tablesWithPrices++;
        tableIssues.push(guide.id + ' sec' + i + ': TABLE HAS PRICE HEADER');
      }
      // Check row count
      if (s.table.rows && s.table.rows.length < 2) {
        tableIssues.push(guide.id + ' sec' + i + ': TABLE TOO SHORT (' + s.table.rows.length + ' rows)');
      }
    }
  });
  if (!hasTable && guide.sections.length > 0) {
    tablesMissing++;
  }
});

console.log('Tables with prices: ' + tablesWithPrices);
console.log('Guides without tables: ' + tablesMissing);
if (tableIssues.length > 0) {
  console.log('Table issues:');
  tableIssues.slice(0, 10).forEach(x => console.log('  ' + x));
}

// ============= 2. SEARCH FOR AI PHRASES =============
console.log('\n=== FRASES AI RESTANTES ===\n');

var aiPhrases = [
  // "After testing/probando" + quantities
  ['after testing', 'EN', 'after testing'],
  ['after running', 'EN', 'after running'],
  ['after using', 'EN', 'after using'],
  ['after spending', 'EN', 'after spending'],
  ['after hours', 'EN', 'after hours'],
  ['after years', 'EN', 'after years'],
  ['después de probar', 'ES', 'después de probar'],
  ['después de usar', 'ES', 'después de usar'],
  ['después de pasar', 'ES', 'después de pasar'],
  ['tras probar', 'ES', 'tras probar'],
  ['tras usar', 'ES', 'tras usar'],
  ['he probado', 'ES', 'he probado'],
  ['he usado', 'ES', 'he usado'],
  ['he testado', 'ES', 'he testado'],
  ['I have tested', 'EN', 'I have tested'],
  ['I tested', 'EN', 'I tested'],
  ['I used', 'EN', 'I used'],
  ['I have used', 'EN', 'I have used'],
  ['I spent', 'EN', 'I spent'],
  ['I have spent', 'EN', 'I have spent'],
  ['I own', 'EN', 'I own'],
  ['I use', 'EN', 'I use'],
  ['mi setup', 'ES', 'mi setup'],
  ['mi escritorio', 'ES', 'mi escritorio'],
  ['my setup', 'EN', 'my setup'],
  ['my desk', 'EN', 'my desk'],
  ['my studio', 'EN', 'my studio'],
  ['my room', 'EN', 'my room'],
  // Exaggerated quantities
  ['hundreds of', 'EN', 'hundreds of'],
  ['thousands of', 'EN', 'thousands of'],
  ['dozens of', 'EN', 'dozens of'],
  ['countless', 'EN', 'countless'],
  ['incontables', 'ES', 'incontables'],
  ['cientos de', 'ES', 'cientos de'],
  ['miles de', 'ES', 'miles de'],
  ['decenas de', 'ES', 'decenas de'],
  // AI tone
  ['believe me', 'EN', 'believe me'],
  ['trust me', 'EN', 'trust me'],
  ['honestly', 'EN', 'honestly'],
  ['genuinely', 'EN', 'genuinely'],
  ['actually', 'EN', 'actually'],
  ['simply', 'EN', 'simply'],
  ['actually', 'EN', 'actually'],
  ['literally', 'EN', 'literally'],
  ['honestamente', 'ES', 'honestamente'],
  ['de verdad', 'ES', 'de verdad'],
  ['en serio', 'ES', 'en serio'],
  ['realmente', 'ES', 'realmente'],
  ['auténticamente', 'ES', 'auténticamente'],
];

var found = {};
g.forEach(guide => {
  ['intro', 'conclusion', 'intro_es', 'conclusion_es'].forEach(f => {
    if (!guide[f]) return;
    aiPhrases.forEach(([phrase, lang, label]) => {
      if (guide[f].toLowerCase().includes(phrase.toLowerCase())) {
        if (!found[guide.id]) found[guide.id] = [];
        found[guide.id].push(f + ': "' + phrase + '"');
      }
    });
  });
  guide.sections.forEach((s, i) => {
    ['content', 'content_es'].forEach(f => {
      if (!s[f]) return;
      aiPhrases.forEach(([phrase, lang, label]) => {
        if (s[f].toLowerCase().includes(phrase.toLowerCase())) {
          if (!found[guide.id]) found[guide.id] = [];
          found[guide.id].push('sec' + i + ' ' + f + ': "' + phrase + '"');
        }
      });
    });
  });
});

var totalFound = 0;
Object.keys(found).forEach(gid => {
  console.log(gid + ':');
  found[gid].forEach(x => console.log('  ' + x));
  totalFound += found[gid].length;
});
console.log('\nTotal AI phrases found: ' + totalFound);

// ============= 3. CHECK GENERIC PROS =============
console.log('\n=== PROS GENÉRICOS RESTANTES ===\n');
var genericCount = 0;
g.forEach(guide => {
  if (!guide.verdictProsCons) return;
  var allIds = [...new Set(guide.sections.flatMap(s => s.products || []))];
  guide.verdictProsCons.forEach((pc, i) => {
    if (pc.pros && pc.pros.some(p => p.match(/^(Great|Excellent|Good|Best|Highly rated)/i))) {
      genericCount++;
      if (genericCount <= 10) {
        console.log(guide.id + ' product ' + allIds[i] + ': "' + pc.pros[0] + '"');
      }
    }
  });
});
console.log('Total generic pros: ' + genericCount);
