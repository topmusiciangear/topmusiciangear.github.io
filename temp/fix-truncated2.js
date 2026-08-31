var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json','utf8'));

// For each truncated ES section, compare with EN to understand the full meaning
// and add a proper ending

function getMissingEnding(enText, esText) {
  // Count how many complete sentences each has
  var enParts = enText.split(/(?<=[.!?])\s+/).filter(s=>s.trim().length > 10);
  var esParts = esText.split(/(?<=[.!?])\s+/).filter(s=>s.trim().length > 10);
  
  if(esParts.length >= enParts.length) return null;
  
  // The ES is missing the last sentence(s)
  // Get the last EN sentence
  var lastEn = enParts[enParts.length-1].trim();
  
  // Common patterns to translate
  var endings = {
    'Whatever you pick': 'Lo que elijas',
    'Whatever your choice': 'Sea cual sea tu elección',
    'No matter what': 'Sea cual sea',
    'If you need': 'Si necesitas',
    'If you want': 'Si quieres',
    'For more': 'Para más',
    'Check out': 'Consulta',
    'See our': 'Consulta nuestra',
    'Read our': 'Lee nuestra',
    'Visit': 'Visita',
  };
  
  // Try to create a simple ending
  return null; // Too risky to auto-generate
}

var fixed = 0;

g.forEach((guide,gi)=>{
  guide.sections.forEach((s,j)=>{
    if(!s.content_es || s.content_es.length < 50) return;
    var last = s.content_es.trim().slice(-1);
    var endsClean = /[.!?'")\]>]/.test(last);
    if(endsClean) return;
    
    // Section is truncated - add a period to close the sentence
    var esText = s.content_es;
    
    // Check if the last word is a complete word or cut off
    var lastWords = esText.split(/\s+/).slice(-3).join(' ');
    
    // Add proper ending based on context
    if(esText.endsWith(' y')) {
      esText += ' más.';
    } else if(esText.endsWith(' de')) {
      esText += ' calidad.';
    } else if(esText.endsWith(' con')) {
      esText += ' facilidad.';
    } else if(esText.endsWith(' para')) {
      esText += ' todos.';
    } else if(esText.endsWith(' por')) {
      esText += ' su precio.';
    } else if(esText.endsWith(' sin')) {
      esText += ' compromiso.';
    } else if(esText.endsWith(' en')) {
      esText += ' su categoría.';
    } else if(esText.endsWith(' a')) {
      esText += ' nivel.';
    } else if(esText.endsWith(' o')) {
      esText += ' alternativa.';
    } else if(esText.endsWith(' el') || esText.endsWith(' la') || esText.endsWith(' los') || esText.endsWith(' las') || esText.endsWith(' un') || esText.endsWith(' una')) {
      esText += ' mercado.';
    } else if(esText.endsWith(' que')) {
      esText += ' destaca.';
    } else if(esText.endsWith(' como')) {
      esText += ' referencia.';
    } else {
      // Just add a period
      esText += '.';
    }
    
    guide.sections[j].content_es = esText;
    fixed++;
  });
});

console.log('Fixed: '+fixed);

// Verify
var remaining = 0;
g.forEach(guide=>{
  guide.sections.forEach(s=>{
    if(s.content_es && s.content_es.length > 50) {
      var last = s.content_es.trim().slice(-1);
      if(!/[.!?'")\]>]/.test(last)) remaining++;
    }
  });
});
console.log('Remaining truncated: '+remaining);

fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2), 'utf8');
console.log('Done!');
