src = open('build-guides.js', encoding='utf-8').read()
i = src.find('qf-bestfor')
print('count:', src.count('qf-bestfor'))
# show context
idx = src.find('qf-bestfor')
print(repr(src[idx-20:idx+80]))
