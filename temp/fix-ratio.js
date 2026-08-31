var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json','utf8'));

var fixed = 0;

// Fix re20-vs-sm7b - ES is 2x longer than EN (ES adds unnecessary context)
g.forEach(guide=>{
  if(guide.id === 're20-vs-sm7b') {
    guide.sections.forEach((s,i)=>{
      if(s.content && s.content_es) {
        var enW = s.content.replace(/<[^>]+>/g,'').split(/\s+/).length;
        var esW = s.content_es.replace(/<[^>]+>/g,'').split(/\s+/).length;
        if(esW/enW > 1.8) {
          // ES is too verbose - trim by removing extra context
          // The issue is ES adds historical context that EN doesn't have
          // Fix by making ES match EN style
          if(i === 0) {
            s.content_es = '<p><strong>La tecnología Variable-D del RE20 elimina el efecto de proximidad.</strong> La respuesta de frecuencia es plana y natural, lo que lo hace versátil para voces, instrumentos y broadcasters. Su patrón cardioide supercardioide rechaza el sonido lateral, ideal para studs con mucho tráfico sonoro.</p><p><strong>El RE20 no necesita procesamiento.</strong> Su salida es limpia y equilibrada directa de la salida. No hay picos que domenar ni graves que recortar — lo que grabas es lo que obtienes.</p>';
          } else if(i === 1) {
            s.content_es = '<p><strong>El SM7B abraza el efecto de proximidad</strong> para un sonido íntimo y cálido que definió el podcasting moderno. Su respuesta de frecuencia plana con suave presencia en los medios superiores hace que la voz suene completa sin ecualización. El escudo antipop integrado y el patrón cardioide mantienen el sonido limpio.</p><p><strong>El SM7B necesita ganancia.</strong> Es un micrófono de baja sensibilidad — necesitas una preamp con al menos 60 dB de ganancia limpia, o un Cloudlifter/ FetHead para obtener niveles de línea.</p>';
          } else if(i === 3) {
            s.content_es = '<p><strong>Para broadcast y voz profesional, el RE20 es superior</strong> con su tecnología Variable-D. Para podcasting y streaming donde quieres esa presencia cálida y cercana, el SM7B es la elección estándar. Para grabar instrumentos además de voz, el RE20 ofrece más versatilidad.</p>';
          }
          fixed++;
        }
      }
    });
  }
});

// Fix blx288-vs-ewd - ES is too short (truncated)
g.forEach(guide=>{
  if(guide.id === 'blx288-vs-ewd') {
    guide.sections.forEach((s,i)=>{
      if(s.content && s.content_es) {
        var enW = s.content.replace(/<[^>]+>/g,'').split(/\s+/).length;
        var esW = s.content_es.replace(/<[^>]+>/g,'').split(/\s+/).length;
        if(esW/enW < 0.5) {
          // ES is too short - expand it
          if(i === 0) {
            s.content_es = '<p><strong>El Shure BLX288/PG58 es un sistema inalámbrico analógico de doble canal</strong> que incluye dos transmisores PG58 handheld y un receptor doble rackable. El rango de frecuencias UHF opera en bandas disponibles localmente con alcance hasta 300 pies (100 metros) en línea de vista.</p><p><strong>Los PG58 son los transmisores incluidos.</strong> Tienen patrón cardioide y respuesta de frecuencia optimizada para voz en vivo. No son los SM58, pero para presentaciones en bares, eventos pequeños y bandas de cover, suenan bien y se manejan sin problemas.</p><p><strong>La vida útil de la batería es de 14 horas</strong> con dos pilas AA. El receptor tiene indicadores de RF y audio, y la función de escaneo automático de frecuencias encuentra el canal más limpio en segundos.</p>';
          }
          fixed++;
        }
      }
    });
  }
});

// Fix c414-vs-u87 - ES is too verbose
g.forEach(guide=>{
  if(guide.id === 'c414-vs-u87') {
    guide.sections.forEach((s,i)=>{
      if(s.content && s.content_es) {
        var enW = s.content.replace(/<[^>]+>/g,'').split(/\s+/).length;
        var esW = s.content_es.replace(/<[^>]+>/g,'').split(/\s+/).length;
        if(esW/enW > 1.8) {
          if(i === 1) {
            s.content_es = '<p><strong>El C414 XLII ofrece nueve patrones polares,</strong> tres filtros paso alto y tres pads de atenuación. La variante XLII tiene una presencia suave en 3-5 kHz que realza voces e instrumentos sin sonar dura. Es el micrófono más versátil que AKG ha hecho — hay un C414 para casi cualquier aplicación de estudio.</p>';
          }
          fixed++;
        }
      }
    });
  }
});

fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2), 'utf8');
console.log('Translation ratio fixes: '+fixed);

// Verify
var remaining = 0;
g.forEach(guide=>{
  guide.sections.forEach((s,i)=>{
    if(s.content && s.content_es) {
      var enW = s.content.replace(/<[^>]+>/g,'').split(/\s+/).length;
      var esW = s.content_es.replace(/<[^>]+>/g,'').split(/\s+/).length;
      var ratio = esW/enW;
      if(ratio > 2.0 || ratio < 0.4) remaining++;
    }
  });
});
console.log('Remaining ratio issues: '+remaining);
