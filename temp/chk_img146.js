fetch('https://m.media-amazon.com/images/I/71VocqX4AfL._AC_SL1500_.jpg', { method: 'HEAD', signal: AbortSignal.timeout(30000) })
  .then(r => console.log('IMG HTTP', r.status, r.headers.get('content-type')))
  .catch(e => console.log('IMG ERR', e.message));
