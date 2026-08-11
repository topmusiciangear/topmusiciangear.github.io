const fs = require('fs');
const path = require('path');

// telegram-deals.js
// Reads the public TopMusicianGear Telegram channel (t.me/s/topmusiciangear),
// parses the deal messages the bot posts every 12h (format: Title — Store —
// "Was: £X Now: £Y (-%) Buy here"), and writes them into data/manual-deals.json.
// These are real, bot-verified prices, so they merge into the deals page on
// every auto-deals run and are never overwritten.

const OUT_DIR = __dirname;
const PRODUCTS = JSON.parse(fs.readFileSync(path.join(OUT_DIR, 'data', 'products.json'), 'utf8'));
const MANUAL_FILE = path.join(OUT_DIR, 'data', 'manual-deals.json');
const CHANNEL_URL = 'https://t.me/s/topmusiciangear';

function byTitle(t) {
  const q = (t || '').toLowerCase().replace(/[^\x20-\x7E]/g, '').trim();
  return PRODUCTS.find(p => (p.title || '').toLowerCase().replace(/[^\x20-\x7E]/g, '').trim() === q)
    || PRODUCTS.find(p => (p.title || '').toLowerCase().replace(/[^\x20-\x7E]/g, '').indexOf(q) > -1)
    || PRODUCTS.find(p => q.indexOf((p.title || '').toLowerCase().replace(/[^\x20-\x7E]/g, '').trim()) > -1);
}

async function fetchChannel() {
  const r = await fetch(CHANNEL_URL, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36' } });
  if (r.status !== 200) throw new Error('Telegram channel returned ' + r.status);
  return await r.text();
}

function parseMessages(html) {
  const out = [];
  const re = /tgme_widget_message_text[^>]*>([\s\S]*?)<\/div>/g;
  let m;
  while ((m = re.exec(html)) !== null) {
    const text = m[1]
      .replace(/<[^>]+>/g, ' ')
      .replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, ' ')
      .replace(/\u00A3/g, 'GBP ')
      .replace(/\u20AC/g, 'EUR ')
      .replace(/[^\x20-\x7E]/g, ' ')
      .replace(/\s+/g, ' ').trim();
    out.push(text);
  }
  return out;
}

function parseDeal(text) {
  // Expected: "<Title> <Store> Was: £278 -> Now: £227 (-18%) Buy here ..."
  const was = (text.match(/Was:\s*(?:GBP|EUR|\$)?\s*(\d+(?:\.\d+)?)/) || [])[1];
  const now = (text.match(/Now:\s*(?:GBP|EUR|\$)?\s*(\d+(?:\.\d+)?)/) || [])[1];
  const store = /Plugin Boutique/i.test(text) ? 'pluginboutique' : (/Andertons/i.test(text) ? 'andertons' : null);
  if (!was || !now || !store) return null;
  let title = text.split('Was:')[0].replace(/\s+/, ' ').trim();
  title = title.replace(/Andertons\s*$/i, '').replace(/Plugin Boutique\s*$/i, '').trim();
  if (!title) return null;
  return { title, was: Number(was), now: Number(now), store };
}

async function main() {
  const html = await fetchChannel();
  const messages = parseMessages(html);
  console.log('telegram-deals: channel messages =', messages.length);

  const deals = [];
  const seenId = new Set();
  const seenTitle = new Set();
  for (const msg of messages) {
    if (!/Was:/.test(msg)) continue;
    const d = parseDeal(msg);
    if (!d) continue;
    if (seenTitle.has(d.title)) continue;
    seenTitle.add(d.title);

    const prod = byTitle(d.title);
    if (prod && prod.id != null && seenId.has(prod.id)) continue;
    if (prod && prod.id != null) seenId.add(prod.id);
    const sym = d.store === 'pluginboutique' ? '$' : '£';
    deals.push({
      product_id: prod ? prod.id : null,
      title: d.title,
      title_es: (prod && prod.title_es) || d.title,
      price: d.now,
      old_price: d.was,
      currency: sym,
      store: d.store,
      store_url: (prod && prod.stores && prod.stores[d.store]) || '',
      img: (prod && prod.img) || '',
      badge_en: `Save ${sym}${(d.was - d.now).toFixed((d.was - d.now) % 1 ? 1 : 0)}`,
      badge_es: `Ahorra ${sym}${(d.was - d.now).toFixed((d.was - d.now) % 1 ? 1 : 0)}`,
      desc: (prod && prod.desc) || d.title,
      desc_es: (prod && prod.desc_es) || (prod && prod.title_es) || d.title,
      date_added: new Date().toISOString().slice(0, 10),
      source: 'telegram'
    });
    console.log(`  ${d.title}: ${sym}${d.was} -> ${sym}${d.now} (${d.store})${prod ? '' : ' [NO MATCH]'}`);
  }

  fs.writeFileSync(MANUAL_FILE, JSON.stringify(deals, null, 2) + '\n', 'utf8');
  console.log('telegram-deals: wrote', deals.length, 'deals to data/manual-deals.json');
}

main().catch(e => { console.error('telegram-deals error:', e.message); process.exit(1); });
