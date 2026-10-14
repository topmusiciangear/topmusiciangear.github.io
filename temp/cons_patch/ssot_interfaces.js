var fs = require('fs');
var t = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8');
var data = JSON.parse(todel);
var guides = data;
console.log('typeof data = ' + typeof data + (Array.isArray(data) ? ' ARRAY len=' + data.length : ' keys=' + Object.keys(data).join(',')));
var out = [];
var INT = /interface/;
guides.forEach(function (g, gi) {
  var slug = String(g.slug || g.id || '');
  if (!INT.test(slug)) return;
  out.push('\n========== [' + gi + '] slug=' + slug + ' ==========');
  out.push('  title       : ' + JSON.stringify(g.title));
  out.push('  title_es    : ' + JSON.stringify(g.title_es));
  out.push('  headings(EN): ' + JSON.stringify(g.h1 || g.heading || g.h || '(none)'));
  var comp = g.comparison || g.compTable || null;
  out.push('  comparison  : ' + (comp ? 'PRESENT rows=' + ((comp.rows || []).length) : 'NONE'));
  (comp && comp.rows || []).forEach(function (r, ri) {
    out.push('    row[' + ri + '] label=' + JSON.stringify(r.label) + ' | label_es=' + JSON.stringify(r.label_es || ''));
    (r.cells || []).forEach(function (c, ci) {
      var v = c.value;
      var es = c.value_es;
      var flag = '';
      if (/(Voz|inst|Smartgain|Bajo coste|Vocal\+76|Bajo coste alto|2 headphone|iD scroll|streaming|Vintage 610|loopback)/.test(String(v))) flag = '  <== ES-LIKE in EN value';
      out.push('       cell[' + ci + '] value=' + JSON.stringify(v) + (es !== undefined ? ' | value_es=' + JSON.stringify(es) : '') + flag);
    });
  });
  var vis = g.verdicts || g.verdict || null;
  out.push('  verdicts count: ' + ((g.verdicts ? g.verdicts.length + ' (array)' : (g.verdict ? 'present' : 'NONE'))));
});
var outp = out.join('\n');
fs.writeFileSync('C:/Users/Daniel/projects/topmusiciangear/temp/cons_patch/ssot_interfaces.txt', outp, 'utf8');
console.log('wrote ' + outp.length + ' chars');
