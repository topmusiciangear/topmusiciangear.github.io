txt=open('build-guides.js',encoding='utf-8').read()
idx=txt.find('const TEST_SHOP_BTN = {')
start=txt.find('{', idx)
depth=0
for i in range(start,len(txt)):
    c=txt[i]
    if c=='{':
        depth+=1
    elif c=='}':
        depth-=1
    if depth==0:
        print('end at', i)
        print(txt[i-100:i+100])
        break
