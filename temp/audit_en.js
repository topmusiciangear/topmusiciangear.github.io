// EN natural-language audit: detect AI-sounding phrasing, grammar issues, typos, non-natural expressions
const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const g = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));

function textosEN(o, ruta, acc) {
  acc = acc || [];
  if (Array.isArray(o)) { o.forEach((v, i) => textosEN(v, ruta + '[' + i + ']', acc)); return acc; }
  if (o && typeof o === 'object') {
    Object.entries(o).forEach(([k, v]) => {
      if (typeof v === 'string' && !/(_es|title_es|desc_es)$/.test(k)) {
        if (['title','heading','body','conclusion','faq_q','faq_a','snippet','sectionHeading','pros','cons','verdictPros','verdictCons','metaDesc','ogDesc','intro','section','sectionText'].includes(k)) {
          acc.push({ campo: (ruta ? ruta + '.' : '') + k, texto: v });
        }
      }
      else if (v && typeof v === 'object') textosEN(v, (ruta ? ruta + '.' : '') + k, acc);
    });
    return acc;
  }
  return acc;
}

const PATRONES = [
  [/\bIn conclusion\b/i, 'formulaic transition'],
  [/\bIt is important to note\b/i, 'AI phrase'],
  [/\bIt'?s worth noting\b/i, 'AI phrase'],
  [/\bWhen it comes to\b/i, 'cliched opener'],
  [/\bWhether you'?re\b/i, 'cliched opener'],
  [/\bHaving said that\b/i, 'AI transition'],
  [/\bThat being said\b/i, 'AI transition'],
  [/\bAt the end of the day\b/i, 'cliche'],
  [/\bAll things considered\b/i, 'AI phrase'],
  [/\bIn today'?s\b/i, 'AI opener'],
  [/\bIn the world of\b/i, 'AI opener'],
  [/\bgame[- ]changer\b/i, 'cliche'],
  [/\bcutting[- ]edge\b/i, 'cliche'],
  [/\bstate[- ]of[- ]the[- ]art\b/i, 'cliche'],
  [/\btop[- ]notch\b/i, 'cliche'],
  [/\bhigh[- ]quality\b/i, 'generic'],
  [/\bwide range of\b/i, 'generic'],
  [/\bwide variety of\b/i, 'generic'],
  [/\bplethora of\b/i, 'AI word'],
  [/\bmyriad of\b/i, 'AI word'],
  [/\bdelve into\b/i, 'AI word'],
  [/\bexplore the world of\b/i, 'AI phrase'],
  [/\bdiscover the\b/i, 'AI opener'],
  [/\bunlock the\b/i, 'AI phrase'],
  [/\bunleash your\b/i, 'AI phrase'],
  [/\btake your.*to the next level\b/i, 'AI phrase'],
  [/\belevate your\b/i, 'AI phrase'],
  [/\bseamlessly\b/i, 'AI word'],
  [/\bseamless\b/i, 'AI word'],
  [/\bversatile\b/i, 'generic'],
  [/\bcomprehensive\b/i, 'generic'],
  [/\bpowerhouse\b/i, 'cliche'],
  [/\bjuggernaut\b/i, 'AI word'],
  [/\btestament to\b/i, 'AI phrase'],
  [/\bneedless to say\b/i, 'AI phrase'],
  [/\bit goes without saying\b/i, 'AI phrase'],
  [/\bas a matter of fact\b/i, 'AI phrase'],
  [/\bLast but not least\b/i, 'cliche'],
  [/\bFirst and foremost\b/i, 'cliche'],
  [/\bTo sum it up\b/i, 'AI closer'],
  [/\bAll in all\b/i, 'AI closer'],
  [/\bTo wrap up\b/i, 'AI closer'],
  [/\bIn a nutshell\b/i, 'cliche'],
  [/\bAt its core\b/i, 'AI phrase'],
  [/\bThe bottom line is\b/i, 'AI closer'],
  [/\bHere'?s what\b/i, 'AI phrase'],
  [/\bHere'?s the thing\b/i, 'AI phrase'],
  [/\bHere'?s why\b/i, 'AI phrase'],
  [/\bHere'?s how\b/i, 'AI phrase'],
  [/\bHere'?s where\b/i, 'AI phrase'],
  [/\bHere'?s the deal\b/i, 'AI phrase'],
  [/\bHere'?s the kicker\b/i, 'AI phrase'],
  [/\bHere'?s the catch\b/i, 'AI phrase'],
  [/\bHere'?s the twist\b/i, 'AI phrase'],
  [/\bHere'?s the rub\b/i, 'AI phrase'],
  [/\bwhen all is said and done\b/i, 'cliche'],
  [/\bmore affordable\b/i, 'redundant'],
  [/\beasy to use\b/i, 'generic'],
  [/\buser[- ]friendly\b/i, 'generic'],
  [/\blow[- ]cost\b/i, 'generic'],
  [/\brobust\b/i, 'AI word when describing features'],
  [/\bHowever,\s/i, 'check overuse per guide'],
  [/\bMoreover,\s/i, 'check overuse per guide'],
  [/\bFurthermore,\s/i, 'check overuse per guide'],
  [/\bNevertheless\b/i, 'check overuse per guide'],
  [/\bNonetheless\b/i, 'check overuse per guide'],
  [/\bConsequently\b/i, 'check overuse per guide'],
  [/\bSubsequently\b/i, 'check overuse per guide'],
  [/\bIn addition,\s/i, 'check overuse per guide'],
  [/\bSpeaking of which\b/i, 'AI transition'],
  [/\bThe thing is\b/i, 'filler'],
  [/\bWhat this means is\b/i, 'filler'],
  [/\bWhat you need to know\b/i, 'AI phrase'],
  [/\bworth mentioning\b/i, 'AI phrase'],
  [/\bworth noting\b/i, 'AI phrase'],
  [/\bIt'?s important to\b/i, 'AI phrase'],
  [/\bIt is worth\b/i, 'AI phrase'],
  [/\bgame-changing\b/i, 'cliche'],
  [/\bgame changing\b/i, 'cliche'],
  [/\bIn fact,\s/i, 'overused filler'],
  [/\bOn top of that\b/i, 'check overuse'],
  [/\bTo be honest\b/i, 'filler'],
  [/\bHonestly,\s/i, 'filler'],
  [/\bBasically,\s/i, 'filler'],
  [/\bActually,\s/i, 'filler'],
  [/\bLiterally\b/i, 'filler'],
  [/\bJust saying\b/i, 'filler'],
];

// Run audit
let total = 0;
const porGuia = {};

g.forEach(guide => {
  const textos = textosEN(guide, guide.id);
  const issues = [];
  
  textos.forEach(t => {
    PATRONES.forEach(([pattern, label]) => {
      const match = t.texto.match(pattern);
      if (match) {
        issues.push({
          campo: t.campo,
          label: label,
          match: match[0],
          context: t.texto.substring(Math.max(0, match.index - 40), match.index + match[0].length + 40)
        });
      }
    });
  });
  
  if (issues.length > 0) {
    porGuia[guide.id] = issues;
    total += issues.length;
  }
});

// Report
console.log('=== EN NATURAL-LANGUAGE AUDIT ===');
console.log('Total issues found: ' + total);
console.log('Guides with issues: ' + Object.keys(porGuia).length);
console.log('');

Object.entries(porGuia).forEach(([id, issues]) => {
  console.log('--- ' + id + ' (' + issues.length + ') ---');
  // Group by label to reduce noise
  const porLabel = {};
  issues.forEach(i => {
    if (!porLabel[i.label]) porLabel[i.label] = [];
    porLabel[i.label].push(i);
  });
  Object.entries(porLabel).forEach(([label, items]) => {
    console.log('  [' + label + '] x' + items.length);
    items.slice(0, 3).forEach(i => {
      console.log('    -> "' + i.context.replace(/\n/g, ' ') + '"');
    });
    if (items.length > 3) console.log('    ... +' + (items.length - 3) + ' more');
  });
  console.log('');
});
