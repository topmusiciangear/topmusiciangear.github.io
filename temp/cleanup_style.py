import re, glob, pathlib

# El bloque <style> que inyectamos antes (con sus variaciones de espacio)
pattern = re.compile(
    r'<style>\s*\n@media \(max-width: 640px\) \{\n'
    r'  \.shop-more-list \{ margin-top: 0 !important; margin-bottom: 0 !important; \}\n'
    r'  \.shop-btn-review \{ margin-top: 0 !important; margin-bottom: 0 !important; \}\n'
    r'  \.guide-section-mediabuy > \.guide-section-buy \{ margin-top: 0 !important; \}\n'
    r'\}\n'
    r'</style>'
)

files = glob.glob('guides/*.html')
cleaned = 0
skipped = 0
for f in files:
    p = pathlib.Path('.') / f
    try:
        txt = p.read_text(encoding='utf-8', errors='ignore')
    except Exception as e:
        print('skip', f, e)
        continue
    
    new, n = pattern.subn('', txt)
    if n > 0:
        p.write_text(new, encoding='utf-8')
        print('cleaned', f)
        cleaned += 1
    else:
        skipped += 1

print(f'\nLimpiadas: {cleaned}, Sin cambios: {skipped}')
