const fs = require('fs');
let c = fs.readFileSync('build-guides.js', 'utf8');

// Pattern: gear4music: "..."} , musicstore: "..." }
// The } closes prices, but musicstore should be inside prices
let count = 0;

// Match: ...gear4music: "value"} , musicstore: "value" },
// Replace with: ...gear4music: "value", musicstore: "value" } },
c = c.replace(/gear4music:\s*("[^"]*")\s*\}\s*,\s*musicstore:\s*("[^"]*")\s*\}/g, (m, g4, ms) => {
  count++;
  return 'gear4music: ' + g4 + ', musicstore: ' + ms + ' } }';
});

// Also fix single-quote variants
c = c.replace(/gear4music:\s*('[^']*')\s*\}\s*,\s*musicstore:\s*('[^']*')\s*\}/g, (m, g4, ms) => {
  count++;
  return 'gear4music: ' + g4 + ', musicstore: ' + ms + ' } }';
});

// Fix pattern: andertons: '...'} , musicstore: "..." }
c = c.replace(/andertons:\s*('[^']*')\s*\}\s*,\s*musicstore:\s*("[^"]*")\s*\}/g, (m, an, ms) => {
  count++;
  return 'andertons: ' + an + ', musicstore: ' + ms + ' } }';
});

// Fix pattern: andertons: '...', gear4music: "..."} , musicstore: "..." }
// (gear4music already handled above, but just in case)

console.log('Fixed', count, 'entries');
fs.writeFileSync('build-guides.js', c);
