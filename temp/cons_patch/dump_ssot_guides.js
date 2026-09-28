var fs = require('fs');
var out = [];

function listLikeSlug(g) { return (g && (g.slug || g.id || g.guide_id || '')) || ''; }

function isEsish(s) {
  s = String(s);
  return /[áéíóúñ¿¡]|Smartgain|Voz\/inst|Voz\/inst\.|Bajo coste|Podcast\/streaming|loopback|streaming|Vintage 610|Vintage 610,|iD scroll|Smartgain ajusta|tarjetero|selección|Grabación|inst\. con|Previos EVO|previos EVO|Smartgain, loopback/i.test(s);
}

function parseJSONLDSections(content) {
  var secs = [];
  if (typeof content !== 'string') return secs;
  var re = /"name":\s*"([^"]*)"\s*,\s*"(?:content|articleBody)":\s*"([\\s\\S]*?)"(?=(?:,"[^"]*":)|\s*})/g;
  var m;
  while ((m = re.exec(content)) !== null) {
    var name = m[1];
    var body = m[2];
    if (/^[A-Z0-9]/.test(name) && body.length > 50) {
      secs.push({ name: name, body: body });
    }
  }
  return secs;
}

function extractComparisonCells(g) {
  var cells = [];
  var c = g.comparison || g.compTable || g.compareTable;
  if (!c) return cells;
  var rows = c.rows || [];
  rows.forEach(function (r, ri) {
    (r.cells || []).forEach(function (cell, ci) {
      cells.push({
        row: ri, col: ci,
        label: r.label, label_es: r.label_es,
        value: cell.value, value_es: cell.value_es,
        value_en: cell.value_en, value_en_es: cell.value_en_es,
        labelEn: cell.label, labelEnEs: cell.label_es
      });
    });
  });
  return cells;
}

function showSections(g, isEs) {
  var outS = [];
  var secs = g.sections || [];
  secs.forEach(function (s, i) {
    var h = isEs ? (s.heading_es || s.h_es || '') : (s.heading || s.h || '');
    outS.push('    [' + i + '] ' + (isEs ? 'heading_es' : 'heading') + '=' + JSON.stringify(h));
    if (isEs && !s.heading_es && !s.h_es) outS.push('      <-- NO ES HEADING (undefined heading)');
  });
  return outS;
}

function showVerdicts(g) {
  var outV = [];
  var v = g.verdictProsCons || g.verdicts || g.verdict || g.verdicts_large || [];
  if (Array.isArray(v)) {
    outV.push('    verdicts: ' + v.length);
    v.forEach(function (vc, i) {
      var n = vc && (vc.name || vc.name_es || vc.product || vc.productName || ('#?'));
      outV.push('      [' + i + '] name=' + JSON.stringify(n) + ' pros=' + (vc.pros ? vc.pros.length : 0) + ' cons=' + (vc.cons ? vc.cons.length : 0));
    });
  } else if (v && typeof v === 'object') {
    outV.push('    verdicts: object keys=' + Object.keys(v).join(','));
  } else {
    outV.push('    verdicts: NONE');
  }
  return outV;
}

var p = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
var root = JSON.parse(fs.readFileSync(p, 'utf8'));

var guides = Array.isArray(root) ? root : (root.guides || root.guide || root.data || []);

['premium-interfaces', 'portable-interfaces'].forEach(function (slug) {
  var g = null;
  for (var i = 0; i < guides.length; i++) {
    var s = listLikeSlug(guides[i]);
    if (s === slug) { g = guides[i]; break; }
  }
  out.push('\n\n########## ' + slug + ' (EN) ##########');
  if (!g) {
    out.push('NOT FOUND. Available slugs containing "interface": ' + guides.map(listLikeSlug).filter(function (s) { return /interface/.test(s); }).join(' | '));
    return;
  }
  out.push('title    : ' + JSON.stringify(g.title));
  out.push('title_es : ' + JSON.stringify(g.title_es));
  out.push('h1       : ' + JSON.stringify(g.h1 || g.heading || '(none)'));
  out.push('slug     : ' + JSON.stringify(g.slug));

  var comp = g.comparison || g.compTable || g.compareTable;
  out.push('---- comparison ----');
  if (!comp) {
    out.push('  no comparison key. Guide keys: ' + Object.keys(g).join(','));
  } else {
    var rows = comp.rows || [];
    out.push('  rows: ' + rows.length);
    rows.forEach(function (r, ri) {
      var lbl = r.label || r.label_en || '(no label)';
      out.push('  ROW[' + ri + '] label=' + JSON.stringify(lbl) + ' | label_es=' + JSON.stringify(r.label_es || ''));
      (r.cells || []).forEach(function (c, ci) {
        var v = c.value;
        var vEs = c.value_es;
        var esLeak = isEsish(v) && !isEsish(vEs) ? ' <== ES LEAK (EN value looks ES while value_es looks clean)' : (isEsish(v) ? ' <== ES-LIKE VALUE' : '');
        out.push('     cell[' + ci + '] value=' + JSON.stringify(v) + ' | value_es=' + JSON.stringify(vEs) + esLeak);
      });
      if (r.heading || r.heading_es) {
        out.push('     heading=' + JSON.stringify(r.heading || '') + ' | heading_es=' + JSON.stringify(r.heading_es || ''));
      }
    });
  }

  out.push('---- verdicts ----');
  out = out.concat(showVerdicts(g));

  out.push('---- sections (EN headings) ----');
  out = out.concat(showSections(g, false));
});

fs.writeFileSync('C:/Users/Daniel/projects/topmusiciangear/temp/cons_patch/ssot_guides_dump.txt', out.join('\n'), 'utf8');
console.log('DONE, wrote ' + out.join('\n').length + ' chars');
