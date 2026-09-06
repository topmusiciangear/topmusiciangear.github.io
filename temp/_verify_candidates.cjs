const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const PRODUCTS = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'products.json'), 'utf8'));
const byId = {};
for (const p of PRODUCTS) byId[p.id] = p;

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36';
const wait = ms => new Promise(r => setTimeout(r, ms));

function parsePrice(html) {
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  for (const b of blocks) {
    try {
      const o = JSON.parse(b[1]);
      if (o && o['@type'] && typeof o['@type'] === 'string' && /Product/i.test(o['@type']) && o.offers) {
        const offer = Array.isArray(o.offers) ? o.offers[0] : o.offers;
        const price = Number(offer && (offer.price !== undefined ? offer.price : offer.highPrice));
        if (isFinite(price) && price > 0) return { price, currency: offer.priceCurrency || 'GBP', title: o.name || '' };
      }
    } catch (e) { /* skip */ }
  }
  return null;
}

// candidate URLs from subagents (id -> candidate url)
const CANDIDATES = {
  6: 'https://www.andertons.co.uk/fender-american-professional-ii-stratocaster-mystic-surf-green-maple-fingerboard/',
  143: 'https://www.andertons.co.uk/moog-subsequent-37-paraphonic-analog-synth',
  176: 'https://www.andertons.co.uk/moog-muse-8voice-analog-bitimbral-polyphonic-synth/',
  352: 'https://www.andertons.co.uk/gretsch-jim-dandy-parlor-wpg-rxb',
  440: 'https://www.andertons.co.uk/fender-american-ultra-ii-stratocaster-maple-fingerboard-avalanche/',
  444: 'https://www.andertons.co.uk/fender-player-ii-telecaster-maple-fingerboard-mocha/',
  149: 'https://www.andertons.co.uk/yamaha-mg16xu-16-channel-usb-mixing-desk-with-fx/',
  333: 'https://www.andertons.co.uk/allen-heath-zedi10fx-hybrid-compact-mixer-usb-interface/',
  334: 'https://www.andertons.co.uk/ssl-big-six/',
  414: 'https://www.andertons.co.uk/allen-heath-sq-6-digital-mixer/',
  332: 'https://www.andertons.co.uk/tascam-model-12-10-channel-analogue-mixer-with-12-track-digital-recorder-usb-interface/',
  400: 'https://www.andertons.co.uk/mackie-control-universal-pro/',
  220: 'https://www.andertons.co.uk/Neumann-KH120-II-Active-Studio-Monitor-EACH/',
  329: 'https://www.andertons.co.uk/rode-procaster-dynamic-microphone-prodeprocaster/',
  340: 'https://www.andertons.co.uk/rode-ntg5-shotgun-mic-inc-ws10-windshield/',
  342: 'https://www.andertons.co.uk/sennheiser-mke600-shotgun-condensor-mic-for-cameras/',
  339: 'https://www.andertons.co.uk/sennheiser-mkh-416-p48u3-shotgun-microphone/',
  345: 'https://www.andertons.co.uk/Rode-Microphones-VMNTG-VideoMic-NTG-OnCamera-Shotgun-Microphone/',
  231: 'https://www.andertons.co.uk/audix-om7-dynamic-vocal-mic/',
  364: 'https://www.andertons.co.uk/beyerdynamic-m160-double-ribbon-dynamic-microphone/',
  240: 'https://www.andertons.co.uk/roland-bridge-cast-x-dual-bus-streaming-mixer-and-video-capture/',
  244: 'https://www.andertons.co.uk/rode-streamer-x-audio-interface-video-capture-card/',
  223: 'https://www.andertons.co.uk/focal-trio6-st6-studio-monitor-3-way-speaker-with-1-tweeter-a-5-woofer-8-subwoofer/',
  191: 'https://www.andertons.co.uk/krk-S104-10-active-sub-240v/',
  20: 'https://www.andertons.co.uk/krk-rokit-rp7-g5-in-black-monitor-speaker-7-bass-driver/',
  294: 'https://www.andertons.co.uk/Positive-Grid-Spark-2-50w-Practice-Amp/',
  302: 'https://www.andertons.co.uk/iloud-micro-monitor-pro--single-mic-not-included/',
  325: 'https://www.andertons.co.uk/m-audio-hammer-88-88-key-hammer-action-usb-midi-controller/',
  357: 'https://www.andertons.co.uk/gretsch-g5021e-rancher-penguin-parlor-acoustic-electric-black/',
  361: 'https://www.andertons.co.uk/fender-highway-series-parlor-rosewood-fingerboard-all-mahogany/',
  362: 'https://www.andertons.co.uk/sennheiser-xsw-iem-set-e-823200-831800-mhz/',
  443: 'https://www.andertons.co.uk/electro-harmonix-nano-small-stone-phaser-pedal/',
  112: 'https://www.andertons.co.uk/fl-studio-20-producer-edition-esd/',
  122: 'https://www.andertons.co.uk/izotope-rx-12-advanced/',
  377: 'https://www.andertons.co.uk/baby-audio-transit-2-motion-effects-plugin/',
  381: 'https://www.andertons.co.uk/izotope-neutron-5-standard--esd/',
  386: 'https://www.andertons.co.uk/izotope-trash-creative-distortion-plugin/',
  125: 'https://www.andertons.co.uk/fender-player-telecaster-butterscotch-blonde-maple-fretboard/',
  224: 'https://www.andertons.co.uk/focal-twin-6-st6-studio-monitors/',
  310: 'https://www.andertons.co.uk/squier-affinity-stratocaster-black',
  311: 'https://www.andertons.co.uk/squier-classic-vibe-50s-stratocaster-in-black'
};

function norm(s) {
  return String(s || '').toLowerCase().replace(/[^a-z0-9]/g, ' ');
}
function wordsOverlap(a, b) {
  const aw = norm(a).split(' ').filter(w => w.length > 3);
  const bw = new Set(norm(b).split(' ').filter(w => w.length > 3));
  if (!aw.length) return 0;
  return aw.filter(w => bw.has(w)).length / aw.length;
}

(async () => {
  const ids = Object.keys(CANDIDATES);
  const out = [];
  const CONC = 6;
  let idx = 0;
  async function worker() {
    while (idx < ids.length) {
      const id = Number(ids[idx++]);
      const url = CANDIDATES[id];
      const p = byId[id];
      let status = 0, parsed = null, err = null;
      try {
        const ctrl = AbortSignal.timeout ? AbortSignal.timeout(20000) : undefined;
        const r = await fetch(url, { headers: { 'User-Agent': UA, 'Accept-Language': 'en-GB,en;q=0.9' }, redirect: 'follow', signal: ctrl });
        status = r.status;
        if (status === 200) parsed = parsePrice(await r.text());
      } catch (e) { err = e.message; }
      const overlap = parsed ? wordsOverlap(p.title, parsed.title) : 0;
      const ok = status === 200 && parsed && overlap >= 0.5;
      out.push({ id, title: p.title, url, status, ok, overlap: +overlap.toFixed(2), live: parsed, err });
      console.log(`${ok ? 'OK  ' : 'NO  '} ${id}\t${p.title}\t${status}\tovr=${overlap.toFixed(2)}\t${parsed ? parsed.title + ' £' + parsed.price : err || 'no-ld'}\t${url}`);
      await wait(150);
    }
  }
  await Promise.all(Array.from({ length: CONC }, worker));
  fs.writeFileSync(path.join(__dirname, '_verify_candidates.json'), JSON.stringify(out, null, 1), 'utf8');
  const okN = out.filter(o => o.ok).length;
  console.log('\nVERIFIED OK:', okN, '/', out.length, '-> saved temp/_verify_candidates.json');
})();