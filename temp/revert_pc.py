p = 'build-guides.js'
src = open(p, encoding='utf-8').read()
# Load original productCard from committed version 56ca126ebd (saved earlier? check temp)
orig = open('temp/orig_pc.txt', encoding='utf-8').read().rstrip('\n') + '\n'
# current productCard block
start = src.index('function productCard(p, lang) {')
end = src.index('function jsonLdScript', start)
src = src[:start] + orig + src[end:]
# remove quickScoreBadge helper
hs = src.find('function quickScoreBadge(p, lang) {')
if hs >= 0:
    he = src.find('\n}\n', hs) + 3
    src = src[:hs] + src[he:]
open(p, 'w', encoding='utf-8', newline='').write(src)
print('reverted productCard; quickScoreBadge removed:', 'quickScoreBadge' not in src)
# verify original productCard restored
print('productCard has guide-product-card--quickfacts:', 'guide-product-card--quickfacts' in src)
