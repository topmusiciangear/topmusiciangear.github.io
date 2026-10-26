import re

html = open('guides/at2020-vs-p120.html', encoding='utf-8', errors='ignore').read()

# Extraer el guide-section-buy completo del primer bloque
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

# Buscar todo el guide-section-buy
buy_match = re.search(r'<div class="guide-section-buy">.*?</div>\s*', block, re.DOTALL)
if buy_match:
    buy_html = buy_match.group(0)
    print("=== guide-section-buy completo ===")
    print(buy_html[:3000])
