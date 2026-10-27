txt=open('build-guides.js',encoding='utf-8').read()
for token in ['TEST_SHOP_BTN = {','const TEST_SHOP_BTN']:
    i=txt.find(token)
    print(token,i)
