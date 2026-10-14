const fs = require('fs');

const guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const byId = {};
guides.forEach(g => { byId[g.id] = g; });

const SEV = { critical: 0, high: 1, medium: 2, low: 3 };

function getByPath(g, path) {
  const depth0 = /^([A-Za-z]+)(?:\[(\d+)\])?/.exec(path);
  if (!depth0) return null;
  const head = depth0[1];
  let node = g[head];
  if (depth0[2] !== undefined && node !== undefined) node = node[Number(depth0[2])];
  const rest = path.slice(depth0[0].length);
  if (!rest) return node;
  const tail = rest.replace(/^\./, '');
  const parts = [...tail.matchAll(/([A-Za-z_]+)|\[(\d+)\]/g)];
  for (const [m, name, idx] of parts) {
    if (name !== undefined) node = node ? node[name] : undefined;
    else if (idx !== undefined) node = node ? node[Number(idx)] : undefined;
  }
  return node;
}

let all = [];
for (let i = 1; i <= 6; i++) {
  const f = `temp/deepaudit/findings${i}.json`;
  const data = JSON.parse(fs.readFileSync(f, 'utf8'));
  for (const entry of data) {
    const rec = { chunk: i, id: entry.id, status: entry.status || 'ok', issues: (entry.issues || []).map(iss => ({ ...iss })) };
    all.push(rec);
  }
}

let issues = [];
for (const rec of all) {
  if (!rec.issues.length) continue;
  for (const iss of rec.issues) {
    const g = byId[rec.id];
    let verified = null;
    if (g && iss.path && iss.snippet) {
      const val = getByPath(g, iss.path);
      if (typeof val === 'string' && val.includes(iss.snippet)) verified = true;
      else verified = false;
    }
    issues.push({ chunk: rec.chunk, id: rec.id, severity: iss.severity, type: iss.type, path: iss.path, snippet: iss.snippet, note: iss.note, fix: iss.fix, verified });
  }
}

const order = (a, b) => { const s = SEV[a.severity] - SEV[b.severity]; if (s) return s; if (a.id !== b.id) return a.id < b.id ? -1 : 1; return 0; };
issues.sort(order);

let md = `# GUILD AUDIT REPORT (merge of 6 chunks)\n\nTotal issues: ${issues.length}\n`;
const sv = {};
const tp = {};
issues.forEach(i => { sv[i.severity] = (sv[i.severity] || 0) + 1; const t = String(i.type); tp[t] = (tp[t] || 0) + 1; });
md += '## By severity\n' + JSON.stringify(sv, null, 1) + '\n';
md += '## By type\n' + JSON.stringify(tp, null, 1) + '\n';
md += `## Verified (snippet found verbatim at path in guides.json): ${issues.filter(i => i.verified === true).length} | NOT verified: ${issues.filter(i => i.verified === false).length}\n\n`;

const byGuide = {};
issues.forEach(i => { (byGuide[i.id] = byGuide[i.id] || []).push(i); });

for (const gid of Object.keys(byGuide)) {
  md += `---\n## ${gid}\n`;
  for (const i of byGuide[gid]) {
    md += `\n[${i.severity}/${i.type}] @ ${i.path} (chunk${i.chunk}) ${i.verified === false ? '[SNIPPET NOT FOUND]' : ''}\n`;
    md += `> "${i.snippet}"\n`;
    if (i.note) md += `NOTE: ${i.note}\n`;
    if (i.fix) md += `FIX: ${i.fix}\n`;
  }
}

fs.writeFileSync('temp/deepaudit/report.md', md, 'utf8');
console.log('issues:', issues.length, '| verified:', issues.filter(i => i.verified === true).length, '| not-verified:', issues.filter(i => i.verified === false).length);
const gcount = Object.keys(byGuide).length;
console.log('guides with issues:', gcount);
const okcount = all.filter(r => r.status === 'ok' || !r.issues.length).length;
console.log('guides clean:', okcount, 'of', all.length);