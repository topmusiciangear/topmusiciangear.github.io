var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json','utf8'));

// Fix budget-bass-like-expensive sec4 - ES truncated
g.forEach(guide=>{
  if(guide.id === 'budget-bass-like-expensive') {
    var s = guide.sections[4];
    if(s && s.content_es) {
      var enW = s.content.replace(/<[^>]+>/g,'').split(/\s+/).length;
      var esW = s.content_es.replace(/<[^>]+>/g,'').split(/\s+/).length;
      console.log('Before: EN='+enW+' ES='+esW);
      
      // Expand ES to match EN
      s.content_es = '<p><strong>Suena como: Music Man StingRay Special.</strong> El Sterling StingRay Ray4 ofrece el sonido icónico de Music Man StingRay a un precio que los mortales pueden pagar. Ese tono grueso, contundente y medio que define el sonido StingRay está presente en el Ray4.</p><p><strong>El pastilla humbucker de Alnico</strong> es el corazón del Ray4. Tiene ese characterize punchy y medio que corta en la mezcla sin necesidad de ecualización. El preamp activo de 9V ofrece graves gruesos y agudos definidos con un solo knob de volumen y un EQ de dos bandas.</p><p><strong>El mástil de arce</strong> con diapasón de palisandro ofrece una acción baja y cómoda. El cuerpo de tilo es ligero para sesiones largas. La合金 bridge y los clavijeros blocks mantienen la afinación estable.</p><p><strong>Para bajistas que quieren el sonido StingRay sin el precio de Music Man,</strong> el Ray4 es la respuesta. Suena como un instrumento que cuesta tres veces más y se construye para durar.</p>';
      
      var esW2 = s.content_es.replace(/<[^>]+>/g,'').split(/\s+/).length;
      console.log('After: EN='+enW+' ES='+esW2);
    }
  }
});

fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2), 'utf8');
console.log('Done');
