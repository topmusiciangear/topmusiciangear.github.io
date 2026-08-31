var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json','utf8'));
var p = JSON.parse(fs.readFileSync('data/products.json','utf8'));

var fixed = 0;

function fixField(obj, field, from, to) {
  if(obj[field] && obj[field].includes(from)) {
    obj[field] = obj[field].split(from).join(to);
    return true;
  }
  return false;
}

function fixAll(from, to) {
  g.forEach(guide=>{
    ['intro','conclusion','intro_es','conclusion_es'].forEach(f=>{
      if(fixField(guide, f, from, to)) fixed++;
    });
    guide.sections.forEach((s,i)=>{
      ['content','content_es'].forEach(f=>{
        if(fixField(guide.sections[i], f, from, to)) fixed++;
      });
    });
  });
}

// ============= ES GRAMMAR FIXES =============
// Double articles
fixAll('el el ', 'el ');
fixAll('la la ', 'la ');
fixAll('un un ', 'un ');
fixAll('una una ', 'una ');
fixAll('los los ', 'los ');
fixAll('las las ', 'las ');

// Double prepositions
fixAll('de de ', 'de ');
fixAll('en en ', 'en ');
fixAll('con con ', 'con ');
fixAll('por por ', 'por ');
fixAll('para para ', 'para ');
fixAll('sin sin ', 'sin ');
fixAll('sobre sobre ', 'sobre ');
fixAll('entre entre ', 'entre ');
fixAll('hasta hasta ', 'hasta ');
fixAll('desde desde ', 'desde ');

// Double conjunctions
fixAll('que que ', 'que ');
fixAll('y y ', 'y ');
fixAll('o o ', 'o ');
fixAll('pero pero ', 'pero ');
fixAll('sino sino ', 'sino ');
fixAll('aunque aunque ', 'aunque ');
fixAll('porque porque ', 'porque ');
fixAll('como como ', 'como ');
fixAll('cuando cuando ', 'cuando ');
fixAll('si si ', 'si ');
fixAll('ni ni ', 'ni ');

// Double pronouns
fixAll('se se ', 'se ');
fixAll('lo lo ', 'lo ');
fixAll('le le ', 'le ');
fixAll('me me ', 'me ');
fixAll('te te ', 'te ');
fixAll('nos nos ', 'nos ');
fixAll('les les ', 'les ');
fixAll('mi mi ', 'mi ');
fixAll('tu tu ', 'tu ');
fixAll('su su ', 'su ');

// Space before punctuation
fixAll(' .', '.');
fixAll(' ,', ',');
fixAll(' !', '!');
fixAll(' ?', '?');
fixAll(' ;', ';');
fixAll(' :', ':');

// Double punctuation
fixAll('..', '.');
fixAll(',,', ',');
fixAll('!!', '!');
fixAll('??', '?');

// ============= EN GRAMMAR FIXES =============
fixAll('the the ', 'the ');
fixAll('a a ', 'a ');
fixAll('an an ', 'an ');
fixAll('to to ', 'to ');
fixAll('of of ', 'of ');
fixAll('in in ', 'in ');
fixAll('is is ', 'is ');
fixAll('are are ', 'are ');
fixAll('and and ', 'and ');
fixAll('or or ', 'or ');
fixAll('for for ', 'for ');
fixAll('with with ', 'with ');
fixAll('that that ', 'that ');
fixAll('it it ', 'it ');
fixAll('this this ', 'this ');
fixAll('from from ', 'from ');
fixAll('on on ', 'on ');
fixAll('at at ', 'at ');
fixAll('by by ', 'by ');
fixAll('as as ', 'as ');
fixAll('if if ', 'if ');
fixAll('its its ', 'its ');
fixAll('the a', 'a');
fixAll('a the', 'a');
fixAll('a an', 'an');
fixAll('an a', 'a');
fixAll('an the', 'the');
fixAll('the an', 'an');

// ============= SELLING TONE FIXES =============
// EN
fixAll('you need to buy', 'consider buying');
fixAll('you should buy', 'consider buying');
fixAll('you must buy', 'consider buying');
fixAll('you really need', 'you may want');
fixAll('you absolutely need', 'you may want');
fixAll("don't miss out", "don't overlook");
fixAll('limited time', 'currently available');
fixAll('before it\'s gone', 'while available');
fixAll('incredible deal', 'good value');
fixAll('amazing deal', 'good value');
fixAll('best deal', 'good value');
fixAll('unbeatable', 'competitive');
fixAll('indisputable', 'widely recognized');
fixAll('undeniable', 'notable');

// ES
fixAll('debes comprar', 'vale la pena considerar');
fixAll('no te lo pierdas', 'no lo pases por alto');
fixAll('oferta increíble', 'buena relación calidad-precio');
fixAll('mejor precio', 'precio competitivo');
fixAll('no dejes pasar', 'considera aprovechar');
fixAll('antes de que se agote', 'mientras esté disponible');
fixAll('imbatible', 'competitivo');
fixAll('indiscutible', 'reconocido');

// ============= TRANSLATION RATIO FIXES =============
// These are sections where ES is much longer than EN or vice versa
// The main issue is usually that ES sections have broken/extra content
// For now, flag them but don't auto-fix as they need manual review

fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2), 'utf8');
console.log('Total fixes: ' + fixed);

// Re-run checks to verify
var remaining = 0;
var esPatterns = ['el el ','la la ','un un ','una una ','de de ','en en ','que que ','y y ','o o ','se se ','lo lo '];
var enPatterns = ['the the ','a a ','is is ','are are ','and and ','or or ','for for ','with with ','that that ','it it '];
g.forEach(guide=>{
  ['intro_es','conclusion_es'].forEach(f=>{
    if(!guide[f]) return;
    esPatterns.forEach(p=>{ if(guide[f].includes(p)) remaining++; });
  });
  guide.sections.forEach(s=>{
    if(!s.content_es) return;
    esPatterns.forEach(p=>{ if(s.content_es.includes(p)) remaining++; });
  });
  ['intro','conclusion'].forEach(f=>{
    if(!guide[f]) return;
    enPatterns.forEach(p=>{ if(guide[f].includes(p)) remaining++; });
  });
  guide.sections.forEach(s=>{
    if(!s.content) return;
    enPatterns.forEach(p=>{ if(s.content.includes(p)) remaining++; });
  });
});
console.log('Remaining grammar issues: ' + remaining);
