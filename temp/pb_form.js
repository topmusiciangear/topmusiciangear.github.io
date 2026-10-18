(async () => {
  const url = 'https://www.pluginboutique.com/product/2-Effects/21-Channel-Strip/11503-UAD-Sound-City-Studios-Plugin';
  const resp = await fetch(url, { headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'
  }});
  const html = await resp.text();

  // Buscar el form que contiene el country picker
  const idx = html.indexOf('data-country-picker-target="item"');
  console.log('primer item del picker @' + idx);

  // retroceder hasta el <form ...>
  const antes = html.slice(Math.max(0, idx - 6000), idx);
  const forms = antes.match(/<form[\s\S]{0,2000}?>/g);
  console.log('\nforms encontrados antes del picker: ' + (forms ? forms.length : 0));
  if (forms) forms.forEach((f, i) => console.log('\n--- form ' + i + ' ---\n' + f.slice(0, 1200)));

  // inputs del form
  const inputs = antes.match(/<input[^>]*>/g) || [];
  console.log('\ninputs cerca del picker: ' + inputs.length);
  inputs.slice(-15).forEach(x => console.log('  ' + x));

  // ver el item de UK completo
  const uk = html.indexOf('United Kingdom');
  console.log('\n=== item UK ===\n' + html.slice(uk - 700, uk + 300).replace(/\s+/g, ' '));
})();