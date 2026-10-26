p = 'build-guides.js'
src = open(p, encoding='utf-8').read()

# Desktop media query: reduce padding and gap
old = "@media(min-width:901px){.qf-card{padding:6px 8px;gap:2px}.qf-bestfor{padding:5px 8px;gap:1px}.qf-label{font-size:9px}.qf-value{font-size:11px}.qf-fact{padding:4px 8px;gap:6px}.qf-icon{width:16px;height:16px}}"
new = "@media(min-width:901px){.qf-card{padding:5px 8px;gap:1px}.qf-bestfor{padding:4px 8px;gap:0}.qf-label{font-size:9px}.qf-value{font-size:11px}.qf-fact{padding:3px 8px;gap:6px}.qf-icon{width:16px;height:16px}}"
assert src.count(old) == 1
src = src.replace(old, new, 1)

# Base (mobile): reduce padding too
old2 = ".qf-card{background:#22252c;border-radius:8px;padding:4px 6px;box-sizing:border-box;overflow:hidden;min-height:0;display:flex;flex-direction:column;justify-content:center;gap:1px}"
new2 = ".qf-card{background:#22252c;border-radius:8px;padding:3px 6px;box-sizing:border-box;overflow:hidden;min-height:0;display:flex;flex-direction:column;justify-content:center;gap:1px}"
assert src.count(old2) == 1
src = src.replace(old2, new2, 1)

old3 = ".qf-bestfor{padding:3px 6px;gap:0}.qf-bestfor .qf-label{font-size:7px}.qf-bestfor .qf-value{font-size:9px;line-height:1.05}"
new3 = ".qf-bestfor{padding:2px 6px;gap:0}.qf-bestfor .qf-label{font-size:7px}.qf-bestfor .qf-value{font-size:9px;line-height:1.05}"
assert src.count(old3) == 1
src = src.replace(old3, new3, 1)

open(p, 'w', encoding='utf-8', newline='').write(src)
print('done')
