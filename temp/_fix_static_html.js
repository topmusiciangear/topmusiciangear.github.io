var fs = require('fs');

var NAV_OLD = 'https://www.andertons.co.uk/browse/new/?irgwc=1&amp;irpid=7292297';
var NAV_NEW = 'https://andertonsmusiccompany.pxf.io/c/7292297/3326127/43829?u=https%3A%2F%2Fwww.andertons.co.uk%2Fbrowse%2Fnew%2F';

var LOGO_OLD = 'https://www.andertons.co.uk/?irgwc=1&irpid=7292297';
var LOGO_NEW = 'https://andertonsmusiccompany.pxf.io/c/7292297/3326127/43829?u=https%3A%2F%2Fwww.andertons.co.uk%2F';

var files = [
  'index.html', 'es/index.html',
  'privacy-policy.html', 'terms.html', 'affiliate-disclosure.html', 'contact.html', 'cookie-policy.html',
  'es/privacy-policy.html', 'es/terms.html', 'es/affiliate-disclosure.html', 'es/contact.html', 'es/cookie-policy.html'
];

files.forEach(function (f) {
  var p = 'file://' + __dirname + '/../' + f;
  var s = fs.readFileSync(__dirname + '/../' + f, 'utf8');
  var navN = s.split(NAV_OLD).length - 1;
  var logoN = s.split(LOGO_OLD).length - 1;
  if (navN) s = s.split(NAV_OLD).join(NAV_NEW);
  if (logoN) s = s.split(LOGO_OLD).join(LOGO_NEW);
  if (navN || logoN) {
    fs.writeFileSync(__dirname + '/../' + f, s, 'utf8');
    console.log(f + ': nav x' + navN + ', logo x' + logoN);
  } else {
    console.log(f + ': no changes');
  }
  var leftover = s.match(/andertons\.co\.uk\/[^"']*irgwc[^"']*/g);
  if (leftover) console.log('   LEFTOVER:', leftover);
});