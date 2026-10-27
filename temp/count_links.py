import os
cnt=0
for f in os.listdir('guides'):
    p='guides/'+f
    try:
        txt=open(p,encoding='utf-8',errors='ignore').read()
    except:
        continue
    if '/css/overrides.css?v=59' in txt:
        cnt+=1
print('with link',cnt)
