src = open('build-guides.js', encoding='utf-8').read()
needle = "sectionChips = '<div class=\"guide-section-buy\">'"
i = src.find(needle)
print(repr(src[i-120:i+260]))
