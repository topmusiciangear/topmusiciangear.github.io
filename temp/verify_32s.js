const fs = require('fs');
['guides/best-32-channel-digital-mixers.html', 'guides/best-32-channel-digital-mixers_es.html'].forEach(f => {
  const h = fs.readFileSync(f, 'utf8');
  const noScripts = h.replace(/<script[\s\S]*?<\/script>/g, '');
  const checks = ['StudioLive 32S', 'M32R', 'PRSSTUDIOLIVE32S', '460515'];
  console.log('--- ' + f + ' ---');
  checks.forEach(c => {
    const hit = noScripts.indexOf(c) > -1;
    console.log((c === 'M32R' ? (hit ? 'RESTO!! ' : 'limpio ') : (hit ? 'ok ' : 'FALTA ')) + c);
  });
});