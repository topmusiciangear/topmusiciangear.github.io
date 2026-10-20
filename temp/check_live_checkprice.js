(async () => {
  for (const u of [
    'https://topmusiciangear.com/guides/best-studio-monitors-under-150.html',
    'https://topmusiciangear.com/guides/best-studio-monitors-under-150_es.html'
  ]) {
    const h = await (await fetch(u + '?cb=' + Date.now(), { headers: { 'user-agent': 'Mozilla/5.0' } })).text();
    console.log(u.split('/').pop());
    console.log('  Check Price: ' + (h.match(/>Check Price</g) || []).length + ' | Check price: ' + (h.match(/>Check price</g) || []).length + ' | Verificar precio: ' + (h.match(/>Verificar precio</g) || []).length);
    const m = h.match(/<span style="margin-left:auto;font-weight:700;color:#fff">(Check Price|Verificar precio)<\/span>/g) || [];
    console.log('  white labels: ' + m.length + ' | sample: ' + (m[0] || 'none'));
  }
})();
