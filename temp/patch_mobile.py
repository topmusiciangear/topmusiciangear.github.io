p = 'build-guides.js'
src = open(p, encoding='utf-8').read()

# Find the injected style tag's CSS (the one with guide-section-quickfacts{flex:0 0 120px)
i = src.find('guide-section-quickfacts{flex:0 0 120px')
# find the closing </style> after the quickfacts css (the injected one)
j = src.find('</style>', i)
old_css = src[i:j]
print('current css:', old_css[:200])

# Replace with updated CSS that includes mobile overrides
new_css = (
  '.guide-section-quickfacts{flex:0 0 120px;width:120px;height:120px;min-width:0;background:#22252c;border-radius:8px;padding:4px 6px;box-sizing:border-box;display:grid;grid-template-rows:repeat(4,1fr);gap:3px;overflow:hidden;align-self:stretch}'
  '@media(min-width:901px){.guide-section-quickfacts{flex:0 0 160px;width:160px;height:160px;padding:6px 8px;gap:4px}}'
  '.qf-card{background:#22252c;border-radius:8px;padding:4px 6px;box-sizing:border-box;overflow:hidden;min-height:0;display:flex;flex-direction:column;justify-content:center;gap:1px}'
  '.qf-fact{flex-direction:row;align-items:center;gap:5px;padding:3px 6px}'
  '.qf-label{font-size:8px;color:#4d8dff;letter-spacing:.04em;text-transform:uppercase;font-weight:600;line-height:1.1}'
  '.qf-value{font-size:10px;font-weight:600;color:#fff;line-height:1.1}'
  '.qf-text{display:flex;flex-direction:column;gap:0;min-width:0}'
  '.qf-icon{width:14px;height:14px;flex-shrink:0;display:flex;align-items:center;justify-content:center}'
  '@media(min-width:901px){.qf-card{padding:6px 8px;gap:2px}.qf-label{font-size:9px}.qf-value{font-size:11px}.qf-fact{padding:4px 8px;gap:6px}.qf-icon{width:16px;height:16px}}'
  '@media(max-width:900px){.guide-section-mediabuy{flex-wrap:wrap}.guide-section-mediabuy .guide-section-img,.guide-section-mediabuy .guide-video-thumb{width:120px;height:120px}.qf-card{padding:3px 5px;gap:1px}.qf-label{font-size:7px}.qf-value{font-size:9px}.qf-fact{padding:2px 5px;gap:4px}.qf-icon{width:12px;height:12px}}'
)

src = src[:i] + new_css + src[j:]
open(p, 'w', encoding='utf-8', newline='').write(src)
print('done')
