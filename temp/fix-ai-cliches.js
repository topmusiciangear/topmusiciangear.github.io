var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json','utf8'));

var fixed = 0;

function fixAll(field, from, to) {
  g.forEach(guide=>{
    ['intro','conclusion','intro_es','conclusion_es'].forEach(f=>{
      if(guide[f] && guide[f].includes(from)) {
        guide[f] = guide[f].split(from).join(to);
        fixed++;
      }
    });
    guide.sections.forEach((s,j)=>{
      ['content','content_es'].forEach(f=>{
        if(s[f] && s[f].includes(from)) {
          guide.sections[j][f] = s[f].split(from).join(to);
          fixed++;
        }
      });
    });
  });
}

// === EN AI cliches ===
fixAll('content', 'game-changing', 'notable');
fixAll('content', 'game changer', 'notable alternative');
fixAll('content_es', 'revolucionaria', 'innovadora');
fixAll('content_es', 'revolucionarias', 'innovadoras');
fixAll('content_es', 'revolucionar', 'innovar');

// === EN exaggerated ===
fixAll('content', 'simply the best', 'a strong value');
fixAll('content_es', 'simplemente el mejor', 'una opción sólida');
fixAll('content_es', 'No puedes equivocarte', 'Cualquiera de las dos es buena elección');
fixAll('content_es', 'No todos necesitan', 'No es necesario para todos');

// === EN pushy tone - soften ===
fixAll('content', "If you're mixing, you need", "If you're mixing, consider");
fixAll('content', "If you're building a studio that hosts other musicians, buy these in bulk.", "If you're building a studio that hosts other musicians, these are worth buying in bulk.");
fixAll('content', "your hands deserve real faders", "real faders make a difference");

// === ES exaggerated - reduce intensity ===
fixAll('content_es', 'calidad impresionante', 'calidad destacada');
fixAll('content_es', 'imagen estéreo impresionantes', 'buena imagen estéreo');
fixAll('content_es', 'números impresionantes', 'buenos números');
fixAll('content_es', 'realismo impresionante', 'buen realismo');
fixAll('content_es', 'un rango sonoro impresionante', 'un rango sonoro amplio');
fixAll('content_es', 'un valor increíble', 'una buena relación calidad-precio');

// === EN excessive "legendary" - reduce ===
// Only fix when used loosely, not for actual legendary products
fixAll('content', 'that legendary British', 'that classic British');
fixAll('content_es', 'ese legendario sonido de consola británica', 'ese sonido clásico de consola británica');

// === ES "increíblemente" overuse - vary vocabulary ===
fixAll('content_es', 'increíblemente amplio', 'notablemente amplio');
fixAll('content_es', 'increíblemente reveladores', 'muy reveladores');
fixAll('content_es', 'un punto óptimo increíble', 'un punto óptimo destacado');

// === EN "brutally honest" ===
fixAll('content', 'brutally honest', 'straightforward');
fixAll('content_es', 'brutalmente honestos', 'directos');

// === EN "kills" overuse ===
fixAll('content', 'kills background noise', 'reduces background noise');
fixAll('content', 'kills mechanical noise', 'reduces mechanical noise');

// === ES "destaca" overuse - vary ===
// Count first
var destacaCount = 0;
g.forEach(guide=>{
  guide.sections.forEach(s=>{
    if(s.content_es && s.content_es.includes('destaca')) destacaCount++;
  });
});
console.log('"destaca" used in '+destacaCount+' sections');

// === Check "genuinely" in EN ===
var genuinelyCount = 0;
g.forEach(guide=>{
  guide.sections.forEach(s=>{
    if(s.content && s.content.includes('genuinely')) genuinelyCount++;
  });
});
console.log('"genuinely" used in '+genuinelyCount+' sections');

fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2), 'utf8');
console.log('\nTotal fixes: '+fixed);
