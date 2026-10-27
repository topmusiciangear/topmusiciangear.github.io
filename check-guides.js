const fs = require('fs');
const path = require('path');
const dir = __dirname;
const OVERRIDES_VERSION = '59';
let exitCode = 0;

function fail(msg){ console.error('CHECK FAIL: '+msg); exitCode=1; }

const guidesDir = path.join(dir, 'guides');
const files = fs.readdirSync(guidesDir).filter(f=>f.endsWith('.html'));

let missingLink = 0;
let inlineQuickfacts = 0;
let affLeak = 0;

files.forEach(f=>{
  const txt = fs.readFileSync(path.join(guidesDir,f),'utf8');
  if (!txt.includes(`/css/overrides.css?v=${OVERRIDES_VERSION}`)){
    missingLink++; fail(`Missing overrides link in ${f}`);
  }
  // Detect inline <style> with .guide-section-quickfacts definition
  if (txt.includes('...guide-section-quickfacts')){
    inlineQuickfacts++; fail(`Placeholder ...guide-section-quickfacts found in ${f}`);
  }
  // Affiliate defer: should have data-aff, not raw href to redirect networks
  // Only flag deferrable redirects (with u/ued/url param). Nav links like pxf.io/Gb3Q7k are allowed.
  // Awin links are excluded from strict check because clean domains vary (Hollyland, .ie) and defere-aff skips them.
  if (/href="https:\/\/andertonsmusiccompany\.pxf\.io\/[^"]*\?[^"]*u=/.test(txt) ||
      /href="https:\/\/www\.anrdoezrs\.net\/click-[^"]*\?[^"]*url=/.test(txt)){
    affLeak++; fail(`Affiliate redirect href not deferred in ${f}`);
  }
});

console.log(`Checked ${files.length} guides. Missing link: ${missingLink}, inline quickfacts: ${inlineQuickfacts}, aff leaks: ${affLeak}`);
if (exitCode===0) console.log('All checks passed.');
process.exit(exitCode);
