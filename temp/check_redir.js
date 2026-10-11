var UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36';
fetch('https://www.andertons.co.uk/behringer-x-touch-one-universal-control-surface/', { headers: { 'User-Agent': UA }, redirect: 'manual' }).then(async function (r) {
  console.log('status: ' + r.status + ' location: ' + r.headers.get('location'));
});
