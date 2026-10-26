p = 'build-guides.js'
src = open(p, encoding='utf-8').read()
start = src.index('function productCard(p, lang) {')
end = src.index('function jsonLdScript', start)
new_fn = '''function productCard(p, lang) {
  const isEs = lang === 'es';
  const unitLabel = p.unit === 'each' ? (isEs ? ' (Unidad)' : ' (Each)') : p.unit === 'pair' ? (isEs ? ' (Par)' : ' (Pair)') : p.unit === 'headset' ? (isEs ? ' (2 auriculares)' : ' (2 headsets)') : '';
  const rawTitle = (isEs && p.title_es ? p.title_es : p.title);
  const title = rawTitle.replace(/\\s*\\((each|pair|unidad|par|cada uno|cada una)\\)\\s*$/i, function (m, u) {
    var map = { each: 'Each', pair: 'Pair', unidad: 'Unidad', par: 'Par' };
    return ' (' + (map[u.toLowerCase()] || 'Unidad') + ')';
  }) + unitLabel;
  const desc = cardDesc(isEs && p.desc_es ? p.desc_es : p.desc);
  const stores = storeChips(p, lang);
  const gi = guideCutImg(p);
  const imgSrc = gi.src;
  const cutout = gi.cut;
  const hasFacts = !!(p.bestFor && p.facts && p.facts.length);

  if (hasFacts) {
    const bestFor = (isEs ? p.bestFor.es : p.bestFor.en) || '';
    const bestForLabel = isEs ? 'Ideal para' : 'Best for';
    const factsHtml = p.facts.map(function (f) {
      const label = (isEs ? (f.label && f.label.es) : (f.label && f.label.en)) || '';
      const tone = f.tone === 'tradeoff' ? 'tradeoff' : 'good';
      return '<div class="gpq-fact gpq-fact--' + tone + '">' +
        '<span class="gpq-fact-icon" aria-hidden="true">' + icon(f.icon, 'fa-solid') + '</span>' +
        '<div class="gpq-fact-body">' +
          '<div class="gpq-fact-value">' + (f.value || '') + '</div>' +
          '<div class="gpq-fact-label">' + label + '</div>' +
        '</div>' +
      '</div>';
    }).join('');
    return '<div class="guide-product-card guide-product-card--quickfacts' + (cutout ? ' guide-product-card--cutout' : '') + '">' +
      '<div class="gpq">' +
        '<div class="gpq-photo">' +
          '<img src="' + imgSrc + '" alt="' + title + '" loading="lazy" class="lb-img" style="cursor:zoom-in">' +
          scoreBadge(p, lang) +
        '</div>' +
        '<div class="gpq-facts">' +
          '<div class="gpq-bestfor">' +
            '<div class="gpq-bestfor-label">' + bestForLabel + '</div>' +
            '<div class="gpq-bestfor-value">' + bestFor + '</div>' +
          '</div>' +
          factsHtml +
        '</div>' +
        '<div class="gpq-cta">' + stores + '</div>' +
      '</div>' +
      '<div class="guide-product-card-body">' +
        '<div class="guide-product-card-title-row">' +
          '<h3 class="guide-product-card-title">' + title + '</h3>' +
          productRatingLine(p, lang) +
        '</div>' +
        '<div class="guide-product-card-desc-wrap"><div class="guide-product-card-desc">' + desc + '</div></div>' +
      '</div>' +
    '</div>';
  }

  return `<div class="guide-product-card${cutout ? ' guide-product-card--cutout' : ''}">
    <div class="guide-product-card-img${cutout ? ' guide-product-card-img--cutout' : ''}"><img src="${imgSrc}" alt="${title}" loading="lazy" class="lb-img" style="cursor:zoom-in">${scoreBadge(p, lang)}</div>    <div class="guide-product-card-body">
      <div class="guide-product-card-title-row">
        <h3 class="guide-product-card-title">${title}</h3>
        ${productRatingLine(p, lang)}
      </div>
            <div class="guide-product-card-desc-wrap"><div class="guide-product-card-desc">${desc}</div></div>
      <div class="guide-product-card-stores">${stores}</div>
    </div>
  </div>`;
}

'''
src = src[:start] + new_fn + src[end:]
open(p, 'w', encoding='utf-8', newline='').write(src)
print('patched productCard')
