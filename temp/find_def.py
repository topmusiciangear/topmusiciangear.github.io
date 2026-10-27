txt=open('build-guides.js',encoding='utf-8').read()
idx=txt.find('var TEST_SHOP_BTN')
print('idx',idx)
print(txt[idx:idx+300])
