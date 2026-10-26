src = open('build-guides.js', encoding='utf-8').read()
# Mobile override after quickfacts css media query ends (.qf-icon{width:14px...})
old = '.qf-icon{width:14px;height:14px}'
new = old + '@media(max-width:900px){.guide-section-mediabuy .guide-section-img,.guide-section-mediabuy .guide-video-thumb{width:120px;height:120px;flex:none}}@media(min-width:901px){.guide-section-mediabuy .guide-section-img,.guide-section-mediabuy .guide-video-thumb{width:160px;height:160px;flex:none}}'
assert src.count(old) == 1
src = src.replace(old, new, 1)
open('build-guides.js', 'w', encoding='utf-8', newline='').write(src)
print('done')
