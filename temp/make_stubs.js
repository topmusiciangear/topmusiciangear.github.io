const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';

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

const CANON_EN = 'rodecaster-pro2-vs-bridgecast-x.html';
const CANON_ES = 'rodecaster-pro2-vs-bridgecast-x_es.html';
const TITLE_EN = 'Bridge Cast X vs RØDECaster Pro II: Which Wins?';
const TITLE_ES = 'Bridge Cast X vs RØDECaster Pro II: ¿cuál gana?';

// slugs redirected -> canonical
const EN_SLUGS = ['bridge-cast-x-vs-rodecaster-pro2.html', 'bridge-cast-x-vs-rodecaster.html', 'bridgecast-x-vs-rodecaster-pro2.html'];
const ES_SLUGS = ['bridge-cast-x-vs-rodecaster-pro2_es.html', 'bridge-cast-x-vs-rodecaster_es.html', 'bridgecast-x-vs-rodecaster-pro2_es.html'];

EN_SLUGS.forEach(s => {
  fs.writeFileSync(BASE + 'guides/' + s, TPL('en', TITLE_EN, CANON_EN,
    'This guide has moved to <a style="color:#3b82f6" href="https://topmusiciangear.com/guides/' + CANON_EN + '">' + TITLE_EN + '</a>.'));
});
ES_SLUGS.forEach(s => {
  fs.writeFileSync(BASE + 'guides/' + s, TPL('es', TITLE_ES, CANON_ES,
    'Esta guía se ha trasladado a <a style="color:#3b82f6" href="https://topmusiciangear.com/guides/' + CANON_ES + '">' + TITLE_ES + '</a>.'));
});

console.log('Stubs creados (todos noindex, follow -> canonico):');
EN_SLUGS.concat(ES_SLUGS).forEach(s => console.log('  guides/' + s));
console.log('\nCanonico conservado: guides/' + CANON_EN + ' y guides/' + CANON_ES);