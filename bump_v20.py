import re, glob, pathlib
v = '20'
files = ['index.html'] + glob.glob('guides/*.html')
for f in files:
    p = pathlib.Path('.') / f
    try:
        txt = p.read_text(encoding='utf-8', errors='ignore')
    except Exception as e:
        print('skip', f, e)
        continue
    new = re.sub(r'/css/overrides\.css\?v=\d+', f'/css/overrides.css?v={v}', txt)
    if new != txt:
        p.write_text(new, encoding='utf-8')
        print('updated', f)
