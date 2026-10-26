const { execSync } = require('child_process');
const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const parent = '5f7dd3bff4cb3db61e7629f11a2bee4e23311929';
const rawParent = execSync('git -C "' + B + '" show ' + parent + ':data/guides.json', { maxBuffer: 1024 * 1024 * 300 }).toString('utf8');
const gParent = JSON.parse(rawParent);
const gNow = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
console.log('=== guias que tenian "Kali Audio WS-6.2" en el commit padre ===');
gParent.forEach(gu => {
  const t = JSON.stringify(gu);
  if (t.includes('Kali Audio WS-6.2') || t.includes('Kali WS-6.2')) {
    const now = gNow.find(x => x.id === gu.id);
    const has300 = now && (now.featuredProducts || []).includes(300);
    const nowHasName = now && JSON.stringify(now).includes('Kali Audio WS-6.2');
    console.log('- ' + gu.id + ' | ahora lista producto 300: ' + (has300 ? 'SI' : 'no') + ' | ahora tiene el nombre: ' + (nowHasName ? 'SI' : 'NO'));
  }
});
