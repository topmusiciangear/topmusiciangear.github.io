s=open('build-guides.js',encoding='utf-8').read()
old = "const mediaBuy = (productImgs && sectionChips)\n      ? '<div class=\"guide-section-mediabuy\">' + productImgs + sectionChips + '</div>'\n      : productImgs + sectionChips;"
new = "const mediaBuy = (productImgs)\n      ? '<div class=\"guide-section-mediabuy\">' + productImgs + '</div>'\n      : productImgs + sectionChips;"
n = s.count(old)
s = s.replace(old, new)
open('build-guides.js','w',encoding='utf-8').write(s)
print('replaced', n)
