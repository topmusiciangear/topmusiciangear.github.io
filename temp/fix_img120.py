p = 'build-guides.js'
src = open(p, encoding='utf-8').read()

# Desktop/base size for the panel (160px)
old = ".guide-section-quickfacts{flex:0 0 160px;width:160px;height:160px;min-width:0;background:#22252c;border-radius:8px;padding:6px 8px;box-sizing:border-box;display:grid;grid-template-rows:repeat(4,1fr);gap:4px;overflow:hidden;align-self:stretch}"
new = old + "@media(max-width:900px){.guide-section-mediabuy .guide-section-img,.guide-section-mediabuy .guide-video-thumb{width:120px;height:120px;flex:none}}"
assert src.count(old) == 1
src = src.replace(old, new, 1)

# Make sure desktop keeps 160px for images too
old2 = "@media(min-width:901px){.qf-card{padding:5px 8px;gap:2px}"
new2 = "@media(min-width:901px){.guide-section-mediabuy .guide-section-img,.guide-section-mediabuy .guide-video-thumb{width:160px;height:160px;flex:none}.qf-card{padding:5px 8px;gap:2px}"
assert src.count(old2) == 1
src = src.replace(old2, new2, 1)

open(p, 'w', encoding='utf-8', newline='').write(src)
print('done')
