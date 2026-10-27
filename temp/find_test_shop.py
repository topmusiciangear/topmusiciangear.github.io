txt=open('build-guides.js',encoding='utf-8').read()
idx=txt.find('TEST_SHOP_BTN')
print('found' if idx!=-1 else 'no')
# print surrounding
print(txt[idx:idx+500])
