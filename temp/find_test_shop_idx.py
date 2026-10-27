txt=open('build-guides.js',encoding='utf-8').read()
i=txt.find('const TEST_SHOP_BTN')
print(i)
# print first 500 chars after
print(txt[i:i+500])
