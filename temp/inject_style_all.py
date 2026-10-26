import re, glob, pathlib

inject_css = """<style>
@media (max-width: 640px) {
  .shop-more-list { margin-top: 0 !important; margin-bottom: 0 !important; }
  .shop-btn-review { margin-top: 0 !important; margin-bottom: 0 !important; }
  .guide-section-mediabuy > .guide-section-buy { margin-top: 0 !important; }
}
</style>"""

files = glob.glob('guides/*.html')
count = 0
for f in files:
    p = pathlib.Path('.') / f
    try:
        txt = p.read_text(encoding='utf-8', errors='ignore')
    except Exception as e:
        print('skip', f, e)
        continue
    
    # Si ya tiene el style inyectado (de mi prueba anterior), saltar
    if '.shop-more-list { margin-top: 0 !important; margin-bottom: 0 !important; }' in txt:
        print('ya tiene style', f)
        continue
    
    new = txt.replace('</head>', inject_css + '</head>')
    if new != txt:
        p.write_text(new, encoding='utf-8')
        print('injected', f)
        count += 1

print(f'\nTotal inyectados: {count}')
