src = open('build-guides.js', encoding='utf-8').read()
# Mobile override for images: insert right before '@media(min-width:901px){.qf-card'
old = '@media(min-width:901px){.qf-card{padding:5px 8px;gap:2px}'
new = '@media(max-width:900px){.guide-section-mediabuy .guide-section-img,.guide-section-mediabuy .guide-video-thumb{width:120px;height:120px;flex:none}}@media(min-width:901px){.guide-section-mediabuy .guide-section-img,.guide-section-mediabuy .guide-video-thumb{width:160px;height:160px;flex:none}.qf-card{padding:5px 8px;gap:2px}'
assert src.count(old) == 1, src.count(old)
src = src.replace(old, new, 1)
open('build-guides.js', 'w', encoding='utf-8', newline='').write(src)
print('done')
