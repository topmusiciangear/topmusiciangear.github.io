src = open('build-guides.js', encoding='utf-8').read()
needle = 'shop-wm{transition:color .18s ease}.shop-more-list a:hover .shop-wm{color:#FFB300}}'
i = src.find(needle)
print(repr(src[i:i+25]))
print('occurrences:', src.count(needle))
