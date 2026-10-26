import json, glob, re, html

sus = set('\u251c\u2502\u2551\u2592\u252c\u00c3\u00c2\ufffd\u2500\u2550\u2563\u2557\u255d\u256c\u00b4')
badfiles = []
files = glob.glob('guides/*.html') + ['index.html', 'es/index.html']
for f in files:
    s = open(f, encoding='utf-8').read()
    if sus & set(s):
        badfiles.append(f)
print('files with mojibake:', len(badfiles), badfiles[:5])

mismatch = 0
samples = []
for f in glob.glob('guides/*.html'):
    s = open(f, encoding='utf-8').read()
    for m in re.finditer(r'class="guide-product-card-desc">(.*?)</div>', s, re.S):
        txt = html.unescape(m.group(1)).strip()
        if not txt.endswith(('.', '!', '?', ')', '"')) or '...' in txt or '\u2026' in txt:
            mismatch += 1
            if len(samples) < 8:
                samples.append((f, txt[-70:]))
print('card descs not ending cleanly:', mismatch)
for x in samples:
    print(x)

# JSON-LD product descriptions
trunc = 0
for f in glob.glob('guides/*.html'):
    s = open(f, encoding='utf-8').read()
    for m in re.finditer(r'"description": "(.*?)"', s):
        if m.group(1).endswith('...'):
            trunc += 1
print('json-ld truncated descriptions:', trunc)
