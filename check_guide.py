with open('guides/at2020-vs-p120.html', encoding='utf-8') as f:
    c = f.read()

idx = c.find('<div class="guide-section-mediabuy"')
if idx >= 0:
    print(c[idx:idx+1500])