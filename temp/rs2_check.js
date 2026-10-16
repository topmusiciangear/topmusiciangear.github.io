fetch('https://r2.gear4music.com/media/86/868135/1200/preview.jpg', { method: 'HEAD' }).then(r => console.log('foto: ' + r.status + ' | ' + r.headers.get('content-type'))).catch(e => console.log('foto ERROR: ' + e.message));
fetch('https://www.gear4music.com/Recording-and-Computers/Acon-Restoration-Suite-2/4WGO', { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }).then(async r => {
  const t = await r.text();
  const m = t.match(/£\s?\d{1,4}[\.,]\d{2}/g);
  console.log('G4M: ' + r.status + ' | precios: ' + JSON.stringify([...new Set(m || [])].slice(0, 10)));
}).catch(e => console.log('G4M ERROR: ' + e.message));
fetch('https://www.zzounds.com/item--ACNRESTORATIONST', { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }).then(async r => {
  const t = await r.text();
  console.log('zZounds: ' + r.status + ' | len ' + t.length + ' | title: ' + (t.match(/<title>([^<]{0,120})/) || [])[1]);
}).catch(e => console.log('zZ ERROR: ' + e.message));
