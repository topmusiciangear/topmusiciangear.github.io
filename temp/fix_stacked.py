s = open('css/style.css', encoding='utf-8').read()

# Replace the mobile media query with stacked layout
# User wants: photo + info stacked (info below photo), both square same size
old = '''\@media (max-width: 640px) {\n  .guide-section-mediabuy {\n    flex-direction: row;\n    flex-wrap: wrap;\n  }\n  .guide-section-mediabuy > .guide-section-buy {\n    flex: 1 1 100%;\n    width: 100%;\n    max-width: none;\n    margin-top: 16px;\n  }\n  .guide-section-mediabuy > .guide-section-imgs {\n    width: 100%;\n    justify-content: flex-start;\n  }\n  .guide-section-mediabuy .guide-section-img,\n  .guide-section-mediabuy .guide-video-thumb {\n    flex: none;\n    min-width: 0;\n    width: 50%;\n    height: 50%;\n  }\n}'''

new = '''\@media (max-width: 640px) {\n  .guide-section-mediabuy {\n    flex-direction: column;\n  }\n  .guide-section-mediabuy > .guide-section-buy {\n    width: 100%;\n    max-width: none;\n    margin-top: 16px;\n    order: 2;\n  }\n  .guide-section-mediabuy > .guide-section-imgs {\n    width: 100%;\n    justify-content: flex-start;\n  }\n  .guide-section-mediabuy .guide-section-img,\n  .guide-section-mediabuy .guide-video-thumb {\n    flex: none;\n    min-width: 0;\n    width: 100%;\n    aspect-ratio: 1 / 1;\n    object-fit: contain;\n    margin: 0 auto 8px;\n  }\n}\n\n.\"guide-section-quickfacts\" {\n  max-width: 100%;\n  margin: 0 auto;\n}'''

if old in s:
    s = s.replace(old, new, 1)
    print('Replace successful')
else:
    print('Old pattern not found, trying alternative')
    # Try simpler replacement
    if 'width:50%;height:50%' in s:
        s = s.replace('width:50%;height:50%', 'width:100%;height:auto;aspect-ratio: 1 / 1; object-fit: contain;')
        print('Replaced photo dimensions')
    else:
        print('Could not find dimensions pattern')

# Write
open('css/style.css', 'w', encoding='utf-8', newline='').write(s)
print('CSS written')

# Verify
i = s.find('@media (max-width: 640px)')
if i >= 0:
    print()
    print(s[i:i+500])