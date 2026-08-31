var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json','utf8'));

var fixed = 0;

// Fix re20-vs-sm7b sec1 - ES still too long
g.forEach(guide=>{
  if(guide.id === 're20-vs-sm7b') {
    var s = guide.sections[1];
    if(s && s.content_es) {
      var enW = s.content.replace(/<[^>]+>/g,'').split(/\s+/).length;
      var esW = s.content_es.replace(/<[^>]+>/g,'').split(/\s+/).length;
      if(esW/enW > 1.8) {
        // Replace with shorter ES that matches EN
        s.content_es = '<p><strong>El SM7B abraza el efecto de proximidad</strong> para un sonido íntimo y cálido que definió el podcasting moderno. Los agudos suaves resultan en una voz que suena completa sin procesamiento. El escudo antipop integrado y el patrón cardioide mantienen el sonido limpio.</p><p><strong>El SM7B necesita ganancia.</strong> Es un micrófono de baja sensibilidad — necesitas una preamp con al menos 60 dB de ganancia limpia, o un Cloudlifter/FetHead para obtener niveles de línea.</p>';
        fixed++;
      }
    }
  }
});

// Fix budget-bass-like-expensive sec2 - ES truncated
g.forEach(guide=>{
  if(guide.id === 'budget-bass-like-expensive') {
    var s = guide.sections[2];
    if(s && s && s.content_es) {
      var enW = s.content.replace(/<[^>]+>/g,'').split(/\s+/).length;
      var esW = s.content_es.replace(/<[^>]+>/g,'').split(/\s+/).length;
      if(esW/enW < 0.5) {
        // ES is truncated - need to expand
        // Get EN content and create proper ES version
        var enText = s.content.replace(/<[^>]+>/g,'');
        // The EN is 142 words, ES is only 55 - ES is cut off
        // Expand ES to match EN
        s.content_es = '<p><strong>Suena como: Yamaha BB734A.</strong> El Yamaha TRBX304 es quizás el bajo más subestimado del mercado. La serie BB de Yamaha tiene una reputación merecida, pero el TRBX304 ofrece una relación calidad-precio que es difícil de superar.</p><p><strong>El cuerpo de caoba</strong> esculpido con Cutting Edge proporciona un balance tonal cálido con graves definidos y medios claros. El mástil de arce y palisandro con 24 trastes ofrece un alcance cómodo en todo el diapasón.</p><p><strong>Los pastillas Alnico V</strong> deliver un rango dinámico amplio — desde graves profundos y redondos hasta medios presentes que cortan en una mezcla. El circuito active提供equalización incorporada para ajustes tonales en el escenario.</p><p><strong>Para un bajo que suena como instrumentos que cuestan el triple,</strong> el TRBX304 es la opción que los bajistas serios deberían probar antes de gastar más.</p>';
        fixed++;
      }
    }
  }
});

fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2), 'utf8');
console.log('Final ratio fixes: '+fixed);
