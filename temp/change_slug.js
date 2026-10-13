const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const log = [];

// slug viejo -> slug nuevo
const OLD_ID = 'rodecaster-pro2-vs-bridgecast-x';
const NEW_ID = 'bridge-cast-x-vs-rodecaster-pro2';

// ============================================================
// 1) Cambiar el id en guides.json (esto regenera la URL/canonical)
// ============================================================
const gj = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gj, 'utf8'));
const g = guides.find(x => x.id === OLD_ID);
if (!g) throw new Error('guia no encontrada por el id viejo');

const hits = [];
g.id = NEW_ID;
log.push('id: ' + OLD_ID + ' -> ' + NEW_ID);

// El relatedGuides de esta guia apunta a rodecaster-pro2-vs-dlz-creator,
// que es OTRA guia (existe y no se toca). Verificamos que no colisione.
if ((g.relatedGuides || []).some(r => r === NEW_ID)) hits.push('colision relatedGuides');
log.push('relatedGuides (sin cambios, apuntan a otras guias): ' + JSON.stringify(g.relatedGuides));

fs.writeFileSync(gj, JSON.stringify(guides, null, 2));

// ============================================================
// 2) Stubs de redireccion
// ============================================================
const TPL = (lang, title, target, msg) => `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title} | TopMusicianGear</title>
<link rel="canonical" href="https://topmusiciangear.com/guides/${target}">
<meta name="robots" content="noindex, follow">
<meta http-equiv="refresh" content="0; url=https://topmusiciangear.com/guides/${target}">
<script>window.location.replace("https://topmusiciangear.com/guides/${target}");</script>
</head>
<body style="background:#0d0d0d;color:#fff;font-family:system-ui,sans-serif;text-align:center;padding:80px 20px">
<p>${msg}</p>
</body>
</html>
`;

const TITLE_EN = 'Bridge Cast X vs RØDECaster Pro II: Which Wins?';
const TITLE_ES = 'Bridge Cast X vs RØDECaster Pro II: ¿cuál gana?';
const CANON_EN = NEW_ID + '.html';
const CANON_ES = NEW_ID + '_es.html';

// (a) El slug NUEVO sera la pagina real: build-guides.js la sobreescribe.
//     No hay que hacer nada, pero nos aseguramos de que exista el stub viejo alli.
// (b) Stubs que apuntan al canonical nuevo
const REDIR_EN = [OLD_ID + '.html', 'bridge-cast-x-vs-rodecaster.html', 'bridgecast-x-vs-rodecaster-pro2.html'];
const REDIR_ES = [OLD_ID + '_es.html', 'bridge-cast-x-vs-rodecaster_es.html', 'bridgecast-x-vs-rodecaster-pro2_es.html'];

REDIR_EN.forEach(s => {
  fs.writeFileSync(BASE + 'guides/' + s, TPL('en', TITLE_EN, CANON_EN,
    'This guide has moved to <a style="color:#3b82f6" href="https://topmusiciangear.com/guides/' + CANON_EN + '">' + TITLE_EN + '</a>.'));
});
REDIR_ES.forEach(s => {
  fs.writeFileSync(BASE + 'guides/' + s, TPL('es', TITLE_ES, CANON_ES,
    'Esta guía se ha trasladado a <a style="color:#3b82f6" href="https://topmusiciangear.com/guides/' + CANON_ES + '">' + TITLE_ES + '</a>.'));
});

log.push('Stubs -> canonical NUEVO (' + CANON_EN + ' / ' + CANON_ES + '):');
REDIR_EN.forEach(s => log.push('  EN  guides/' + s));
REDIR_ES.forEach(s => log.push('  ES  guides/' + s));
log.push('Stubs que se BORRAN (eran la URL vieja, ahora es la pagina real):');
['bridge-cast-x-vs-rodecaster-pro2.html', 'bridge-cast-x-vs-rodecaster-pro2_es.html'].forEach(s => {
  const f = BASE + 'guides/' + s;
  if (fs.existsSync(f)) fs.unlinkSync(f);
  log.push('  guides/' + s + ' (lo regenera build-guides.js como pagina real)');
});

if (hits.length) log.push('[!!] ' + hits.join(', '));
console.log('CAMBIOS:');
log.forEach(l => console.log('  - ' + l));