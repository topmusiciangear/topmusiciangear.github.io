p = 'build-guides.js'
src = open(p, encoding='utf-8').read()

# Find the quickFactsHtml block
start = src.find("        if (firstProduct.bestFor && firstProduct.facts && firstProduct.facts.length) {")
end = src.find("      }", start)  # end of isFirstNew block? need to find mediaBuy
# find mediaBuy construction
mb = src.find("    const mediaBuy = (productImgs && sectionChips)", start)
print('block len', mb - start)
block = src[start:mb]
print(block[:200])
print('...')
print(block[-200:])
