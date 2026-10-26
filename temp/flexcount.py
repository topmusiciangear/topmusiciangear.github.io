src = open('build-guides.js', encoding='utf-8').read()
print('flex:1 1 0 count:', src.count('flex:1 1 0'))
print("overflow:hidden;' count:", src.count("overflow:hidden;'"))
