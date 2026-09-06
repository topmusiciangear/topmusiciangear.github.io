fetch('https://www.andertons.co.uk/sitemap.php')
  .then(r => r.text())
  .then(t => {
    console.log('len', t.length);
    const hrefs = [...t.matchAll(/href="(?:\/|https?:\/\/www\.andertons\.co\.uk\/)([a-z0-9][a-z0-9-]+)\/"|href="(?:\/|https?:\/\/www\.andertons\.co\.uk\/)([a-z0-9][a-z0-9-]+)"/g)]
      .map(m => m[1] || m[2]);
    const set = [...new Set(hrefs)];
    console.log('unique slugs', set.length);
    console.log(set.slice(0, 80).join('\n'));
  }).catch(e => console.log('ERR', e.message));