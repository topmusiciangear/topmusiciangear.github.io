import re
s = open('build-guides.js', encoding='utf-8').read()

# Find the quickfacts mobile media query and add max-width:640px rule
old = '''@media(max-width:900px){.guide-section-quickfacts{flex:0 0 120px;width:120px;height:120px;padding:4px 6px;gap:3px}.qf-card{padding:3px 6px;gap:1px}.qf-label{font-size:8px}.qf-value{font-size:10px}.qf-fact{padding:2px 6px;gap:4px}.qf-icon{width:14px;height:14px}'''

new = '''@media(max-width:900px){.guide-section-quickfacts{flex:0 0 120px;width:120px;height:120px;padding:4px 6px;gap:3px}.qf-card{padding:3px 6px;gap:1px}.qf-label{font-size:8px}.qf-value{font-size:10px}.qf-fact{padding:2px 6px;gap:4px}.qf-icon{width:14px;height:14px}@media(max-width:640px){.guide-section-quickfacts{flex:0 0 50%;width:50%;}}'''

count = s.count(old)
print(f'Old pattern found {count} times')
if count > 0:
    s = s.replace(old, new, 1)
    open('build-guides.js', 'w', encoding='utf-8', newline='').write(s)
    print('Replaced successfully')
else:
    print('Pattern NOT found - searching for partial match')
    # Try to find just the quickfacts start
    if '.guide-section-quickfacts{flex:0 0 120px' in s:
        print('Found quickfacts start')
    else:
        print('Quickfacts pattern not found at all')