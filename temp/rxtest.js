const t = '10 Basses for Home Office & Travel (2026 Comparison)';
console.log('regex test: ' + /\(20\d\d\)/.test(t));
console.log('has paren-year: ' + (t.indexOf('(2026') > -1));
