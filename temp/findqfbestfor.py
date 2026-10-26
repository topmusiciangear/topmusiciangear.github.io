src = open('build-guides.js', encoding='utf-8').read()
i = src.find('.qf-bestfor{')
print(repr(src[i:i+60]))
