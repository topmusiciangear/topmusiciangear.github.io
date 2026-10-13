const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const gj = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gj, 'utf8'));
const g = guides.find(x => x.id === 'usb-mics');
const fix = [];

// 1) titleTag_es: Title Case -> sentence case (convención del sitio: "Mejor interfaz de audio para grabación casera")
if (/para Streaming y Podcasts/.test(g.titleTag_es)) {
  g.titleTag_es = g.titleTag_es.replace('para Streaming y Podcasts', 'para streaming y podcasts');
  fix.push('titleTag_es: "para Streaming y Podcasts" -> "para streaming y podcasts" (sentence case)');
}

// 2) conclusión: quitar la cuenta de productos
if (/Every one of these ten is a professional/.test(g.conclusion)) {
  g.conclusion = g.conclusion.replace('Every one of these ten is a professional, stream-ready USB microphone, so start with the one that matches your workflow.',
    'Every one of them is a professional, stream-ready USB microphone, so start with the one that matches your workflow.');
  fix.push('conclusion EN: quitada la cuenta "these ten"');
}
if (/Los diez son micrófonos USB profesionales listos para streaming/.test(g.conclusion_es)) {
  g.conclusion_es = g.conclusion_es.replace('Los diez son micrófonos USB profesionales listos para streaming, así que empieza con el que mejor se adapte a tu forma de trabajar.',
    'Todos son micrófonos USB profesionales listos para streaming, así que empieza con el que mejor se adapte a tu forma de trabajar.');
  fix.push('conclusion ES: quitada la cuenta "Los diez"');
}

// 3) description: la cuenta va bien en meta description (es SEO, no intro), se deja.
//    Verificar que no queden cuentas en intro/verdict
const introVerdict = [g.intro, g.intro_es, g.verdict, g.verdict_es].join(' ');
const counts = ['Five', 'five', 'Cinco', 'cinco', 'nine', 'nueve', 'ten', 'diez'].filter(w => new RegExp('\\b' + w + '\\b').test(introVerdict));
if (counts.length) fix.push('[!!] cuentas en intro/veredicto: ' + counts.join(', '));
else fix.push('intro/veredicto EN+ES: sin cuentas de productos [OK]');

fs.writeFileSync(gj, JSON.stringify(guides, null, 2));
console.log('fixes:');
fix.forEach(f => console.log('  - ' + f));