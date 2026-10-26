import re, os
root='C:\\Users\\Daniel\\projects\\topmusiciangear'
paths=[os.path.join(root,'index.html')] + [os.path.join(root,'guides',f) for f in os.listdir(os.path.join(root,'guides')) if f.endswith('.html')]
c=0
for p in paths:
    try:
        txt=open(p,'r',encoding='utf-8',errors='ignore').read()
        n=re.sub(r'/css/overrides.css\?v=\d+', '/css/overrides.css?v=7', txt)
        if n!=txt:
            open(p,'w',encoding='utf-8',newline='').write(n)
            c+=1
    except Exception as e:
        print('err',p,e)
print('updated',c)
