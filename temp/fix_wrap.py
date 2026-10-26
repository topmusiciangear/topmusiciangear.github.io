s = open('css/style.css', encoding='utf-8').read()

# Add flex-wrap: wrap to the mediabuy container mobile media query
# Find the .guide-section-mediabuy rule in the mobile media query and add flex-wrap
old_mediabuy = '.guide-section-mediabuy {\n    flex-direction: row;'
new_mediabuy = '.guide-section-mediabuy {\n    flex-direction: row;\n    flex-wrap: wrap;'
if old_mediabuy in s:
    s = s.replace(old_mediabuy, new_mediabuy, 1)
    print('Added flex-wrap: wrap to mediabuy')
else:
    # Try without newline
    old_mediabuy2 = '.guide-section-mediabuy {flex-direction: row;'
    new_mediabuy2 = '.guide-section-mediabuy {flex-direction: row; flex-wrap: wrap;'
    if old_mediabuy2 in s:
        s = s.replace(old_mediabuy2, new_mediabuy2, 1)
        print('Added flex-wrap: wrap (compact form)')
    else:
        print('Could not find mediabuy pattern')

# Ensure imgs container is 50%
old_imgs = '.guide-section-mediabuy > .guide-section-imgs {'
new_imgs = '.guide-section-mediabuy > .guide-section-imgs {\n    width: 50%;'
if old_imgs in s:
    s = s.replace(old_imgs, new_imgs, 1)
    print('Set imgs container width to 50%')
else:
    print('Could not find imgs container pattern')

# Ensure buy section has proper width and will wrap
old_buy = '.guide-section-mediabuy > .guide-section-buy {'
new_buy = '.guide-section-mediabuy > .guide-section-buy {\n    flex: 1 1 100%;\n    width: 100%;\n    max-width: none;\n    margin-top: 16px;'
if old_buy in s:
    s = s.replace(old_buy, new_buy, 1)
    print('Set buy section to 100% with margin-top')
else:
    print('Could not find buy section pattern')

open('css/style.css', 'w', encoding='utf-8', newline='').write(s)
print('CSS written successfully')

# Verify
i = s.find('@media (max-width: 640px)')
if i >= 0:
    print()
    print('=== Mobile media query ===')
    print(s[i:i+600])