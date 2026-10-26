p = 'build-guides.js'
src = open(p, encoding='utf-8').read()
# Remove my injected mobile override in style tag
old = '@media(max-width:900px){.guide-section-mediabuy{flex-wrap:wrap}.guide-section-mediabuy .guide-section-img,.guide-section-mediabuy .guide-video-thumb{width:120px;height:120px}.qf-card{padding:3px 5px;gap:1px}.qf-label{font-size:7px}.qf-value{font-size:9px}.qf-fact{padding:2px 5px;gap:4px}.qf-icon{width:12px;height:12px}}'
new = ''
assert src.count(old) == 1
src = src.replace(old, new, 1)
open(p, 'w', encoding='utf-8', newline='').write(src)
print('done')
