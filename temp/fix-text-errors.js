var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json','utf8'));

var fixes = 0;

function fixText(text, isES){
  if(!text || typeof text !== 'string') return text;
  var result = text;

  // Fix repeated words
  result = result.replace(/\ba a\b/gi, 'a');
  result = result.replace(/\bis is\b/gi, 'is');
  result = result.replace(/\bin in\b/gi, 'in');
  result = result.replace(/\bthe the\b/gi, 'the');
  result = result.replace(/\bto to\b/gi, 'to');
  result = result.replace(/\bof of\b/gi, 'of');
  result = result.replace(/\bfor for\b/gi, 'for');
  result = result.replace(/\band and\b/gi, 'and');
  result = result.replace(/\bwith with\b/gi, 'with');
  result = result.replace(/\bthat that\b/gi, 'that');
  result = result.replace(/\bthis this\b/gi, 'this');

  // Fix "de presupuesto" → "económico" (ES only)
  if(isES){
    result = result.replace(/auriculares de presupuesto/gi, 'auriculares económicos');
    result = result.replace(/micrófonos de presupuesto/gi, 'micrófonos económicos');
    result = result.replace(/interfaces de presupuesto/gi, 'interfaces económicas');
    result = result.replace(/monitores de presupuesto/gi, 'monitores económicos');
    result = result.replace(/guitarras de presupuesto/gi, 'guitarras económicas');
    result = result.replace(/bajos de presupuesto/gi, 'bajos económicos');
    result = result.replace(/amplificadores de presupuesto/gi, 'amplificadores económicos');
    result = result.replace(/pedales de presupuesto/gi, 'pedales económicos');
    result = result.replace(/teclados de presupuesto/gi, 'teclados económicos');
    result = result.replace(/mezcladoras de presupuesto/gi, 'mezcladoras económicas');
    result = result.replace(/altavoces de presupuesto/gi, 'altavoces económicos');
    result = result.replace(/bases de presupuesto/gi, 'bases económicas');
    result = result.replace(/mercado de presupuesto/gi, 'mercado de gama baja');
    result = result.replace(/de presupuesto/gi, 'económico');
    result = result.replace(/saldos B/gi, 'B-stock');
    result = result.replace(/por probados/gi, 'probados');
  }

  // Fix lowercase after period (EN only, skip HTML tags)
  if(!isES){
    // Only fix simple cases like ". the" → ". The" (not inside HTML tags)
    result = result.replace(/\. ([a-z])/g, function(match, letter){
      return '. ' + letter.toUpperCase();
    });
  }

  // Fix trailing/leading whitespace
  result = result.trim();

  // Fix multiple spaces
  result = result.replace(/  +/g, ' ');

  return result;
}

function processObj(obj, guideId, path, isES){
  if(!obj) return;
  if(typeof obj === 'string'){
    var orig = obj;
    obj = fixText(obj, isES);
    if(obj !== orig) fixes++;
    return obj;
  }
  if(Array.isArray(obj)){
    return obj.map(function(item){ return processObj(item, guideId, path, isES); });
  }
  if(typeof obj === 'object'){
    var result = {};
    Object.keys(obj).forEach(function(k){
      var isESField = k.indexOf('_es') > -1 || k.indexOf('ES') > -1;
      result[k] = processObj(obj[k], guideId, path+'.'+k, isESField || isES);
    });
    return result;
  }
  return obj;
}

g = g.map(function(guide){
  var before = JSON.stringify(guide);

  // Process top-level fields
  guide.title = fixText(guide.title, false);
  guide.title_es = fixText(guide.title_es, true);
  guide.description = fixText(guide.description, false);
  guide.description_es = fixText(guide.description_es, true);
  guide.verdict = fixText(guide.verdict, false);
  guide.verdict_es = fixText(guide.verdict_es, true);
  guide.intro = fixText(guide.intro, false);
  guide.intro_es = fixText(guide.intro_es, true);
  guide.conclusion = fixText(guide.conclusion, false);
  guide.conclusion_es = fixText(guide.conclusion_es, true);

  // Process featuredSnippet
  if(guide.featuredSnippet){
    Object.keys(guide.featuredSnippet).forEach(function(k){
      var isES = k.indexOf('_es') > -1;
      var orig = guide.featuredSnippet[k];
      guide.featuredSnippet[k] = fixText(orig, isES);
      if(guide.featuredSnippet[k] !== orig) fixes++;
    });
  }

  // Process sections
  guide.sections = (guide.sections||[]).map(function(s){
    s.heading = fixText(s.heading, false);
    s.heading_es = fixText(s.heading_es, true);
    s.content = fixText(s.content, false);
    s.content_es = fixText(s.content_es, true);
    return s;
  });

  return guide;
});

console.log('Applied ' + fixes + ' text fixes');
fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2), 'utf8');
