const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const map = JSON.parse(fs.readFileSync(B + 'temp/desc_es_new.json', 'utf8'));
const EN = /\b(the|and|with|for|from|that|this|your|you|are|is|was|were|will|can|into|than|then|which|while|where|when|what|their|them|they|have|has|had|been|being|its|our|out|not|but|all|any|one|two|three|more|most|less|very|real|best|new|full|single|every|both|each|other|such|only|also|just|like|make|made|using|used|uses|built|includes|included|features|powerful|versatile|complete|professional|world|industry|standard|legacy|definitive)\b/gi;
Object.keys(map).forEach(id => {
  const hits = map[id].match(EN);
  if (hits) console.log(id + ' -> ' + [...new Set(hits.map(h => h.toLowerCase()))].join(', ') + '  ||  ' + map[id].slice(0, 70));
});