s = open('guides/at2020-vs-p120.html', encoding='utf-8').read()
i = s.find('<div class="guide-product-card"')
print('count', s.count('guide-product-card'))
print(s[i:i+320])
