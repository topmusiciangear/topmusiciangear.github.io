const fs = require('fs');

const GUIDES = 'data/guides.json';
const PATCH_FILE = process.argv[2];
if (!PATCH_FILE) { console.error('usage: node tools/apply-guide-patch.js <patch.json>'); process.exit(1); }

const patch = JSON.parse(fs.readFileSync(PATCH_FILE, 'utf8'));
const guides = JSON.parse(fs.readFileSync(GUIDES, 'utf8'));

const report = { applied: 0, missingGuides: [], vpcSkipped: [], compSkipped: [] };

for (const [slug, body] of Object.entries(patch.guides || {})) {
  const g = guides.find(x => x.id === slug);
  if (!g) { report.missingGuides.push(slug); continue; }

  if (body.verdictProsCons) {
    const ok = Array.isArray(body.verdictProsCons) &&
      body.verdictProsCons.every(p =>
        p && p.name && Array.isArray(p.pros) && Array.isArray(p.pros_es) &&
        Array.isArray(p.cons) && Array.isArray(p.cons_es));
    if (!ok) { report.vpcSkipped.push(slug + ' (malformed)'); }
    else { g.verdictProsCons = body.verdictProsCons; }
  }
  if (body.comparison) {
    const ok = body.comparison.rows && Array.isArray(body.comparison.rows) &&
      body.comparison.rows.every(r => r && r.label && 'value1' in r && 'value2' in r);
    if (!ok) { report.compSkipped.push(slug + ' (malformed)'); }
    else { g.comparison = body.comparison; }
  }
  report.applied++;
}

fs.writeFileSync(GUIDES, JSON.stringify(guides, null, 2));
console.log(JSON.stringify(report, null, 2));