const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';

// ---------- 1) npm run seo ----------
const pj = BASE + 'package.json';
const pkg = JSON.parse(fs.readFileSync(pj, 'utf8'));
if (!pkg.scripts.seo) {
  pkg.scripts.seo = 'node scripts/seo-audit.js';
  fs.writeFileSync(pj, JSON.stringify(pkg, null, 2));
  console.log('package.json: añadido script "seo"');
}

// ---------- 2) regla en AGENTS.md ----------
const ap = BASE + 'AGENTS.md';
let md = fs.readFileSync(ap, 'utf8');
const ANCHOR = '## ⭐ MANDATORY: Superar a la competencia en cada guía (SEO)';
const RULE = `## 📏 REGLA FIJA: títulos y meta descriptions NO se cortan en Google (14/10/2026)

Google recorta por **píxeles**, no por caracteres: el \`<title>\` a los ~580 px y el
snippet a los ~920 px. Un título de 60 caracteres lleno de W y M puede pasar de 580 px,
y uno de 60 con muchos i/l puede no llegar. **Límites del sitio:**

| Campo | Caracteres | Píxeles estimados |
|---|---|---|
| \`<title>\` | **≤ 60** | ≤ 580 |
| meta description | **≤ 155** | ≤ 920 |

**Reglas adicionales:**
- **El año NUNCA va en el \`<title>\`** (\` (2026)\` etc.). El año vive en el JSON-LD
  (\`datePublished\`) y en la firma de autor. Ya se eliminó el sufijo automático de
  \`build-guides.js\` (\`const titleTag = title;\`) — **no reintroducirlo**.
- **Nunca recortar títulos automáticamente.** Cortar a media frase deja basura del tipo
  *"Mejores auriculares cerrados de estudio para grabación y."*. Si un título pasa de 60
  caracteres, **se reescribe a mano** más corto (normalmente quitando el descriptor tras
  los dos puntos: *"X vs Y: Duelo de consolas estándar de la industria"* → *"X vs Y"*).
- Las **descripciones sí se pueden recortar**, siempre en frontera de palabra y respetando
  ambos límites (caracteres y píxeles).

**Auditoría permanente:** \`npm run seo\` (= \`node scripts/seo-audit.js\`, exit 1 si falla).
Analiza las 314 páginas generadas (EN + ES), ignora los stubs de redirección y avisa de
títulos > 60, descripciones > 155, títulos con año, páginas sin \`<h1>\` y sin meta
description. **Ejecutarlo SIEMPRE después de tocar títulos, descripciones o
\`build-guides.js\`**, y antes de cada deploy. \`--json\` para salida legible por máquina.

**El sitemap NO hay que resubmitarlo** para esto: \`sitemap.xml\` se regenera en cada build
con el \`lastmod\` del día y ya está declarado en \`robots.txt\`. Lo que hay que cambiar es el
\`<title>\` del HTML; luego Googlebot re-rastrea solo.

`;
if (md.indexOf('REGLA FIJA: títulos y meta descriptions NO se cortan') === -1) {
  if (md.indexOf(ANCHOR) === -1) { console.log('[!!] no encuentro el ancla en AGENTS.md'); process.exit(1); }
  md = md.replace(ANCHOR, RULE + ANCHOR);
  fs.writeFileSync(ap, md);
  console.log('AGENTS.md: regla insertada antes de "' + ANCHOR.slice(3, 40) + '..."');
} else {
  console.log('AGENTS.md: la regla ya estaba');
}

// ---------- verificacion ----------
console.log('');
const pkg2 = JSON.parse(fs.readFileSync(pj, 'utf8'));
console.log('npm run seo definido: ' + !!pkg2.scripts.seo);
const md2 = fs.readFileSync(ap, 'utf8');
console.log('regla en AGENTS.md: ' + (md2.indexOf('REGLA FIJA: títulos y meta descriptions') > -1));
console.log('git limpio de cambios accidentales en scripts/: ' + !fs.readFileSync(BASE + 'scripts/seo-audit.js', 'utf8').includes('TODO CORRECTO'));