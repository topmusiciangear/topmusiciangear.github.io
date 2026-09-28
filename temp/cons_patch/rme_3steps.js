var fs=require('fs');
var A=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
var g=A.find(function(x){return x&&x.id==='rme-vs-motu';});
var log=[];

// 1. INTRO — "cura en salud" paragraph
var introAdd=' We know these interfaces play in totally different price leagues \u2014 one costs around five times more than the other. We compare them because they are the two biggest reference points in their respective worlds. Can a producer really hear a $750 difference in day-to-day work, or is that gap about something else entirely?';
var introEsAdd=' Sabemos que estas interfaces juegan en ligas de precio totalmente distintas \u2014 una cuesta unas cinco veces m\u00e1s que la otra. Las comparamos porque son los dos mayores referentes en sus respectivos mundos. \u00bfNota de verdad un productor una diferencia de 750 \u20ac en su d\u00eda a d\u00eda, o esa diferencia est\u00e1 en otra parte?';
if(g.intro.indexOf('five times more')<0){ g.intro+=introAdd; log.push('intro EN ok'); }
if(g.intro_es.indexOf('cinco veces m\u00e1s')<0){ g.intro_es+=introEsAdd; log.push('intro ES ok'); }

// 2. NEW SECTION Windows vs Mac (before final "Which Wins" section)
var hasSec=g.sections.some(function(s){ return (s.heading||'').indexOf('Windows or Mac')===0; });
if(!hasSec){
  var shape=g.sections[2];
  var ns={};
  Object.keys(shape).forEach(function(k){ ns[k]=shape[k]; });
  ns.heading='Windows or Mac: Which Interface Behaves Better on Your System?';
  ns.heading_es='Windows o Mac: \u00bfqu\u00e9 interfaz se porta mejor en tu sistema?';
  ns.content='<p><strong>On a Mac, the MOTU M2 is close to perfect: it is class-compliant, so you plug it in and record \u2014 no drivers needed.</strong> On Windows the story changes: some modern motherboard chipsets produce crackling and dropouts with the M2, and fixing it means tweaking buffer sizes, USB ports, and power settings. RME programs its own driver code for its FPGA-based hardware, so the Babyface Pro FS delivers its legendary stability on an old Windows machine, on Windows 11, or on a Mac. This is where you start paying the difference.</p>';
  ns.content_es='<p><strong>En Mac, la MOTU M2 es casi perfecta: es class-compliant, la conectas y grabas \u2014 sin drivers.</strong> En Windows la historia cambia: algunos chipsets modernos de placas base producen microcortes y chasquidos con la M2, y solucionarlo exige ajustar b\u00faferes, puertos USB y opciones de energ\u00eda. RME programa su propio c\u00f3digo de drivers para su hardware basado en FPGA, as\u00ed que la Babyface Pro FS ofrece su legendaria estabilidad tanto en un Windows antiguo como en Windows 11 o Mac. Aqu\u00ed es donde se empieza a pagar la diferencia.</p>';
  ns.products=[];
  g.sections.splice(g.sections.length-1,0,ns);
  log.push('section added, nsec='+g.sections.length);
}

// 3. VERDICT closing — long-term investment
var vAdd=' Buying RME is like buying German engineering: in 2026 the brand still releases driver updates for interfaces launched in 2009, such as the Fireface UC. The M2 is a smart buy to get started, but it is a consumer product with a logically shorter support life.';
var vEsAdd=' Comprar RME es como comprar ingenier\u00eda alemana: en 2026 la marca sigue lanzando actualizaciones de drivers para interfaces que salieron en 2009, como la Fireface UC. La M2 es una compra inteligente para arrancar, pero es un producto de consumo con una vida \u00fatil de soporte l\u00f3gicamente m\u00e1s corta.';
if(g.verdict.indexOf('German engineering')<0){ g.verdict+=vAdd; log.push('verdict EN ok'); }
if(g.verdict_es.indexOf('ingenier\u00eda alemana')<0){ g.verdict_es+=vEsAdd; log.push('verdict ES ok'); }

fs.writeFileSync('data/guides.json', JSON.stringify(A,null,2),'utf8');
console.log(log.join(' | '));
