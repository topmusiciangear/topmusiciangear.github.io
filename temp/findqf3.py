src = open('build-guides.js', encoding='utf-8').read()
i = src.find("quickFactsHtml = '<div style=")
print(repr(src[i:i+700]))
