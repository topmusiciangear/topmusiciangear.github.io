src = open('build-guides.js', encoding='utf-8').read()
needle = '<style>@media(hover:hover)'
i = src.find(needle)
print(repr(src[i-120:i+260]))
