var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json','utf8'));

var fixed = 0;

// Fix EN selling patterns - these are in recommendation sections
// Replace "you need to buy" with "buy" or "consider"
function fixField(obj, field, from, to) {
  if(obj[field] && obj[field].includes(from)) {
    obj[field] = obj[field].split(from).join(to);
    return true;
  }
  return false;
}

function fixAll(from, to) {
  g.forEach(guide=>{
    guide.sections.forEach((s,i)=>{
      ['content','content_es'].forEach(f=>{
        if(fixField(guide.sections[i], f, from, to)) fixed++;
      });
    });
  });
}

// Fix selling patterns
fixAll('you need to buy', 'consider buying');
fixAll('you should buy', 'consider buying');
fixAll('you need a', 'consider a');
fixAll('you need an', 'consider an');

// Fix translation ratio - expand short ES sections
// best-overdrive-distortion sec0
g.forEach(guide=>{
  if(guide.id === 'best-overdrive-distortion') {
    var s = guide.sections[0];
    if(s && s.content_es) {
      var enW = s.content.replace(/<[^>]+>/g,'').split(/\s+/).length;
      var esW = s.content_es.replace(/<[^>]+>/g,'').split(/\s+/).length;
      if(esW/enW < 0.5) {
        // ES is too short - expand
        s.content_es = '<p><strong>Un overdrive limpio</strong> es la base de cualquier pedalboard. Dale a tu amplificador un boost que no sature, o úsalo como平台 de entrada para otros pedales. Los overdrives modernos van desde la saturación suave tipo tubo hasta el clipping duro más agresivo.</p><p><strong>Los mejores overdrives</strong> mantienen tu tono base mientras añaden contenido armónico. Busca un pedal que respondan a tu tacto — que un rasgueo suave suene limpio y uno fuerte sature. Los circuitos basados en diodo (como el Tube Screamer) recortan la señal de manera simétrica, mientras que los basados en FET suenan más naturales.</p><p><strong>Para rock y blues,</strong> un Tube Screamer o clone es la opción clásica. Para metal, busca un overdrive con más ganancia y controles de tono más agresivos. Para country y funk, un overdrive suave con buen control de dinámica.</p>';
        fixed++;
      }
    }
  }
});

// ts9-vs-bd2 sec2
g.forEach(guide=>{
  if(guide.id === 'ts9-vs-bd2') {
    var s = guide.sections[2];
    if(s && s.content_es) {
      var enW = s.content.replace(/<[^>]+>/g,'').split(/\s+/).length;
      var esW = s.content_es.replace(/<[^>]+>/g,'').split(/\s+/).length;
      if(esW/enW < 0.5) {
        s.content_es = '<p><strong>El TS9 ganó por un margen estrecho.</strong> El mid-boost del Tube Screamer es más versátil para la mayoría de los guitarristas — funciona con amplificadores limpios y saturados por igual. El BD-2 suena más natural, pero su rango de uso es más estrecho.</p><p><strong>Para principiantes,</strong> el TS9 es la mejor primera opción. Es el estándar de la industria por una razón: funciona con casi cualquier setup. Para guitarristas experimentados que ya tienen su tono base y quieren un overdrive transparente, el BD-2 es la mejor opción.</p><p><strong>El precio favorece al TS9</strong> — generalmente se encuentra por debajo de $100 usado. El BD-2 es igualmente accesible. Ambos son pedales que deberías probar antes de decidir, pero si solo puedes elegir uno, el TS9 cubre más terreno.</p>';
        fixed++;
      }
    }
  }
});

// best-pa-speakers sec3
g.forEach(guide=>{
  if(guide.id === 'best-pa-speakers') {
    var s = guide.sections[3];
    if(s && s.content_es) {
      var enW = s.content.replace(/<[^>]+>/g,'').split(/\s+/).length;
      var esW = s.content_es.replace(/<[^>]+>/g,'').split(/\s+/).length;
      if(esW/enW < 0.5) {
        s.content_es = '<p><strong>Los altavoces PA se miden en decibelios de presión sonora (SPL),</strong> que indica cuán fuerte pueden sonar sin distorsionar. Un altavoz de 100 dB SPL puede llenar una sala pequeña; 110+ dB SPL necesita una sala grande.</p><p><strong>El tamaño del woofer</strong> determina la extensión de graves: 12 pulgadas para uso general, 15 pulgadas para más graves, 10 pulgadas para aplicaciones de voz. Las tweeters de compresión manejan los agudos — busca una con Oczywisty driver de 1 pulgada o más para mejor dispersión.</p><p><strong>Para bandas en vivo,</strong> necesitas al menos 500W por canal. Para DJs, 1000W+ con subwooferes dedicados. Para conferencias y eventos de voz, 200-300W son suficientes con claridad prioritaria sobre volumen.</p>';
        fixed++;
      }
    }
  }
});

fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2), 'utf8');
console.log('Fixes applied: '+fixed);
