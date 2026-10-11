const fs = require('fs');
const path = require('path');

// telegram-deals.js
// Reads the public TopMusicianGear Telegram channel (t.me/s/topmusiciangear),
// parses the deal messages the bot posts every 12h (format: Title — Store —
// "Was: £X Now: £Y (-%) Buy here"), and writes them into data/manual-deals.json.
// These are real, bot-verified prices, so they merge into the deals page on
// every auto-deals run and are never overwritten.
//
// Expiry rule (user directive): a telegram deal stays listed while the channel
// keeps posting it. If it hasn't been seen in the channel for 2+ days, the
// offer is assumed over and it is dropped automatically. Only source:
// 'telegram' entries expire; other sources are never touched. If the channel
// can't be read or parses to zero deals, the existing file is kept untouched.

const OUT_DIR = __dirname;
const PRODUCTS = JSON.parse(fs.readFileSync(path.join(OUT_DIR, 'data', 'products.json'), 'utf8'));
const MANUAL_FILE = path.join(OUT_DIR, 'data', 'manual-deals.json');
const CHANNEL_URL = 'https://t.me/s/topmusiciangear';

// BLOCKLIST: deals the user removed by hand. Even if the channel keeps
// posting them, they are never written back. Add titles here (case-insensitive
// substring match) when the user says "elimina este de ofertas".
const BLOCKLIST = ['Sennheiser e604 3-Pack', 'RCF ART 710-A MK5'];
function isBlocked(title) {
  const t = (title || '').toLowerCase();
  return BLOCKLIST.some(b => t.indexOf(b.toLowerCase()) > -1);
}

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
  const wasM = text.match(/Was:\s*(GBP|EUR|\$|£|€)?\s*(\d+(?:\.\d+)?)/);
  const nowM = text.match(/Now:\s*(GBP|EUR|\$|£|€)?\s*(\d+(?:\.\d+)?)/);
  const was = wasM && wasM[2];
  const now = nowM && nowM[2];
  const curTok = (nowM && nowM[1]) || (wasM && wasM[1]) || '';
  const store =
    /Plugin Boutique/i.test(text) ? 'pluginboutique' :
    /Andertons/i.test(text) ? 'andertons' :
    /zZounds/i.test(text) ? 'zzounds' :
    /Music ?Store/i.test(text) ? 'musicstore' :
    /Gear4Music/i.test(text) ? 'gear4music' :
    /Amazon/i.test(text) ? 'amazon' :
    /Reverb/i.test(text) ? 'reverb' : null;
  if (!was || !now || !store) return null;
  let title = text.split('Was:')[0].replace(/\s+/, ' ').trim();
  title = title.replace(/Andertons\s*$/i, '').replace(/Plugin Boutique\s*$/i, '').replace(/zZounds\s*$/i, '').replace(/Music ?Store\s*$/i, '').replace(/Gear4Music\s*$/i, '').replace(/Amazon\s*$/i, '').replace(/Reverb\s*$/i, '').trim();
  if (!title) return null;
  return { title, was: Number(was), now: Number(now), store, curTok };
}

async function main() {
  const html = await fetchChannel();
  const messages = parseMessages(html);
  console.log('telegram-deals: channel messages =', messages.length);

  const deals = [];
  const seenId = new Set();
  const seenTitle = new Set();
  const today = new Date().toISOString().slice(0, 10);
  for (const msg of messages) {
    if (!/Was:/.test(msg)) continue;
    const d = parseDeal(msg);
    if (!d) continue;
    if (isBlocked(d.title)) { console.log(`  blocked, skipped: ${d.title}`); continue; }
    if (seenTitle.has(d.title)) continue;
    seenTitle.add(d.title);

    const prod = byTitle(d.title);
    if (prod && prod.id != null && seenId.has(prod.id)) continue;
    if (prod && prod.id != null) seenId.add(prod.id);
    const sym = /^(GBP|£)$/.test(d.curTok) ? '£' : (/^(EUR|€)$/.test(d.curTok) ? '€' : (d.store === 'musicstore' ? '€' : (d.store === 'andertons' || d.store === 'gear4music' ? '£' : '$')));
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
      date_added: today,
      last_seen: today,
      source: 'telegram'
    });
    console.log(`  ${d.title}: ${sym}${d.was} -> ${sym}${d.now} (${d.store})${prod ? '' : ' [NO MATCH]'}`);
  }

  // Guard: successful fetch but zero parsed deals = probable format change,
  // not "all offers over". Keep the existing file untouched.
  if (!deals.length) {
    console.log('telegram-deals: WARNING 0 parsed deals, keeping existing file');
    return;
  }

  // Merge with previous file: refresh last_seen for re-posted deals, keep
  // first date_added. Drop source:'telegram' deals unseen for 2+ days.
  // Other sources are never expired here.
  let prev = [];
  try { prev = JSON.parse(fs.readFileSync(MANUAL_FILE, 'utf8')); } catch (e) { prev = []; }
  const prevByKey = new Map(prev.map(p => [`${p.title}||${p.store}`, p]));
  const out = deals.map(d => {
    const old = prevByKey.get(`${d.title}||${d.store}`);
    if (old) { d.date_added = old.date_added || d.date_added; }
    return d;
  });
  const cutoff = new Date(Date.parse(today + 'T00:00:00Z') - 2 * 86400000).toISOString().slice(0, 10);
  for (const p of prev) {
    if (p.source !== 'telegram') continue; // other sources: never expire here
    if (isBlocked(p.title)) { console.log(`  blocked, dropped: ${p.title}`); continue; }
    const key = `${p.title}||${p.store}`;
    if (out.some(d => `${d.title}||${d.store}` === key)) continue; // re-posted
    if ((p.last_seen || p.date_added || today) >= cutoff) out.push(p); // grace: <2 days unseen
    else console.log(`  expired, dropped: ${p.title} (${p.store}, last seen ${p.last_seen || p.date_added || '?'})`);
  }

  fs.writeFileSync(MANUAL_FILE, JSON.stringify(out, null, 2) + '\n', 'utf8');
  console.log('telegram-deals: wrote', out.length, 'deals to data/manual-deals.json');
}

main().catch(e => { console.error('telegram-deals error:', e.message); process.exit(1); });
