const fs = require('fs');
let js = fs.readFileSync('js/app.min.js', 'utf8');

// 1. guide card + related links pushState: /?g=id -> /guides/id_es.html
js = js.replace(
  /history\.pushState\(\{\},\'\',\'\/\?g=\'\+id\)/g,
  "history.pushState({},'','/guides/'+id+(currentLang==='es'?'_es':'')+'.html')"
);

// 2. onPageLoaded: remove URLSearchParams.get('g') + replaceState, use pathname
js = js.replace(
  /a=new URLSearchParams\(window\.location\.search\)\.get\("g"\);if\(a&&guides\.find\([^)]+\)\)history\.replaceState\(\{\},"","\/\?g="\+a\),renderGuideDetail\(a\)/,
  "a=(window.location.pathname.match(/\\/guides\\/(.+?)\\.html/)||[])[1];if(a&&(a=a.replace('_es','')||a)&&guides.find(function(e){return e.id===a}))renderGuideDetail(a)"
);

// 3. location.hash replaceState: /?g=h -> /guides/h.html
js = js.replace(
  /guides\.find\(a=>a\.id===e\)\?\(history\.replaceState\(\{\},"","\/\?g="\+e\),renderGuideDetail\(e\)\)/,
  "guides.find(a=>a.id===e)?(history.replaceState({},'','/guides/'+e+'.html'),renderGuideDetail(e))"
);

// 4. popstate: URLSearchParams.get('g') -> pathname match
js = js.replace(
  /const e=new URLSearchParams\(window\.location\.search\)\.get\("g"\)/,
  "const e=((window.location.pathname.match(/\\/guides\\/(.+?)\\.html/)||[])[1]||'').replace('_es','')||null"
);

// 5. hash link in onPageLoaded initial navigation: /?g=h -> /guides/h.html
js = js.replace(
  'history.replaceState({},"","/guides/"+e+".html")',
  "history.replaceState({},'','/guides/'+e+'.html')"
);

// 6. canonical in injectGuideJsonLd: add _es for Spanish
js = js.replace(
  'a.href="https://topmusiciangear.com/guides/"+e.id+".html")',
  'a.href="https://topmusiciangear.com/guides/"+e.id+(currentLang===\'es\'?\'_es\':\'\')+".html")'
);

// 7. og:url in renderGuideDetail: add _es for Spanish
js = js.replace(
  'b.content="https://topmusiciangear.com/guides/"+a.id+".html")',
  'b.content="https://topmusiciangear.com/guides/"+a.id+(currentLang===\'es\'?\'_es\':\'\')+".html")'
);

// 8. guide detail image: make relative paths absolute (SPA runs under /guides/)
js = js.replace(
  'guide-detail-img"><img src="${a.image}"',
  'guide-detail-img"><img src="${a.image&&a.image.startsWith(\'http\')?a.image:\'https://topmusiciangear.com/\'+(a.image||\'img/og-image.svg\')}"'
);

// 9. product card image: make relative paths absolute (SPA runs under /guides/)
js = js.replace(
  'guide-product-card-img"><img src="${a.img}"',
  'guide-product-card-img"><img src="${a.img&&a.img.startsWith(\'http\')?a.img:\'https://topmusiciangear.com/\'+(a.img||\'img/og-image.svg\')}"'
);

console.log('app.min.js updated');
fs.writeFileSync('js/app.min.js', js, 'utf8');
