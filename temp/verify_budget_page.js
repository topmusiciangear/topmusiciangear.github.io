const fs = require('fs');
['guides/budget-interfaces.html', 'guides/budget-interfaces_es.html'].forEach(f => {
  const h = fs.readFileSync(f, 'utf8');
  const noScripts = h.replace(/<script[\s\S]*?<\/script>/g, '');
  const checks = ['UMC1820', 'Volt 276', 'MiniFuse 2', '{"id":"budget-interfaces"'];
  console.log('--- ' + f + ' ---');
  checks.forEach(c => console.log((noScripts.indexOf(c) > -1 ? (c.startsWith('{') ? 'DUMP!! ' : 'ok ') : 'MISSING ') + c));
});