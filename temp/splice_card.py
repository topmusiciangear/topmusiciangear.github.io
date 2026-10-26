p = 'build-guides.js'
src = open(p, encoding='utf-8').read()
block = open('temp/card_block.js', encoding='utf-8').read().rstrip('\n')
start_marker = '// Card text: every card should read like the Yamaha P-225 one'
end_marker = 'function productCard'
i = src.index(start_marker)
j = src.index(end_marker, i)
new = src[:i] + block + '\n\n' + src[j:]
open(p, 'w', encoding='utf-8', newline='').write(new)
print('replaced', j - i, 'chars with', len(block))
print('CARD_WORDS_MAX occurrences:', new.count('CARD_WORDS_MAX'))
