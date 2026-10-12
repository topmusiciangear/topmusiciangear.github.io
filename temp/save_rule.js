var fs = require('fs');
var f = 'AGENTS.md';
var s = fs.readFileSync(f, 'utf8');
var anchor = 'y el cron lo importa solo.';
if (s.indexOf(anchor) < 0) { console.log('ANCHOR NOT FOUND'); process.exit(1); }
s = s.split(anchor).join(anchor + '\n**Formato de oferta Plugin Boutique (usuario 11/10/2026):** `nombre + rating + precio sale + precio lista + "X% off until <fecha>"` (ej. RC-20: 4.8, \u20AC29.25, \u20AC99.83, 70% off until Oct 16). OJO GEO: PB muestra divisas por regi\u00F3n (EUR \u20AC29.25 vs USD $29) — una oferta puede estar viva en EUR y no en USD; verificar cifra EUR.');
fs.writeFileSync(f, s);
console.log('rule saved');
