import re, os
base = os.getcwd()
files = ['index.html']
for f in os.listdir(os.path.join(base,'guides')):
    if f.endswith('.html'):
        files.append(os.path.join('guides', f))
version = '11'
for rel in files:
    path = os.path.join(base, rel)
    try:
        with open(path, 'r', encoding='utf-8', errors='ignore') as fp:
            txt = fp.read()
    except Exception as e:
        print('skip', rel, e)
        continue
    # avoid duplicate
    if '/css/overrides.css?' in txt:
        # update version to 11
        txt = re.sub(r'/css/overrides\.css\?v=\d+', f'/css/overrides.css?v={version}', txt)
        changed = True
    else:
        # insert after style.min.css preload link
        pattern = r'(<link rel="preload" as="style" href="/css/style\.min\.css\?v=[^"]+"[^>]*>)'
        if re.search(pattern, txt):
            repl = r'\1\n  <link rel="stylesheet" href="/css/overrides.css?v=' + version + '">'
            new_txt, count = re.subn(pattern, repl, txt, count=1)
            if count:
                txt = new_txt
                changed = True
            else:
                changed = False
        else:
            # fallback after noscript
            pattern2 = r'(<noscript><link rel="stylesheet" href="/css/style\.min\.css\?v=[^"]+"></noscript>)'
            if re.search(pattern2, txt):
                repl2 = r'\1\n  <link rel="stylesheet" href="/css/overrides.css?v=' + version + '">'
                txt, count = re.subn(pattern2, repl2, txt, count=1)
                changed = count > 0
            else:
                changed = False
    if changed:
        with open(path, 'w', encoding='utf-8', newline='') as fp:
            fp.write(txt)
        print('updated', rel)
    else:
        print('unchanged', rel)
