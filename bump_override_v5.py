import re, os
root='C:\\Users\\Daniel\\projects\\topmusiciangear'
paths=[os.path.join(root,'index.html')] + [os.path.join(root,'guides',f) for f in os.listdir(os.path.join(root,'guides')) if f.endswith('.html')]
count=0
for p in paths:
    try:
        with open(p,'r',encoding='utf-8',errors='ignore') as f:
            c=f.read()
        newc=re.sub(r'/css/overrides.css\?v=\d+', '/css/overrides.css?v=5', c)
        if newc!=c:
            with open(p,'w',encoding='utf-8',newline='') as f:
                f.write(newc)
            count+=1
    except Exception as e:
        print('error',p,e)
print('updated',count,'files')
