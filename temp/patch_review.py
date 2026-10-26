p = 'build-guides.js'
src = open(p, encoding='utf-8').read()

# 1. declare quickFactsHtml before isFirstNew
old1 = "      if (isFirstNew) {\n        renderedProducts.add(firstProduct.id);\n        sectionChips = '<div class=\"guide-section-buy\">' + storeChips(firstProduct, isEs ? 'es' : 'en') + '</div>';\n      }"
new1 = ("      var quickFactsHtml = '';\n      if (isFirstNew) {\n        renderedProducts.add(firstProduct.id);\n        sectionChips = '<div class=\"guide-section-buy\">' + storeChips(firstProduct, isEs ? 'es' : 'en') + '</div>';\n"
        "        if (firstProduct.bestFor && firstProduct.facts && firstProduct.facts.length) {\n"
        "          const _bf = (isEs ? firstProduct.bestFor.es : firstProduct.bestFor.en) || '';\n"
        "          const _bfl = isEs ? 'Ideal para' : 'Best for';\n"
        "          quickFactsHtml = '<div style=\"flex:0 0 128px;width:128px;min-width:0;background:#22252c;border-radius:8px;padding:8px;box-sizing:border-box;display:flex;flex-direction:column;gap:6px\">' +\n"
        "            '<div style=\"font-size:10px;color:#4d8dff;letter-spacing:.04em;text-transform:uppercase;font-weight:600\">' + _bfl + '</div>' +\n"
        "            '<div style=\"font-size:12px;font-weight:500;color:#fff;line-height:1.3\">' + _bf + '</div>' +\n"
        "            firstProduct.facts.map(function (f) {\n"
        "              const lbl = isEs ? (f.label && f.label.es) : (f.label && f.label.en);\n"
        "              const col = f.tone === 'tradeoff' ? '#f5a524' : '#4ade80';\n"
        "              return '<div style=\"display:flex;gap:6px;align-items:center\">' +\n"
        "                '<span style=\"width:16px;height:16px;flex-shrink:0;color:' + col + ';display:flex;align-items:center;justify-content:center\">' + icon(f.icon, 'fa-solid') + '</span>' +\n"
        "                '<div style=\"display:flex;flex-direction:column;gap:1px;min-width:0\">' +\n"
        "                  '<div style=\"font-size:12px;font-weight:500;color:#fff;line-height:1.2\">' + (f.value || '') + '</div>' +\n"
        "                  '<div style=\"font-size:10px;color:#9aa0ab;line-height:1.2\">' + (lbl || '') + '</div>' +\n"
        "                '</div>' +\n"
        "              '</div>';\n"
        "            }).join('') +\n"
        "          '</div>';\n"
        "        }\n"
        "      }")
assert src.count(old1) == 1, src.count(old1)
src = src.replace(old1, new1, 1)

# 2. video branch photo: wrap img in relative div + scoreBadge, then insert quickFactsHtml
old2 = ("        productImgs = '<div class=\"guide-section-imgs\">' +\n"
        "          '<img src=\"' + psrc + '\" alt=\"' + (isEs && firstProduct.title_es ? firstProduct.title_es : firstProduct.title) + '\" class=\"guide-section-img lb-img' + (gifp.cut ? ' guide-section-img--cutout' : '') + '\" style=\"cursor:zoom-in\">' +\n"
        "          '<div class=\"guide-video-thumb lb-video\" data-yt=\"' + sectionVideo + '\" role=\"button\" aria-label=\"Play video\" tabindex=\"0\">' +")
new2 = ("        productImgs = '<div class=\"guide-section-imgs\">' +\n"
        "          '<div style=\"position:relative;display:inline-block\">' +\n"
        "            '<img src=\"' + psrc + '\" alt=\"' + (isEs && firstProduct.title_es ? firstProduct.title_es : firstProduct.title) + '\" class=\"guide-section-img lb-img' + (gifp.cut ? ' guide-section-img--cutout' : '') + '\" style=\"cursor:zoom-in\">' +\n"
        "            scoreBadge(firstProduct, isEs ? 'es' : 'en') +\n"
        "          '</div>' +\n"
        "          quickFactsHtml +\n"
        "          '<div class=\"guide-video-thumb lb-video\" data-yt=\"' + sectionVideo + '\" role=\"button\" aria-label=\"Play video\" tabindex=\"0\">' +")
assert src.count(old2) == 1, src.count(old2)
src = src.replace(old2, new2, 1)

# 3. non-video branch photo: wrap img in relative div + scoreBadge, then insert quickFactsHtml
old3 = ("        productImgs = '<div class=\"guide-section-imgs\">' +\n"
        "          '<img src=\"' + gis.src + '\" alt=\"' + (isEs && firstProduct.title_es ? firstProduct.title_es : firstProduct.title) + '\" class=\"guide-section-img lb-img' + (gis.cut ? ' guide-section-img--cutout' : '') + '\" style=\"cursor:zoom-in\">' +\n"
        "          '<div class=\"guide-video-thumb guide-video-placeholder\" aria-hidden=\"true\"></div>' +\n"
        "        '</div>';")
new3 = ("        productImgs = '<div class=\"guide-section-imgs\">' +\n"
        "          '<div style=\"position:relative;display:inline-block\">' +\n"
        "            '<img src=\"' + gis.src + '\" alt=\"' + (isEs && firstProduct.title_es ? firstProduct.title_es : firstProduct.title) + '\" class=\"guide-section-img lb-img' + (gis.cut ? ' guide-section-img--cutout' : '') + '\" style=\"cursor:zoom-in\">' +\n"
        "            scoreBadge(firstProduct, isEs ? 'es' : 'en') +\n"
        "          '</div>' +\n"
        "          quickFactsHtml +\n"
        "          '<div class=\"guide-video-thumb guide-video-placeholder\" aria-hidden=\"true\"></div>' +\n"
        "        '</div>';")
assert src.count(old3) == 1, src.count(old3)
src = src.replace(old3, new3, 1)

# 4. mediaBuy construction: insert quickFactsHtml (already in productImgs now, so nothing extra needed;
#    but ensure mediaBuy still wraps productImgs+sectionChips)
# mediaBuy already uses productImgs+sectionChips, quickFactsHtml is now inside productImgs. Good.

open(p, 'w', encoding='utf-8', newline='').write(src)
print('patched')
