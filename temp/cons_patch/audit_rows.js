var fs=require('fs');
var A=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
var g=A.find(function(x){return x&&x.productTable&&x.productTable.rows&&x.productTable.rows.length;});
var o=[];
o.push('GUIDE='+g.id);
o.push('TABLE_TITLE='+g.productTable.title);
o.push('NCOLS='+g.productTable.columns.length+' NROWS='+g.productTable.rows.length);
o.push('ROW0='+JSON.stringify(g.productTable.rows[0]).slice(0,600));
o.push('ROW1='+JSON.stringify(g.productTable.rows[1]).slice(0,600));
o.push('COLS='+JSON.stringify(g.productTable.columns.map(function(c){return c.title;})));
// comparison rows shape (vs guide)
var v=A.find(function(x){return x&&x.id==='rme-vs-motu';});
o.push('CMP_ROW0='+JSON.stringify(v.comparison.rows[0]));
fs.writeFileSync('temp/cons_patch/audit_rows.txt', o.join('\n'),'utf8');
console.log('ok');
