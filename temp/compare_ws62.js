// Extrae la guia studio-subwoofers de dos commits y hace diff de los campos dañados
const { execSync } = require('child_process');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
function getGuideFromCommit(commit) {
  const raw = execSync('git -C "' + B + '" show ' + commit + ':data/guides.json', { maxBuffer: 1024 * 1024 * 300 }).toString('utf8');
  const g = JSON.parse(raw);
  return g.find(x => x.id === 'studio-subwoofers');
}
const before = getGuideFromCommit('4001b94d05');
const after = getGuideFromCommit('7984db4f25');
const fields = [
  'heading', 'heading_es', 'content', 'content_es'
];
console.log('=== sections[4] antes vs despues ===');
fields.forEach(f => {
  const b = before.sections[4][f], a = after.sections[4][f];
  if (b !== a) {
    console.log('--- ' + f + ' CAMBIO ---');
    console.log('ANTES:', JSON.stringify(b).slice(0, 400));
    console.log('DESPUES:', JSON.stringify(a).slice(0, 400));
  } else console.log(f + ': igual');
});
console.log('=== verdict ===');
console.log('ANTES (extracto):', JSON.stringify(before.verdict.slice(before.verdict.indexOf('horizontally opposed') - 150, before.verdict.indexOf('horizontally opposed') + 120)));
console.log('DESPUES (extracto):', JSON.stringify(after.verdict.slice(after.verdict.indexOf('horizontally opposed') - 150, after.verdict.indexOf('horizontally opposed') + 120)));
console.log('=== faq_a5_en ===');
console.log('ANTES:', JSON.stringify(before.featuredSnippet.faq_a5_en));
console.log('DESPUES:', JSON.stringify(after.featuredSnippet.faq_a5_en));
console.log('=== faq_a5_es ===');
console.log('ANTES:', JSON.stringify(before.featuredSnippet.faq_a5_es));
console.log('DESPUES:', JSON.stringify(after.featuredSnippet.faq_a5_es));
console.log('=== text_en ===');
console.log('ANTES:', JSON.stringify(before.featuredSnippet.text_en));
console.log('DESPUES:', JSON.stringify(after.featuredSnippet.text_en));
console.log('=== columns[3] ===');
console.log('ANTES:', JSON.stringify(before.productTable.columns[3]));
console.log('DESPUES:', JSON.stringify(after.productTable.columns[3]));
console.log('=== vpc[3] name ===');
console.log('ANTES:', JSON.stringify(before.verdictProsCons[3].name), JSON.stringify(before.verdictProsCons[3].name_es));
console.log('DESPUES:', JSON.stringify(after.verdictProsCons[3].name), JSON.stringify(after.verdictProsCons[3].name_es));
