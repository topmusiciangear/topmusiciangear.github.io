const fs = require('fs');
const data = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/temp/deepaudit/chunk3.json','utf8'));

const results = {};

data.forEach((guide) => {
  const issues = [];
  
  // 1. Check price mentions in text vs productTable
  if (guide.productTable) {
    const priceRow = guide.productTable.rows.find(r => r.label === 'Price');
    if (priceRow) {
      const prices = priceRow.values.map(v => v.value);
      // Check for consistent price formatting (no missing $ signs etc)
      prices.forEach((p, i) => {
        if (p && !p.match(/^[$£€]/) && !p.match(/^\d/) && p !== '—' && p !== 'N/A') {
          issues.push({type:'fact', note:'Price col '+i+' unusual format: '+p, severity:'low'});
        }
      });
    }
  }
  
  // 2. Check verdict vs conclusion alignment (both should mention same top picks)
  if (guide.verdict && guide.conclusion) {
    // Simple check: if verdict mentions a product not in conclusion
    const verdictLower = guide.verdict.toLowerCase();
    const conclusionLower = guide.conclusion.toLowerCase();
    // Check for key product names mentioned in verdict
    const productNames = (guide.productTable?.columns || []).map(c => c.title);
    productNames.forEach(name => {
      if (name && verdictLower.includes(name.toLowerCase()) && !conclusionLower.includes(name.toLowerCase())) {
        // Product in verdict but not conclusion - might be ok but worth flagging
        // Don't flag if it's a minor mention
      }
    });
  }
  
  // 3. Check for inconsistent spec mentions across sections
  // Look for frequency/sensitivity/power numbers that appear in different places
  const allText = [
    guide.intro || '', guide.intro_es || '',
    guide.conclusion || '', guide.conclusion_es || '',
    guide.verdict || '', guide.verdict_es || '',
    ...(guide.sections||[]).map(s => (s.content||'') + ' ' + (s.content_es||''))
  ].join(' ');
  
  // Check for conflicting "best" claims
  const bestClaims = allText.match(/(?:best|mejor|top|首选)\s+(?:\w+\s+){0,3}(?:for|para)/gi);
  // Not very useful, skip
  
  // 4. Check featured products exist in productTable
  if (guide.featuredProducts && guide.productTable) {
    const tableIds = guide.productTable.columns.map(c => c.title);
    // This check is about product IDs vs table columns, not directly comparable
  }
  
  // 5. Check for HTML artifacts in ES content
  const esContent = [
    guide.intro_es || '', guide.conclusion_es || '', guide.verdict_es || '',
    ...(guide.sections||[]).map(s => s.content_es || ''),
    ...(guide.verdictProsCons||[]).flatMap(v => [...(v.pros_es||[]), ...(v.cons_es||[])])
  ].join(' ');
  
  // Unclosed HTML tags
  const openTags = (esContent.match(/<(?:p|strong|em|a|h[1-6]|li|ul|ol|span|br\/)[^>]*>/gi) || []).length;
  const closeTags = (esContent.match(/<\/(?:p|strong|em|a|h[1-6]|li|ul|ol|span)>/gi) || []).length;
  // br is self-closing, adjust
  const brCount = (esContent.match(/<br\/?>/gi) || []).length;
  const adjustedClose = closeTags;
  const adjustedOpen = openTags - brCount;
  if (Math.abs(adjustedOpen - adjustedClose) > 2) {
    issues.push({type:'fact', note:'Possible unclosed HTML tags in ES: open='+adjustedOpen+' close='+adjustedClose, severity:'medium'});
  }
  
  // Same for EN
  const enContent = [
    guide.intro || '', guide.conclusion || '', guide.verdict || '',
    ...(guide.sections||[]).map(s => s.content || ''),
    ...(guide.verdictProsCons||[]).flatMap(v => [...(v.pros||[]), ...(v.cons||[])])
  ].join(' ');
  const enOpen = (enContent.match(/<(?:p|strong|em|a|h[1-6]|li|ul|ol|span|br\/)[^>]*>/gi) || []).length;
  const enBr = (enContent.match(/<br\/?>/gi) || []).length;
  const enClose = (enContent.match(/<\/(?:p|strong|em|a|h[1-6]|li|ul|ol|span)>/gi) || []).length;
  if (Math.abs((enOpen - enBr) - enClose) > 2) {
    issues.push({type:'fact', note:'Possible unclosed HTML tags in EN: open='+(enOpen-enBr)+' close='+enClose, severity:'medium'});
  }
  
  // 6. Check for empty/null critical fields
  if (!guide.title || guide.title.trim() === '') {
    issues.push({type:'fact', note:'Empty title', severity:'critical'});
  }
  if (!guide.title_es || guide.title_es.trim() === '') {
    issues.push({type:'fact', note:'Empty title_es', severity:'critical'});
  }
  if (!guide.intro || guide.intro.trim() === '') {
    issues.push({type:'fact', note:'Empty intro', severity:'high'});
  }
  if (!guide.intro_es || guide.intro_es.trim() === '') {
    issues.push({type:'fact', note:'Empty intro_es', severity:'high'});
  }
  
  // 7. Check for price inconsistencies across table vs text mentions
  if (guide.productTable) {
    const priceRow = guide.productTable.rows.find(r => r.label === 'Price');
    if (priceRow) {
      const priceValues = priceRow.values.map(v => v.value);
      // Check if any price is drastically different from others in same row (possible copy error)
      const numericPrices = priceValues.map(p => parseFloat(p.replace(/[$£€,]/g, ''))).filter(n => !isNaN(n));
      if (numericPrices.length > 2) {
        const median = numericPrices.sort((a,b) => a-b)[Math.floor(numericPrices.length/2)];
        numericPrices.forEach((p, i) => {
          if (p > median * 5 || p < median / 5) {
            issues.push({type:'fact', note:'Price col '+i+' ($'+p+') seems inconsistent vs median $'+median, severity:'medium'});
          }
        });
      }
    }
  }
  
  // 8. Check pros/cons arrays are non-empty
  if (guide.verdictProsCons) {
    guide.verdictProsCons.forEach((v, i) => {
      if (!v.pros || v.pros.length === 0) issues.push({type:'fact', note:v.name+' has empty pros', severity:'medium'});
      if (!v.cons || v.cons.length === 0) issues.push({type:'fact', note:v.name+' has empty cons', severity:'medium'});
      if (!v.pros_es || v.pros_es.length === 0) issues.push({type:'fact', note:v.name+' has empty pros_es', severity:'medium'});
      if (!v.cons_es || v.cons_es.length === 0) issues.push({type:'fact', note:v.name+' has empty cons_es', severity:'medium'});
    });
  }
  
  if (issues.length > 0) {
    results[guide.id] = issues;
  }
});

let totalIssues = 0;
const typeCounts = {};
Object.entries(results).forEach(([id, issues]) => {
  totalIssues += issues.length;
  issues.forEach(i => {
    typeCounts[i.type] = (typeCounts[i.type]||0)+1;
  });
});

console.log('Guides with issues:', Object.keys(results).length, '/', data.length);
console.log('Total issues:', totalIssues);
console.log('Type counts:', JSON.stringify(typeCounts, null, 2));
console.log('---');
Object.entries(results).forEach(([id, issues]) => {
  console.log('\n' + id + ':');
  issues.forEach(i => console.log('  ['+i.severity+'] '+i.type+': '+i.note));
});

fs.writeFileSync('C:/Users/Daniel/projects/topmusiciangear/temp/deepaudit/factual_results.json', JSON.stringify(results, null, 2));
console.log('\n---factual_results.json written---');
