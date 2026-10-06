fetch('https://r2.gear4music.com/media/84/845942/1200/preview.jpg', { method: 'HEAD', signal: AbortSignal.timeout(30000) })
  .then(r => console.log('HTTP', r.status, r.headers.get('content-type')))
  .catch(e => console.log('ERR', e.message));
