src = open('build-guides.js', encoding='utf-8').read()
needle = "        const _qf = (isFirstNew && firstProduct && firstProduct.bestFor && firstProduct.facts && firstProduct.facts.length) ? firstProduct : null;"
i = src.find(needle)
j = src.find("    const mediaBuy = (productImgs && sectionChips)", i)
print(repr(src[i:j+60]))
print('---')
print('length block:', j-i)
