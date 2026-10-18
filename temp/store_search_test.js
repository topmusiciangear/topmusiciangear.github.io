const H = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
  'Accept-Language': 'en-GB,en;q=0.9'
};
const ip = await (await fetch('https://ipinfo.io/json', { headers: { 'User-Agent': 'Mozilla/5.0' } })).json();
console.log('IP: ' + ip.ip + ' ' + ip.country);

const pruebas = [
  ['G4M Eris 3.5', 'https://www.gear4music.com/search/?str_search_phrase=' + encodeURIComponent('Eris 3.5')],
  ['G4M CR3-X', 'https://www.gear4music.com/search/?str_search_phrase=' + encodeURIComponent('Mackie CR3')],
  ['G4M MR4', 'https://www.gear4music.com/search/?str_search_phrase=' + encodeURIComponent('Edifier MR4')],
  ['G4M Elevate 4', 'https://www.gear4music.com/search/?str_search_phrase=' + encodeURIComponent('Alesis Elevate')],
  ['Andertons CR3-X', 'https://www.andertons.co.uk/search.php?search_query=' + encodeURIComponent('Mackie CR3')],
  ['Andertons MR4', 'https://www.andertons.co.uk/search.php?search_query=' + encodeURIComponent('Edifier MR4')]
];

for (const [etiqueta, url] of pruebas) {
  try {
    const r = await fetch(url, { headers: H, redirect: 'follow' });
    const html = await r.text();
    const challenge = /Just a moment|cf-browser-verification/i.test(html.slice(0, 3000));
    const titulo = (html.match(/<title>([^<]{0,70})/) || [])[1] || '';
    const sinRes = /No results found/i.test(html);
    console.log(etiqueta.padEnd(18) + ' status=' + r.status + ' challenge=' + challenge + ' sinRes=' + sinRes + ' | ' + titulo.trim().slice(0, 46));
  } catch (e) {
    console.log(etiqueta.padEnd(18) + ' ERROR ' + e.message);
  }
}