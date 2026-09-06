var fs = require('fs');
var files = [
  'contact.html', 'privacy-policy.html', 'terms.html', 'cookie-policy.html', 'affiliate-disclosure.html',
  'es/contact.html', 'es/privacy-policy.html', 'es/terms.html', 'es/cookie-policy.html', 'es/affiliate-disclosure.html'
];
var oldUrl = 'https://www.pluginboutique.com/?a_aid=65fd7463b5f28&gad_source=1&gad_campaignid=23953084266&gbraid=0AAAABBZvMhd9QWokzi5bVQA51ocA8i1cR&gclid=CjwKCAjw1vXTBhB-EiwAEKr_k7lT3Rksx6r66LkI2QwlN4Bf1lJSPE3U70tvwkq6mKXV3yO0vMhqoxoC3IQQAvD_BwE';
var newUrl = 'https://www.pluginboutique.com/?a_aid=6a01e859cbe1a';
var total = 0;
files.forEach(function(f) {
  var s = fs.readFileSync(f, 'utf8');
  var n = s.split(oldUrl).length - 1;
  if (n > 0) {
    s = s.split(oldUrl).join(newUrl);
    fs.writeFileSync(f, s, 'utf8');
    console.log('FIXED ' + n + 'x ' + f);
    total += n;
  } else {
    console.log('none  ' + f);
  }
});
console.log('TOTAL ' + total);