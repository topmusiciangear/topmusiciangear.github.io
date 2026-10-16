const guides = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
function contexts(needle, guidescope) {
  const out = new Set();
  guides.filter(g => g.category === 'plugins' && (!guidescope || guidescope.includes(g.id))).forEach(g => {
    const s = JSON.stringify(g);
    let i = -1;
    while ((i = s.indexOf(needle, i + 1)) > -1) {
      out.add(g.id + ': ...' + s.slice(Math.max(0, i - 60), i + needle.length + 40).replace(/\\n/g, ' '));
      if (out.size > 12) return;
    }
  });
  return [...out];
}
console.log('=== Diva ===');
contexts('Diva').forEach(c => console.log(c));
console.log('=== Spire ===');
contexts('Spire').forEach(c => console.log(c));
console.log('=== Noire ===');
contexts('Noire').forEach(c => console.log(c));
console.log('=== UA 1176 ===');
contexts('UA 1176').forEach(c => console.log(c));
console.log('=== UAD Sound City ===');
contexts('UAD Sound City').forEach(c => console.log(c));
console.log('=== TDR ===');
contexts('TDR').forEach(c => console.log(c));
