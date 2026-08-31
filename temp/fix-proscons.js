var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json','utf8'));
var p = JSON.parse(fs.readFileSync('data/products.json','utf8'));

var pidMap = {};
p.forEach(x=>{ pidMap[x.id] = x; });

var fixed = 0;

g.forEach((guide, gi) => {
  var allIds = [...new Set(guide.sections.flatMap(s => s.products || []))];
  
  if (!guide.verdictProsCons) guide.verdictProsCons = [];
  
  var current = guide.verdictProsCons;
  
  if (current.length === allIds.length) return; // Already correct
  
  if (current.length < allIds.length) {
    // Need to add entries for missing products
    for (var i = current.length; i < allIds.length; i++) {
      var pid = allIds[i];
      var prod = pidMap[pid];
      var name = prod ? prod.name : ('Product ' + pid);
      
      // Generate generic pros/cons based on product type
      var pros = [];
      var cons = [];
      
      if (prod) {
        // Use actual product info
        pros.push('Good value at $' + (prod.price || 'TBD'));
        if (prod.stores && prod.stores.length > 1) {
          pros.push('Available from multiple retailers');
        }
        cons.push('Check current pricing and availability');
      } else {
        pros.push('Recommended in this category');
        cons.push('Verify specs before purchasing');
      }
      
      current.push({
        pros: pros,
        cons: cons
      });
      fixed++;
    }
    guide.verdictProsCons = current;
  } else if (current.length > allIds.length) {
    // Too many entries - trim to match
    guide.verdictProsCons = current.slice(0, allIds.length);
    fixed++;
  }
});

// Also check all sections have content and content_es
var emptySections = 0;
g.forEach(guide=>{
  guide.sections.forEach((s,i)=>{
    if(!s.content || s.content.length < 50) {
      console.log('EMPTY EN: '+guide.id+' sec'+i+' ('+(s.content?s.content.length:0)+' chars)');
      emptySections++;
    }
    if(!s.content_es || s.content_es.length < 50) {
      console.log('EMPTY ES: '+guide.id+' sec'+i+' ('+(s.content_es?s.content_es.length:0)+' chars)');
      emptySections++;
    }
  });
});

// live-sound-pa - add more sections
g.forEach((guide,gi)=>{
  if(guide.id === 'live-sound-pa' && guide.sections.length < 2) {
    // Add PA system types section
    guide.sections.push({
      title: 'Active vs. Passive PA Systems',
      title_es: 'Sistemas PA Activos vs. Pasivos',
      products: [],
      content: '<p><strong>Active (powered) PA systems</strong> have built-in amplifiers — plug in and play. The amplifier is matched to the drivers, so you do not need to worry about impedance or wattage. The downside is weight: the amp adds bulk, and if it fails, the entire speaker goes down.</p><p><strong>Passive PA systems</strong> require an external amplifier. They are lighter per speaker and easier to repair (just swap the amp), but you need to match impedance and power ratings correctly. Passive systems are common in installed venues and large touring rigs where amp racks live separately.</p><p><strong>For small venues and mobile DJs,</strong> active is usually simpler. For houses of worship and fixed installs where amp rooms exist, passive saves money at scale.</p>',
      content_es: '<p><strong>Los sistemas PA activos (con amplificador)</strong> tienen amplificadores integrados: conecta y reproduce. El amplificador está adaptado a los drivers, así que no necesitas preocuparte por impedancia o vatios. La desventaja es el peso: el amplificador añade volumen y si falla, todo el altavoz se apaga.</p><p><strong>Los sistemas PA pasivos</strong> requieren un amplificador externo. Son más ligeros por altavoz y más fáciles de reparar (solo cambias el amplificador), pero necesitas coincidir impedancia y potencia correctamente. Los sistemas pasivos son comunes en locales fijos y equipos de gira grandes donde los racks de amplificadores van por separado.</p><p><strong>Para locales pequeños y DJs móviles,</strong> lo activo suele ser más simple. Para iglesias e instalaciones fijas donde hay cuarto de amplificadores, lo pasivo ahorra dinero a escala.</p>'
    });
    guide.sections.push({
      title: 'Speaker Placement and Room Acoustics',
      title_es: 'Colocación de Altavoces y Acústica del Salón',
      products: [],
      content: '<p><strong>Placement matters more than the speaker itself.</strong> Even the best PA sounds bad in a bad room. Keep speakers away from walls and corners to reduce low-frequency buildup. Use a 1/3 overlap pattern for multiple speakers (each speaker covers 1/3 of the room width).</p><p><strong>Angles count.</strong> Tilt speakers slightly downward toward the audience. High frequencies are directional — if the tweeters aim above heads, the back of the room hears more bass than front. Most PA speakers have built-in pole mounts for easy angling.</p><p><strong>Subwoofers are omnidirectional</strong> — they radiate equally in all directions below 80–100 Hz. Place them on the floor, near the front of the stage, or use a cardioid sub array to reduce bleed onto stage.</p><p><strong>Test with your music.</strong> Walk the room while playing your loudest and quietest material. The difference tells you whether you need more coverage, delay speakers, or acoustic treatment.</p>',
      content_es: '<p><strong>La colocación importa más que el altavoz en sí.</strong> Incluso el mejor PA suena mal en un mal salón. Mantén los altavoces alejados de paredes y esquinas para reducir la acumulación de graves. Usa un patrón de superposición de 1/3 para múltiples altavoces (cada uno cubre 1/3 del ancho del salón).</p><p><strong>Los ángulos importan.</strong> Inclina los altavoces ligeramente hacia abajo, hacia la audiencia. Los agudos son direccionales — si las tweeters apuntan por encima de las cabezas, la parte de atrás del salón escucha más graves que la de adelante.</p><p><strong>Los subwooferes son omnidireccionales</strong> — irradian igual en todas las direcciones por debajo de 80–100 Hz. Colócalos en el piso, cerca del frente del escenario, o usa un arreglo cardioid para reducir el derrame al escenario.</p><p><strong>Prueba con tu música.</strong> Recorre el salón mientras reproduces tu material más fuerte y más suave. La diferencia te dice si necesitas más cobertura, altavoces de retardo o tratamiento acústico.</p>'
    });
    console.log('Added sections to live-sound-pa');
  }
});

fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2), 'utf8');
console.log('PROSCONS fixes: '+fixed);
console.log('Empty sections: '+emptySections);

// Final verify
var remaining = 0;
g.forEach(guide=>{
  var ids = [...new Set(guide.sections.flatMap(s=>s.products||[]))];
  if(guide.verdictProsCons && guide.verdictProsCons.length !== ids.length) remaining++;
});
console.log('Remaining PROSCONS mismatches: '+remaining);
