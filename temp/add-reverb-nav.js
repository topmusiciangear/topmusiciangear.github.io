// Insert a Reverb nav-dd-link after the Amazon "New Releases" dropdown entry
// in static pages, preserving each dropdown's indentation and line endings.
// Uses the deferred affiliate pattern (data-aff awin + clean reverb href) like
// neighboring entries.
const fs = require('fs');

const files = [
  'index.html', 'es/index.html',
  'terms.html', 'es/terms.html',
  'privacy-policy.html', 'es/privacy-policy.html',
  'cookie-policy.html', 'es/cookie-policy.html',
  'contact.html', 'es/contact.html',
  'affiliate-disclosure.html', 'es/affiliate-disclosure.html'
];

const REVERB_LINK_BODY =
  '<a class="nav-dd-link" data-aff="https://www.awin1.com/cread.php?awinmid=67144&amp;awinaffid=2891111&amp;ued=https%3A%2F%2Freverb.com%2Fcollection%2Fnew-gear-releases-1" href="https://reverb.com/collection/new-gear-releases-1" target="_blank" rel="noopener noreferrer sponsored"><span class="nav-dd-link-icon" style="font-weight:900;font-size:13px;line-height:1;display:inline-flex;align-items:center;justify-content:center;background:#d6562b;color:#fff;border-radius:3px;">R</span>Reverb</a>';

const AMAZON_RE = /^(\s*)<a class="nav-dd-link" href="https:\/\/www\.amazon\.com\/gp\/new-releases\/musical-instruments\?tag=topmusicg-20".*?Amazon<\/a>\r?$/;

for (const p of files) {
  if (!fs.existsSync(p)) { console.log('SKIP (missing): ' + p); continue; }
  const raw = fs.readFileSync(p, 'utf8');
  const crlf = raw.indexOf('\r\n') !== -1;
  const eol = crlf ? '\r\n' : '\n';
  if (raw.indexOf('awinmid=67144&amp;awinaffid=2891111&amp;ued=https%3A%2F%2Freverb.com%2Fcollection%2Fnew-gear-releases-1') !== -1) {
    console.log('SKIP (already has reverb): ' + p);
    continue;
  }
  const lines = raw.split(eol);
  let added = 0;
  const out = lines.map((line) => {
    const m = line.match(AMAZON_RE);
    if (m) {
      added++;
      return line + eol + m[1] + REVERB_LINK_BODY;
    }
    return line;
  });
  if (added === 0) { console.log('WARN no amazon nav link in: ' + p); continue; }
  fs.writeFileSync(p, out.join(eol));
  console.log(p + ' (' + (crlf ? 'CRLF' : 'LF') + '): +' + added + ' reverb link(s)');
}