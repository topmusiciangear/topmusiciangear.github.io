src = open('build-guides.js', encoding='utf-8').read()
i = src.find('background:#22252c;border-radius:8px;padding:6px 8px')
print(repr(src[i:i+220]))
