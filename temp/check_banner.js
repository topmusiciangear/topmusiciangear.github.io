fetch('https://banners.pluginboutique.com/ykauphxwp8x50g4rcc1pq5ktop6i', { method: 'HEAD' })
  .then(r => console.log('banner status: ' + r.status + ' | type: ' + r.headers.get('content-type')))
  .catch(e => console.log('ERROR: ' + e.message));
