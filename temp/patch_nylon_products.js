// Patch the 10 nylon-guitar products in data/products.json:
// remove placeholder/fake store URLs, fix real ones, add verified Andertons link,
// and correct factual copy (descriptions) to manufacturer specs.
const fs = require('fs');
const FILE = 'data/products.json';
let raw = fs.readFileSync(FILE, 'utf8');
const EOL = '\r\n';

function region(id) {
  const startMark = `  {${EOL}    "id": ${id},`;
  const start = raw.indexOf(startMark);
  if (start < 0) throw new Error(`start not found for ${id}`);
  const nextMark = `${EOL}  {${EOL}    "id": `;
  const next = raw.indexOf(nextMark, start + 10);
  const end = next < 0 ? raw.length : next;
  return { start, end, text: raw.slice(start, end) };
}

function edit(id, fn) {
  const r = region(id);
  const before = r.text;
  const after = fn(r.text);
  if (after === before) throw new Error(`no change applied for ${id}`);
  raw = raw.slice(0, r.start) + after + raw.slice(r.end);
}

function del(text, line, id) {
  const withEol = line + EOL;
  const n = text.split(withEol).length - 1;
  if (n !== 1) throw new Error(`[${id}] expected 1 <${line.slice(0, 60)}...> got ${n}`);
  return text.split(withEol).join('');
}

function set(text, oldLine, newLine, id) {
  const n = text.split(oldLine).length - 1;
  if (n !== 1) throw new Error(`[${id}] expected 1 <${oldLine.slice(0, 70)}> got ${n}`);
  return text.split(oldLine).join(newLine);
}

// ---------- 1058 Cordoba C5 ----------
edit(1058, (t) => {
  t = set(t, '"zzounds": "https://www.zzounds.com/item--CORC5",',
    '"zzounds": "https://www.zzounds.com/item--CODC5",', 1058);
  t = del(t, '      "musicstore": "https://www.awin1.com/cread.php?awinmid=63816&awinaffid=2891111&ued=https%3A%2F%2Fwww.musicstore.com%2Fen_OE%2FEUR%2FCordoba-C5%2Fart-GIT0001234-000",', 1058);
  return t;
});

// ---------- 1059 Ortega R121 ----------
edit(1059, (t) => {
  t = set(t,
    '"musicstore": "https://www.awin1.com/cread.php?awinmid=63816&awinaffid=2891111&ued=https%3A%2F%2Fwww.musicstore.com%2Fen_OE%2FEUR%2FOrtega-R121%2Fart-GIT0005678-000",',
    '"musicstore": "https://www.musicstore.com/en_OE/EUR/Ortega-R121-NT/art-GIT0014064-000",', 1059);
  t = set(t, 'The Ortega R121 is a budget-friendly pack with a solid spruce top and mahogany back and sides, plus a deluxe gig bag.',
    'The Ortega R121 is a budget-friendly pack with a laminated spruce top and mahogany back and sides, plus a deluxe gig bag.', 1059);
  t = set(t, 'La Ortega R121 es un pack económico con tapa sólida de abeto y fondo y aros de caoba, más una funda rígida de lujo.',
    'La Ortega R121 es un pack económico con tapa laminada de abeto y fondo y aros de caoba, más una funda rígida de lujo.', 1059);
  return t;
});

// ---------- 1060 Taylor Academy 12e-N ----------
edit(1060, (t) => {
  t = set(t,
    '"musicstore": "https://www.musicstore.com/en_OE/EUR/Taylor-Academy-12e-N/art-GIT0012346-000",',
    '"musicstore": "https://www.musicstore.com/en_OE/EUR/Taylor-Academy-12e-N/art-GIT0040877-000",', 1060);
  return t;
});

// ---------- 1061 Yamaha CG122MSH ----------
edit(1061, (t) => {
  t = del(t, '      "amazon": "https://www.amazon.com/dp/B07XXXXXX",', 1061);
  t = del(t, '      "musicstore": "https://www.awin1.com/cread.php?awinmid=63816&awinaffid=2891111&ued=https%3A%2F%2Fwww.musicstore.com%2Fen_OE%2FEUR%2FYamaha-CG122MSH%2Fart-GIT0012345-000",', 1061);
  t = set(t, 'The CG122MSH pairs a solid European spruce top with rosewood back and sides for clear concert projection under €250.',
    'The CG122MSH pairs a solid spruce top with nato back and sides for clear projection that carries across a room.', 1061);
  t = set(t, 'La CG122MSH combina una tapa sólida de abeto europeo con fondo y aros de palisandro para una proyección de concierto clara por menos de 250 €.',
    'La CG122MSH combina una tapa maciza de abeto con fondo y aros de nato para una proyección clara que se oye en toda la sala.', 1061);
  return t;
});

// ---------- 1062 Ibanez GA35TCE ----------
edit(1062, (t) => {
  t = del(t, '      "amazon": "https://www.amazon.com/dp/B00XXXXXX",', 1062);
  t = del(t, '      "musicstore": "https://www.awin1.com/cread.php?awinmid=63816&awinaffid=2891111&ued=https%3A%2F%2Fwww.musicstore.com%2Fen_OE%2FEUR%2FIbanez-GA35TCE%2Fart-GIT0098765-000",', 1062);
  t = set(t, 'Spruce top and mahogany back and sides with a 648 mm scale and 46 mm nut width',
    'Spruce top and sapele back and sides with a 648 mm scale and 46 mm nut width', 1062);
  t = set(t, 'Tapa de abeto y fondo y aros de caoba con escala de 648 mm y cejuela de 46 mm',
    'Tapa de abeto y fondo y aros de sapele con escala de 648 mm y cejuela de 46 mm', 1062);
  return t;
});

// ---------- 1063 Cordoba Protege C1 3/4 ----------
edit(1063, (t) => {
  t = del(t, '      "amazon": "https://www.amazon.com/dp/B07XXXXXX",', 1063);
  return t;
});

// ---------- 1064 Admira Alba 4/4 ----------
edit(1064, (t) => {
  t = del(t, '      "amazon": "https://www.amazon.com/dp/B0XXXXXXX",', 1064);
  t = del(t, '      "musicstore": "https://www.awin1.com/cread.php?awinmid=63816&awinaffid=2891111&ued=https%3A%2F%2Fwww.musicstore.com%2Fen_OE%2FEUR%2FAdmira-Alba%2Fart-GIT0087654-000",', 1064);
  t = set(t, '      "reverb": "https://reverb.com/marketplace?query=Admira%20Alba%204/4%20Classical%20Guitar"',
    '      "andertons": "https://www.andertons.co.uk/admira-alba-full-size-classical-guitar/",' + EOL +
    '      "reverb": "https://reverb.com/marketplace?query=Admira%20Alba%204/4%20Classical%20Guitar"', 1064);
  return t;
});

// ---------- 1065 Takamine GC1CE ----------
edit(1065, (t) => {
  t = del(t, '      "amazon": "https://www.amazon.com/dp/B0XXXXXXX",', 1065);
  return t;
});

fs.writeFileSync(FILE, raw, 'utf8');

// ----- validate -----
const arr = JSON.parse(fs.readFileSync(FILE, 'utf8'));
const ids = [459, 553, 1058, 1059, 1060, 1061, 1062, 1063, 1064, 1065];
for (const id of ids) {
  const p = arr.find(x => x.id === id);
  if (!p) throw new Error('missing product ' + id);
  console.log(id, p.brand, '|', Object.keys(p.stores).join(','));
}
const s = fs.readFileSync(FILE, 'utf8');
console.log('placeholder XXXXXX left:', (s.match(/X{5,}/g) || []).length);
for (const fake of ['art-GIT0012345', 'art-GIT0012346', 'art-GIT0087654', 'art-GIT0098765', 'art-GIT0001234', 'art-GIT0005678']) {
  console.log(fake, '->', s.split(fake).length - 1);
}
