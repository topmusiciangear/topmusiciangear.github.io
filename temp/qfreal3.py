import glob
needle = '<div class="gpq-bestfor">'
out = []
for f in sorted(glob.glob('guides/*.html')):
    s = open(f, encoding='utf-8').read()
    if needle in s:
        out.append(f)
print('guides with quickfacts MARKUP:', len(out))
for f in out:
    print(f)
