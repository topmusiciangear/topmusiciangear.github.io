fetch('https://r.jina.ai/https://www.amazon.com/s?k=Korg+B2SP+digital+piano', { headers: { 'x-respond-with': 'text' }, signal: AbortSignal.timeout(70000) })
  .then(r => r.text())
  .then(t => {
    const asin = [...new Set((t.match(/\/dp\/[A-Z0-9]{10}/g) || []))];
    console.log('ASINs:', asin.slice(0, 12).join(' '));
    const lines = t.split('\n').filter(l => /Korg/i.test(l)).slice(0, 12);
    console.log(lines.join('\n---\n'));
  })
  .catch(e => console.log('ERR', e.message));
