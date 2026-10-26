s = open('guides/at2020-vs-p120.html', encoding='utf-8').read()
import re
# find guide-detail-img usage in body (after </head>)
headend = s.find('</head>')
body = s[headend:]
for kw in ['guide-detail-header', 'guide-detail-img', 'guide-detail-intro', 'guide-products-grid', 'guide-products-cards', 'guide-products-title']:
    i = body.find(kw)
    print('===', kw, 'at body offset', i)
    if i >= 0:
        print(body[i-30:i+180])
        print()
