p = 'build-guides.js'
src = open(p, encoding='utf-8').read()
i = src.find('guide-section-quickfacts{flex')
j = src.find('</style>', i)
print(repr(src[i:j]))
