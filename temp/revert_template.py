s = open('build-guides.js', encoding='utf-8').read()

old1 = "sectionChips = '<div class=\"store-buttons\">' + storeChips(firstProduct, isEs ? 'es' : 'en') + '</div>'"
new1 = "sectionChips = '<div class=\"guide-section-buy\">' + storeChips(firstProduct, isEs ? 'es' : 'en') + '</div>'"
assert s.count(old1) == 1, "old1 count " + str(s.count(old1))
s = s.replace(old1, new1)

old2a = "quickFactsHtml +\n          sectionChips +\n          '<div class=\"guide-video-thumb lb-video\" data-yt=\""
new2a = "quickFactsHtml +\n          '<div class=\"guide-video-thumb lb-video\" data-yt=\""
assert s.count(old2a) == 1, "old2a count " + str(s.count(old2a))
s = s.replace(old2a, new2a)

old2b = "quickFactsHtml +\n          sectionChips +\n          '<div class=\"guide-video-thumb guide-video-placeholder\" aria-hidden=\"true\"></div>'"
new2b = "quickFactsHtml +\n          '<div class=\"guide-video-thumb guide-video-placeholder\" aria-hidden=\"true\"></div>'"
assert s.count(old2b) == 1, "old2b count " + str(s.count(old2b))
s = s.replace(old2b, new2b)

old3 = "const mediaBuy = (productImgs)\n      ? '<div class=\"guide-section-mediabuy\">' + productImgs + '</div>'\n      : productImgs + sectionChips;"
new3 = "const mediaBuy = (productImgs && sectionChips)\n      ? '<div class=\"guide-section-mediabuy\">' + productImgs + sectionChips + '</div>'\n      : productImgs + sectionChips;"
assert s.count(old3) == 1, "old3 count " + str(s.count(old3))
s = s.replace(old3, new3)

old4 = ".guide-section-imgs{display:flex;gap:12px;margin-top:16px;flex-wrap:wrap;width:100%}"
new4 = ".guide-section-imgs{display:flex;gap:12px;margin-top:16px;flex-wrap:wrap}"
assert s.count(old4) == 1, "old4 count " + str(s.count(old4))
s = s.replace(old4, new4)

open('build-guides.js', 'w', encoding='utf-8').write(s)
print("done")
print("store-buttons remaining:", s.count("store-buttons"))
"