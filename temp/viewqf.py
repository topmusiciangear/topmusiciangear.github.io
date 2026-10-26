src = open('build-guides.js', encoding='utf-8').read()
start = src.find('var quickFactsHtml = \'\';')
end = src.find('const mediaBuy = (productImgs && sectionChips)', start)
block = src[start:end]
print(block)
print('===END===')
print('len', len(block))
