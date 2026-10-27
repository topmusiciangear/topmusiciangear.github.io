txt=open('build-guides.js',encoding='utf-8').read()
import re
m=re.search(r'const TEST_SHOP_BTN = \{.*?1055:', txt, flags=re.S)
if m:
    start=m.start()
    print(txt[start:start+500])
else:
    print('1055 not found')
