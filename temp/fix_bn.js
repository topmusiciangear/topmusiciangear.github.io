const fs = require('fs');
for (const f of ['index.html', 'es/index.html']) {
  let s = fs.readFileSync(f, 'utf8');
  // The problematic sequence is backslash followed by 'n' before .top-search-toggle
  const target = '.top-search-toggle{';
  const i = s.indexOf(target);
  // Check the 3 chars before
  const prefix = s.slice(i - 3, i);
  console.log(f, 'prefix before top-search-toggle:', JSON.stringify(prefix));
  // Remove a trailing backslash-n (2 chars) if present
  if (prefix.endsWith('\\n')) {
    s = s.slice(0, i - 2) + s.slice(i);
    fs.writeFileSync(f, s);
    console.log(f, 'fixed');
  } else {
    console.log(f, 'no backslash-n found, prefix:', JSON.stringify(prefix));
  }
}