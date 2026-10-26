import re, sys, io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

html = open('guides/at2020-vs-p120.html', encoding='utf-8', errors='ignore').read()

m = re.search(r'<div class="guide-section-mediabuy">', html)
start = m.start()
depth = 0
end = start
j = start
while j < len(html):
    if html[j:j+5] == '<div ':
        depth += 1
    elif html[j:j+6] == '</div>':
        depth -= 1
        if depth == 0:
            end = j + 6
            break
    j += 1

block = html[start:end]

# Buscar qué sigue después del cierre de guide-section-mediabuy
after = html[end:end+500]
print("=== DESPUÉS de guide-section-mediabuy (primer bloque) ===")
print(after[:500])

# También mostrar todo lo que hay entre shop-more-list cierre y el siguiente div
shop_more_close = block.rfind('</div>')
print("\n=== ÚLTIMO </div> del bloque ===")
print(block[shop_more_close-200:shop_more_close+10])
