src = open('build-guides.js', encoding='utf-8').read()
start = src.find("          quickFactsHtml = '<div class=\"guide-section-quickfacts\"")
end = src.find("        }", start)  # end of if block
# find the mediaBuy line after
mb = src.find("    const mediaBuy = (productImgs && sectionChips)", end)
print('start', start, 'end', end, 'mb', mb)
print(repr(src[start:mb]))
