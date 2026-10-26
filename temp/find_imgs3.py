s = open('guides/at2020-vs-p120.html', encoding='utf-8').read()
needle = '<div class="guide-section-imgs">'
i = s.find(needle)
depth = 0
j = i
while j < len(s):
    if s[j:j+4] == '<div ':
        depth += 1
        j += 4
    elif s[j:j+6] == '</div>':
        depth -= 1
        if depth == 0:
            break
        j += 6
    else:
        j += 1
open('temp/imgs.txt', 'w', encoding='utf-8').write(s[i:j+6])
print('ok', j - i)
