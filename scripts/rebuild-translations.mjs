import fs from 'fs';

const code = fs.readFileSync('js/translations.js', 'utf8');
const match = code.match(/const translations\s*=\s*(\{[\s\S]*?\};)/);
if (match) {
  const obj = eval('(' + match[1].replace(/;\s*$/, '') + ')');
  const out = 'const translations=' + JSON.stringify(obj) + ';\n\nconst languageNames=' + JSON.stringify({en:{img:'<img class="lang-flag" src="img/flag-en.svg" alt="EN" width="16" height="12" style="vertical-align:middle">'},es:{img:'<img class="lang-flag" src="img/flag-es.svg" alt="ES" width="16" height="12" style="vertical-align:middle">'}}) + ';';
  fs.writeFileSync('js/translations.min.js', out);
  console.log('Regenerated translations.min.js');
}
