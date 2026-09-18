const fs = require('fs');

const guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const prods = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));

function findClaims(obj, path, out) {
  if (Array.isArray(obj)) {
    obj.forEach((v, i) => findClaims(v, path + '[' + i + ']', out));
    return;
  }
  if (obj && typeof obj === 'object') {
    for (const k of Object.keys(obj)) findClaims(obj[k], path + '.' + k, out);
    return;
  }
  if (typeof obj === 'string') {
    claimPatterns(obj, path, out);
  }
}

function claimPatterns(s, path, out) {
  const patterns = [
    /\bI (?:tested|compared|tried|used|reviewed|owned|have been using|put .{0,20}through)\b/gi,
    /\bwe (?:tested|compared|tried|used|reviewed|owned|have been using|put .{0,20}through)\b/gi,
    /\bhands-on\b|\bhands on\b/gi,
    /\bin (?:my|our) (?:testing|tests|listening tests)\b/gi,
    /\bafter (?:testing|using|comparing)\b/gi,
    /\b(when I|what I|I 've|I've) (?:tested|tried|used|compared|owned)\b/gi,
    /(^|\s)(he probado|probé|hemos probado|probamos|he comparado|hemos comparado|comparé|lo probé|los probé|la probé|he usado|usé|lo usé|los usé|he estado probando|hemos estado probando|en mis pruebas|en nuestras pruebas|lo puse a prueba|los puse a prueba|la puse a prueba|de primera mano|testado|testeado|he revisado|hemos revisado)(\s|$|,|\.)/gi,
  ];
  for (const re of patterns) {
    let m;
    while ((m = re.exec(s)) !== null) {
      out.push({ field: path, match: m[0], ctx: s.slice(Math.max(0, m.index - 70), m.index + 90).replace(/\s+/g, ' ') });
    }
  }
}

const guideIds = ['wireless-intercom-systems', 'wireless-lapel-mics', 'best-mic-for-podcasting'];
const prodIds = [504, 505, 506, 507, 508, 509, 510, 511];

let out = [];
for (const g of guides) {
  if (guideIds.includes(g.id)) findClaims(g, 'guides.json[' + g.id + ']', out);
}
for (const p of prods) {
  if (prodIds.includes(p.id)) findClaims(p, 'products.json[id ' + p.id + ']', out);
}

console.log('TOTAL matches:', out.length);
for (const o of out) {
  console.log('--- ' + o.field + '  =>  [' + o.match + ']');
  console.log('    ...' + o.ctx + '...');
}