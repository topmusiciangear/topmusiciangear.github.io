var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json','utf8'));
var p = JSON.parse(fs.readFileSync('data/products.json','utf8'));

var fixed = 0;

// ============= FIX 1: best-in-ear-monitors has object IDs =============
g.forEach(guide=>{
  if(guide.id === 'best-in-ear-monitors') {
    guide.sections.forEach((s,si)=>{
      if(s.products && Array.isArray(s.products)) {
        var fixedProducts = s.products.map(item=>{
          if(typeof item === 'object' && item.product) {
            console.log('Fixing object ID in best-in-ear-monitors sec'+si+': '+item.product);
            return item.product;
          }
          return item;
        });
        guide.sections[si].products = fixedProducts;
        fixed++;
      }
    });
  }
});

// ============= FIX 2: stage-wireless ID 107 =============
// Check if 107 exists - search by a common product
var has107 = p.some(x=>x.id===107);
if(!has107) {
  // Find what 107 might be - look in old guides data or add Shure PSM300 or similar
  console.log('ID 107 missing from products.json - checking what it is...');
  // It's likely a Shure wireless - let's add a placeholder or find it
  // For now, let's check what the guide expects
  g.forEach(guide=>{
    if(guide.id === 'stage-wireless') {
      guide.sections.forEach(s=>{
        if(s.products && s.products.includes(107)) {
          console.log('stage-wireless references ID 107');
        }
      });
    }
  });
}

// ============= FIX 3: Short intros - expand them =============
var introFixes = {
  'best-headphones': {
    intro: 'Open-back, closed-back, studio, gaming — the headphone market is crowded. This guide cuts through the noise with the best headphones at every price, from budget picks to reference monitors.',
    intro_es: 'Abiertos, cerrados, de estudio, gaming — el mercado de auriculares es amplio. Esta guía destaca los mejores auriculares en cada rango de precio, desde opciones económicas hasta monitores de referencia.'
  },
  'budget-monitors': {
    intro: 'Studio monitors on a budget no longer means sacrificing accuracy. Here are the best affordable monitors that translate your mix.',
    intro_es: 'Monitores de estudio con presupuesto ajustado ya no significa sacrificar precisión. Estos son los mejores monitores asequibles que hacen que tu mezcla suene bien en cualquier sistema.'
  },
  'beat-making': {
    intro: 'The tools you choose shape how you make beats. From DAWs to hardware samplers, here is what actually works for different workflows.',
    intro_es: 'Las herramientas que eliges determinan cómo haces beats. Desde DAWs hasta samplers de hardware, esto es lo que funciona según el tipo de flujo de trabajo.'
  },
  'best-mic-for-guitar-amps': {
    intro: 'The right mic on a guitar cab changes everything. These are the best microphones for recording electric guitar, from studio standards to budget picks.',
    intro_es: 'El micrófono correcto en un cabinet de guitarra lo cambia todo. Estos son los mejores micrófonos para grabar guitarra eléctrica, desde estándares de estudio hasta opciones económicas.'
  },
  'acoustic-guitars-guide': {
    intro: 'Choosing an acoustic guitar comes down to body shape, tonewood, and what sounds right to you. This guide covers what matters and recommends the best acoustics at every budget.',
    intro_es: 'Elegir una guitarra acústica depende de la forma del cuerpo, la madera y lo que suene bien para ti. Esta guía cubre lo que importa y recomienda las mejores acústicas en cada rango de precio.'
  },
  'stage-wireless': {
    intro: 'Wireless systems have gotten reliable enough for professional use. These are the best wireless mic systems for live performance, from budget to broadcast-grade.',
    intro_es: 'Los sistemas inalámbricos se han vuelto suficientemente confiables para uso profesional. Estos son los mejores sistemas de micrófonos inalámbricos para presentaciones en vivo, desde opciones económicas hasta de nivel broadcast.'
  }
};

Object.keys(introFixes).forEach(gid=>{
  g.forEach(guide=>{
    if(guide.id === gid) {
      if(introFixes[gid].intro) guide.intro = introFixes[gid].intro;
      if(introFixes[gid].intro_es) guide.intro_es = introFixes[gid].intro_es;
      console.log('Fixed intro for: '+gid);
      fixed++;
    }
  });
});

// ============= FIX 4: live-sound-pa needs more sections =============
g.forEach(guide=>{
  if(guide.id === 'live-sound-pa' && guide.sections.length < 2) {
    console.log('live-sound-pa has only '+guide.sections.length+' section - needs expansion');
  }
});

fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2), 'utf8');
console.log('\nTotal structural fixes: '+fixed);

// Report remaining issues
var remaining = 0;
g.forEach(guide=>{
  var ids = [...new Set(guide.sections.flatMap(s=>s.products||[]))];
  if(guide.verdictProsCons && guide.verdictProsCons.length !== ids.length) remaining++;
});
console.log('Remaining PROSCONS mismatches: '+remaining);
