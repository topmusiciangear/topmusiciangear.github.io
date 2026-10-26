import glob, json, os

SUS = {
    '\u251c':'BOX-251C', '\u2502':'BOX-2502', '\u00ae':'REG', '\u00a1':'INV-!',
    '\u2551':'BOX-2551', '\u2592':'BOX-2592', '\u252c':'BOX-252C', '\u00c1':'A-acute',
    '\u00b5':'MICRO', '\u00c3':'ATILDE', '\u00c2':'ACIRC', '\ufffd':'REPLACEMENT',
    '\u201a':'QUOTE-LOW', '\u201e':'QUOTE-DBL-LOW', '\u02dc':'SMALL-TILDE',
}

files = ['data/products.json','data/guides.json','index.html']
files += sorted(glob.glob('guides/*.html'))
files += sorted(glob.glob('js/*.js'))
files += sorted(glob.glob('css/*.css'))

rows=[]
for p in files:
    try:
        s=open(p,encoding='utf-8').read()
    except Exception as e:
        print('ERR',p,e); continue
    counts={}
    for ch,name in SUS.items():
        c=s.count(ch)
        if c: counts[name]=c
    if counts:
        rows.append((p,counts))
print('files with suspicious chars:',len(rows))
for p,c in rows[:60]:
    print(p,c)
print('total files scanned',len(files))

# Check full source and generated descriptions
for p in ['temp/products_full_original.json','temp/generated_descs.txt']:
    s=open(p,encoding='utf-8').read()
    counts={name:s.count(ch) for ch,name in SUS.items() if s.count(ch)}
    print(p,counts)
