src = open('build-guides.js', encoding='utf-8').read()
i = src.find("Ideal para' : 'Best for'")
print(repr(src[i:i+420]))
