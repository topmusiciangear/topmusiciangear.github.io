const https = require('https');
https.get('https://topmusiciangear.com/', r => {
  let d = '';
  r.on('data', c => d += c);
  r.on('end', () => {
    console.log('status', r.statusCode);
    console.log('bytes', d.length);
    console.log('has <title>', d.includes('<title>'));
    console.log('has <body', d.includes('<body'));
    console.log('has #mainContent', d.includes('mainContent'));
    const i = d.indexOf('tmgLangScrollEarly');
    console.log('scroll early script present', i > -1);
  });
}).on('error', e => console.log('ERR', e.message));
