const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));

function detectType(q) {
  if (!q) return 'MISSING';
  if (/^Should you choose/i.test(q)) return 'SHOULD_CHOOSE';
  if (/^¿Deberías elegir/i.test(q)) return 'SHOULD_CHOOSE';
  if (/^What makes/i.test(q)) return 'WHAT_MAKES';
  if (/^¿Qué hace/i.test(q)) return 'WHAT_MAKES';
  if (/^Why is/i.test(q)) return 'WHY_IS';
  if (/^Why has/i.test(q)) return 'WHY_HAS';
  if (/^¿Por qué/i.test(q)) return 'WHY_IS';
  if (/^Would you recommend/i.test(q)) return 'WOULD_RECOMMEND';
  if (/^¿Recomendarías/i.test(q)) return 'WOULD_RECOMMEND';
  if (/^Would the/i.test(q)) return 'WOULD_THE';
  if (/^How does/i.test(q)) return 'HOW_DOES';
  if (/^¿Cómo se compara/i.test(q)) return 'HOW_DOES';
  if (/^Is the.*worth/i.test(q)) return 'IS_WORTH';
  if (/^¿Vale la pena/i.test(q)) return 'IS_WORTH';
  if (/^Is the/i.test(q)) return 'IS_THE';
  if (/^¿Es (el|la)/i.test(q)) return 'IS_THE';
  if (/^¿Sería/i.test(q)) return 'WOULD_THE';
  if (/^¿Funcionaría/i.test(q)) return 'WOULD_THE';
  if (/^Sigue/i.test(q)) return 'SIGUE';
  if (/^¿Sigue/i.test(q)) return 'SIGUE';
  if (/^What is the difference/i.test(q)) return 'WHAT_DIFF';
  if (/^¿Cuál es la diferencia/i.test(q)) return 'WHAT_DIFF';
  if (/^Which is better/i.test(q)) return 'WHICH_BETTER';
  if (/^¿Cu(ál|á) tiene mejor/i.test(q)) return 'WHICH_BETTER';
  if (/^¿Qué (tipo|clase) de/i.test(q)) return 'WHAT_KIND';
  if (/^¿Requiere (el|la)/i.test(q)) return 'DOES_THE';
  if (/^Are the/i.test(q)) return 'ARE_THE';
  if (/^¿Son (los|las)/i.test(q)) return 'ARE_THE';
  if (/^Do you need/i.test(q)) return 'DO_YOU_NEED';
  if (/^How important/i.test(q)) return 'HOW_IMPORTANT';
  if (/^What should/i.test(q)) return 'WHAT_SHOULD';
  if (/^Does the/i.test(q)) return 'DOES_THE';
  if (/^What kind of/i.test(q)) return 'WHAT_KIND';
  if (/^Would you choose/i.test(q)) return 'SHOULD_CHOOSE';
  return 'UNKNOWN';
}

let errors = [];
let reviewed = [];

guides.forEach(g => {
  if (!g.featuredSnippet) return;
  const qKeys = Object.keys(g.featuredSnippet).filter(k => /^faq_q\d+_en$/.test(k)).sort();

  qKeys.forEach(k => {
    const num = k.match(/\d+/)[0];
    const qEn = g.featuredSnippet[k] || '';
    const qEs = g.featuredSnippet['faq_q' + num + '_es'] || '';
    const aEn = g.featuredSnippet['faq_a' + num + '_en'] || '';
    const aEs = g.featuredSnippet['faq_a' + num + '_es'] || '';

    if (!aEn && !aEs) return;

    const typeEn = detectType(qEn);
    const typeEs = detectType(qEs);

    const id = g.id + ' Q' + num;

    // === GRAMMAR CHECKS ===

    // Starts lowercase
    if (aEn && !/^[A-Z]/.test(aEn)) {
      errors.push({ id, lang: 'EN', issue: 'starts lowercase', text: aEn.substring(0, 80) });
    }
    if (aEs && !/^[A-Z\u00C0-\u00DC]/.test(aEs)) {
      errors.push({ id, lang: 'ES', issue: 'starts lowercase', text: aEs.substring(0, 80) });
    }

    // No ending punctuation
    if (aEn && !/[.!?]$/.test(aEn.trim())) {
      errors.push({ id, lang: 'EN', issue: 'no ending punctuation', text: aEn.substring(0, 80) });
    }
    if (aEs && !/[.!?]$/.test(aEs.trim())) {
      errors.push({ id, lang: 'ES', issue: 'no ending punctuation', text: aEs.substring(0, 80) });
    }

    // Double spaces
    if (aEn && /\s{2,}/.test(aEn)) {
      errors.push({ id, lang: 'EN', issue: 'double spaces', text: aEn.substring(0, 80) });
    }
    if (aEs && /\s{2,}/.test(aEs)) {
      errors.push({ id, lang: 'ES', issue: 'double spaces', text: aEs.substring(0, 80) });
    }

    // Double period ". ."
    if (aEn && /\. \./.test(aEn)) {
      errors.push({ id, lang: 'EN', issue: 'double period', text: aEn.substring(0, 80) });
    }
    if (aEs && /\. \./.test(aEs)) {
      errors.push({ id, lang: 'ES', issue: 'double period', text: aEs.substring(0, 80) });
    }

    // Common EN typos
    if (aEn) {
      if (/ ca /.test(aEn)) errors.push({ id, lang: 'EN', issue: "'ca' typo (can)", text: aEn.substring(0, 80) });
      if (/ doesnt /.test(aEn) && !/ doesn't /.test(aEn)) errors.push({ id, lang: 'EN', issue: "'doesnt' typo", text: aEn.substring(0, 80) });
      if (/ dont /.test(aEn) && !/ don't /.test(aEn)) errors.push({ id, lang: 'EN', issue: "'dont' typo", text: aEn.substring(0, 80) });
      if (/ cant /.test(aEn) && !/ can't /.test(aEn)) errors.push({ id, lang: 'EN', issue: "'cant' typo", text: aEn.substring(0, 80) });
      if (/ wont /.test(aEn) && !/ won't /.test(aEn)) errors.push({ id, lang: 'EN', issue: "'wont' typo", text: aEn.substring(0, 80) });
      if (/ im /.test(aEn) && !/ I'm /.test(aEn)) errors.push({ id, lang: 'EN', issue: "'im' typo", text: aEn.substring(0, 80) });
      if (/ thats /.test(aEn) && !/ that's /.test(aEn)) errors.push({ id, lang: 'EN', issue: "'thats' typo", text: aEn.substring(0, 80) });
      if (/ youll /.test(aEn) && !/ you'll /.test(aEn)) errors.push({ id, lang: 'EN', issue: "'youll' typo", text: aEn.substring(0, 80) });
      if (/ its /.test(aEn) && !/ it's /.test(aEn)) errors.push({ id, lang: 'EN', issue: "'its' vs 'it's'", text: aEn.substring(0, 80) });
      if (/ the the /i.test(aEn)) errors.push({ id, lang: 'EN', issue: "repeated 'the'", text: aEn.substring(0, 80) });
    }

    // Common ES typos
    if (aEs) {
      if (/ esta /.test(aEs) && !/ está /.test(aEs)) errors.push({ id, lang: 'ES', issue: "'esta' may need accent 'está'", text: aEs.substring(0, 80) });
      if (/ mas /.test(aEs) && !/ más /.test(aEs)) errors.push({ id, lang: 'ES', issue: "'mas' vs 'más'", text: aEs.substring(0, 80) });
      if (/ solo /.test(aEs) && !/ sólo /.test(aEs)) errors.push({ id, lang: 'ES', issue: "'solo' vs 'sólo'", text: aEs.substring(0, 80) });
      if (/ si, /i.test(aEs) && !/ sí, /i.test(aEs)) errors.push({ id, lang: 'ES', issue: "'si' vs 'sí'", text: aEs.substring(0, 80) });
      if (/ que, /i.test(aEs) && !/ que /.test(aEs)) errors.push({ id, lang: 'ES', issue: "'que' needs accent?", text: aEs.substring(0, 80) });
    }

    // === ANSWER DIRECTNESS CHECKS ===

    if (typeEn === 'SHOULD_CHOOSE' && aEn && !/^Yes, you should choose/i.test(aEn)) {
      errors.push({ id, lang: 'EN', type: typeEn, issue: 'missing direct prefix', text: aEn.substring(0, 100) });
    }
    if (typeEn === 'WHAT_MAKES' && aEn && !/makes a great choice/i.test(aEn)) {
      errors.push({ id, lang: 'EN', type: typeEn, issue: 'missing direct prefix', text: aEn.substring(0, 100) });
    }
    if (typeEn === 'WHY_IS' && aEn && !/is recommended/i.test(aEn)) {
      errors.push({ id, lang: 'EN', type: typeEn, issue: 'missing direct prefix', text: aEn.substring(0, 100) });
    }
    if (typeEn === 'WHY_HAS' && aEn && !/is recommended/i.test(aEn)) {
      errors.push({ id, lang: 'EN', type: typeEn, issue: 'missing direct prefix', text: aEn.substring(0, 100) });
    }
    if (typeEn === 'HOW_DOES' && aEn && !/stands out/i.test(aEn)) {
      errors.push({ id, lang: 'EN', type: typeEn, issue: 'missing direct prefix', text: aEn.substring(0, 100) });
    }
    if (typeEn === 'IS_WORTH' && aEn && !/It depends/i.test(aEn) && !/^Yes[,.!? ]/i.test(aEn) && !/^No[,.!? ]/i.test(aEn)) {
      errors.push({ id, lang: 'EN', type: typeEn, issue: 'missing direct prefix', text: aEn.substring(0, 100) });
    }
    if (typeEn === 'WOULD_RECOMMEND' && aEn && !/^Yes, I would recommend/i.test(aEn)) {
      errors.push({ id, lang: 'EN', type: typeEn, issue: 'missing direct prefix', text: aEn.substring(0, 100) });
    }
    if (typeEn === 'WHICH_BETTER' && aEn && !/^Both/i.test(aEn)) {
      errors.push({ id, lang: 'EN', type: typeEn, issue: 'missing direct prefix', text: aEn.substring(0, 100) });
    }
    if (typeEn === 'WHAT_DIFF' && aEn && !/^The main difference/i.test(aEn)) {
      errors.push({ id, lang: 'EN', type: typeEn, issue: 'missing direct prefix', text: aEn.substring(0, 100) });
    }
    if (typeEn === 'WOULD_THE' && aEn && !/^Yes, the/i.test(aEn) && !/^Yes, I/i.test(aEn)) {
      errors.push({ id, lang: 'EN', type: typeEn, issue: 'missing direct prefix', text: aEn.substring(0, 100) });
    }
    if (typeEn === 'IS_THE' && aEn && !/^Yes, the/i.test(aEn) && !/It depends/i.test(aEn) && !/^Yes[,.!? ]/i.test(aEn)) {
      // IS_THE could be various things - flag only if no prefix and no Yes
      if (!/^Yes[,.!? ]/i.test(aEn) && !/It depends/i.test(aEn)) {
        errors.push({ id, lang: 'EN', type: typeEn, issue: 'missing direct prefix', text: aEn.substring(0, 100) });
      }
    }

    // ES directness checks
    if (typeEs === 'SHOULD_CHOOSE' && aEs && !/^Sí, deberías elegir/i.test(aEs)) {
      errors.push({ id, lang: 'ES', type: typeEs, issue: 'missing direct prefix', text: aEs.substring(0, 100) });
    }
    if (typeEs === 'WHAT_MAKES' && aEs && !/es una gran opción/i.test(aEs)) {
      errors.push({ id, lang: 'ES', type: typeEs, issue: 'missing direct prefix', text: aEs.substring(0, 100) });
    }
    if (typeEs === 'WHY_IS' && aEs && !/Se recomienda/i.test(aEs) && !/^Sí/i.test(aEs)) {
      errors.push({ id, lang: 'ES', type: typeEs, issue: 'missing direct prefix', text: aEs.substring(0, 100) });
    }
    if (typeEs === 'HOW_DOES' && aEs && !/se destaca/i.test(aEs)) {
      errors.push({ id, lang: 'ES', type: typeEs, issue: 'missing direct prefix', text: aEs.substring(0, 100) });
    }
    if (typeEs === 'IS_WORTH' && aEs && !/Depende/i.test(aEs) && !/^Sí[,.!?]/i.test(aEs) && !/^No[,.!?]/i.test(aEs)) {
      errors.push({ id, lang: 'ES', type: typeEs, issue: 'missing direct prefix', text: aEs.substring(0, 100) });
    }
    if (typeEs === 'WOULD_RECOMMEND' && aEs && !/^Sí, recomendaría/i.test(aEs)) {
      errors.push({ id, lang: 'ES', type: typeEs, issue: 'missing direct prefix', text: aEs.substring(0, 100) });
    }
    if (typeEs === 'WHICH_BETTER' && aEs && !/Ambos/i.test(aEs)) {
      errors.push({ id, lang: 'ES', type: typeEs, issue: 'missing direct prefix', text: aEs.substring(0, 100) });
    }
    if (typeEs === 'WHAT_DIFF' && aEs && !/La principal diferencia/i.test(aEs) && !/La diferencia/i.test(aEs)) {
      errors.push({ id, lang: 'ES', type: typeEs, issue: 'missing direct prefix', text: aEs.substring(0, 100) });
    }
    if (typeEs === 'WOULD_THE' && aEs && !/^Sí[,.!? ]/i.test(aEs)) {
      errors.push({ id, lang: 'ES', type: typeEs, issue: 'missing direct prefix', text: aEs.substring(0, 100) });
    }
    if (typeEs === 'ARE_THE' && aEs && !/son una gran opción/i.test(aEs) && !/^Sí[,.!?]/i.test(aEs)) {
      errors.push({ id, lang: 'ES', type: typeEs, issue: 'missing direct prefix', text: aEs.substring(0, 100) });
    }
    if (typeEs === 'SIGUE' && aEs && !/sigue siendo/i.test(aEs)) {
      errors.push({ id, lang: 'ES', type: typeEs, issue: 'missing direct prefix', text: aEs.substring(0, 100) });
    }
  });
});

console.log('=== GRAMMAR & DIRECTNESS ISSUES: ' + errors.length + ' ===');
if (errors.length > 0) {
  console.log('');
  errors.forEach(e => {
    const typeStr = e.type ? ' [' + e.type + ']' : '';
    console.log(e.id + ' ' + e.lang + typeStr + ' :: ' + e.issue);
    console.log('  ' + e.text);
    console.log('');
  });
} else {
  console.log('No issues found!');
}

// === SUMMARY BY GUIDE ===
console.log('\n=== SUMMARY BY GUIDE ===');
guides.forEach(g => {
  if (!g.featuredSnippet) return;
  const qKeys = Object.keys(g.featuredSnippet).filter(k => /^faq_q\d+_en$/.test(k)).sort();
  const issues = errors.filter(e => e.id.startsWith(g.id));
  if (issues.length > 0) {
    console.log(g.id + ' (' + qKeys.length + ' Qs) - ' + issues.length + ' issue(s)');
  }
});
