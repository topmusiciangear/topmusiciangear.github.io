src = open('build-guides.js', encoding='utf-8').read()
needle = 'gpq{display:grid'
i = src.find(needle)
# find the closing </style> of the injected tag (the one containing gpq{display:grid)
j = src.find('</style>', i)
extra = '.guide-products-cards .guide-product-card--quickfacts{grid-column:1/-1}.guide-product-card--quickfacts{margin-bottom:12px}'
src = src[:j] + extra + src[j:]
open('build-guides.js', 'w', encoding='utf-8', newline='').write(src)
print('done', 'gpq{display:grid' in src)
