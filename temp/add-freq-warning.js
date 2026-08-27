var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
var guide = g.find(function(x) { return x.id === 'best-wireless-iems'; });

var warnEN = '<div style="background:rgba(245,158,11,.08);border-left:4px solid #f59e0b;padding:12px 16px;margin:16px 0;border-radius:4px;font-size:14px"><strong>⚠️ Frequency Notice:</strong> Wireless IEM systems operate on specific frequency bands that vary by country. UHF bands (A, B, C, E) are region-locked — buying the wrong band means your system may not work or could be illegal. Always verify your local frequency regulations before purchasing.</div>';

var warnES = '<div style="background:rgba(245,158,11,.08);border-left:4px solid #f59e0b;padding:12px 16px;margin:16px 0;border-radius:4px;font-size:14px"><strong>⚠️ Aviso de frecuencia:</strong> Los sistemas inalámbricos IEM operan en bandas de frecuencia específicas que varían según el país. Las bandas UHF (A, B, C, E) están bloqueadas por región — comprar la banda equivocada significa que tu sistema puede no funcionar o ser ilegal. Siempre verifica las regulaciones de frecuencia locales antes de comprar.</div>';

guide.intro = guide.intro + ' ' + warnEN;
guide.intro_es = guide.intro_es + ' ' + warnES;

fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2), 'utf8');
console.log('Added frequency warning to best-wireless-iems');
