import re
s = open('css/style.css', encoding='utf-8').read()
for m in re.finditer(r'\.guide-section-img[^{]*\{', s):
    start = m.start()
    depth = 0
    brace = s.index('{', start)
    end = brace + 1
    depth = 1
    while end < len(s) and depth > 0:
        if s[end] == '{': depth += 1
        elif s[end] == '}': depth -= 1
        end += 1
    block = s[start:end]
    before = s[max(0, start-200):start]
    in_media = '@media' in before and before.rfind('{') < before.rfind('@media')
    print('===', m.group(0).strip(), 'in_media=', in_media)
    print(block[:220])
    print()
