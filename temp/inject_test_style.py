import re

html = open('guides/at2020-vs-p120.html', encoding='utf-8', errors='ignore').read()

# CSS a inyectar directamente en <style>
inject_css = """<style>
@media (max-width: 640px) {
  .shop-more-list { margin-top: 0 !important; margin-bottom: 0 !important; }
  .shop-btn-review { margin-top: 0 !important; margin-bottom: 0 !important; }
  .guide-section-mediabuy > .guide-section-buy { margin-top: 0 !important; }
  .guide-section { margin-top: 0 !important; padding-top: 0 !important; margin-bottom: 0 !important; }
  .guide-section-heading { margin-top: 0 !important; margin-bottom: 6px !important; }
  .guide-section-content p { margin-top: 0 !important; margin-bottom: 4px !important; }
  .guide-section-content > *:first-child { margin-top: 0 !important; }
}
</style>"""

# Insertar antes de </head>
html = html.replace('</head>', inject_css + '</head>')

open('guides/at2020-vs-p120.html', 'w', encoding='utf-8').write(html)
print("Inyectado en at2020-vs-p120.html")
