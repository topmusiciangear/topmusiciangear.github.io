import re, glob, os

for path in glob.glob('guides/*.html'):
    with open(path, encoding='utf-8', errors='ignore') as f:
        c = f.read()
    # replace z-index:2147483647!important with 9999 in inline styles
    new_c = re.sub(r'z-index\s*:\s*2147483647\s*!important', 'z-index:9999', c)
    # also replace any plain 2147483647 without !important
    new_c = re.sub(r'z-index\s*:\s*2147483647\b', 'z-index:9999', new_c)
    if new_c != open(path, encoding='utf-8', errors='ignore').read():
        with open(path, 'w', encoding='utf-8', newline='') as f:
            f.write(new_c)
        print(f'Fixed {path}')

print('Done')