const fs = require('fs');
const prods = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));

const shops = ['gear4music', 'musicstore', 'amazon', 'andertons', 'zzounds', 'reverb', 'pluginboutique', 'official'];
const stat = {};
for (const s of shops) stat[s] = { count: 0, awin: 0, direct: 0, weird: [] };

for (const p of prods) {
  for (const [shop, url] of Object.entries(p.stores || {})) {
    if (!stat[shop]) stat[shop] = { count: 0, awin: 0, direct: 0, weird: [] };
    stat[shop].count++;
    if (/awin1\.com/.test(url)) stat[shop].awin++;
    else stat[shop].direct++;

    const u = decodeURIComponent(url);
    const flags = [];
    if (shop === 'gear4music' && !/awin1/.test(url)) {
      if (/gear4music\.com\/us\//.test(u)) flags.push('US-LOCALE');
      if (!/awinmid=1117/.test(url)) flags.push('NO-AWIN');
    }
    if (shop === 'musicstore') {
      if (!/awinmid=63816/.test(url)) flags.push('NO-AWIN');
      if (!/en_OE\/EUR/.test(u)) flags.push('LOCALE!=en_OE/EUR');
    }
    if (shop === 'andertons') {
      if (!/irgwc=1/.test(url) && !/awin1/.test(url)) flags.push('NO-AFFILIATE');
    }
    if (shop === 'amazon' && /amazon\.(?!com\b)/i.test(u)) flags.push('MARKETPLACE=' + new URL(u).hostname);
    if (shop === 'zzounds' && !/a--925521/.test(url)) flags.push('NO-CJ-TAG'); else if (shop === 'zzounds' && !/anrdoezrs\.net/.test(url) && !/a--925521/.test(url)) flags.push('MISSING');
    if (shop === 'pluginboutique' && !/\?a_aid=6a01e859cbe1a/.test(url)) flags.push('NO-PB-AFFILIATE');
    if (shop === 'reverb' && !/awin1/.test(url) && !/irgwc/.test(url)) flags.push('AFFILIATE?');
    if (flags.length) stat[shop].weird.push(`[${p.id}] ${flags.join(',')} -> ${u.slice(0, 130)}`);
  }
}

for (const s of shops) {
  const st = stat[s];
  console.log(`${s}: total=${st.count} awin=${st.awin} direct=${st.direct} weird=${st.weird.length}`);
  if (st.weird.length) {
    for (const w of st.weird.slice(0, 60)) console.log(`   ${w}`);
    if (st.weird.length > 60) console.log(`   ... +${st.weird.length - 60}`);
  }
}