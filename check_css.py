#!/usr/bin/env python3
"""
check_css.py
Validación pre-push / CI:
1. No <style> bloques grandes en guides/ ni index.html (salvo gpq-grid).
2. No cambios en secciones protegidas de css/style.css (header, hero, footer, etc.).
"""
import re, os, subprocess, sys

PROTECTED_SELECTORS = [
    'header', 'hero', 'footer', '.hero', '.footer', '.header', 'nav', '.nav',
    '.guide-section-heading', '.guide-section-content', '.guide-verdict',
    '.guide-conclusion', '.guide-faq', '.guide-reviews', '.guide-products',
]

ALLOWED_INLINE_KEYWORDS = ['gpq-grid', 'gpq', 'guide-section-quickfacts']

def check_inline_styles():
    bad = []
    # guides
    for root, _, files in os.walk('guides'):
        for f in files:
            if f.endswith('.html') and not f.endswith('_es.html'):
                p = os.path.join(root, f)
                with open(p, encoding='utf-8') as fp:
                    c = fp.read()
                for m in re.finditer(r'<style>(.*?)</style>', c, re.DOTALL):
                    s = m.group(1)
                    if len(s) > 20000 and not any(kw in s for kw in ALLOWED_INLINE_KEYWORDS):
                        bad.append(f'{p}: bloque inline {len(s)} chars')
    # index.html
    with open('index.html', encoding='utf-8') as f:
        idx = f.read()
    for m in re.finditer(r'<style>(.*?)</style>', idx, re.DOTALL):
        s = m.group(1)
        if len(s) > 20000 and not any(kw in s for kw in ALLOWED_INLINE_KEYWORDS):
            bad.append(f'index.html: bloque inline {len(s)} chars')
    return bad

def check_css_diff():
    """Detecta adiciones en secciones protegidas comparando con HEAD."""
    result = subprocess.run(['git', 'diff', 'HEAD', '--', 'css/style.css'],
                            capture_output=True, text=True)
    added = []
    for line in result.stdout.splitlines():
        if line.startswith('+') and not line.startswith('+++'):
            for prot in PROTECTED_SELECTORS:
                if prot in line:
                    added.append(line.strip())
                    break
    return added

def main():
    errors = []
    inline = check_inline_styles()
    if inline:
        errors.append('[ERROR] <style> inline grandes detectados:')
        errors.extend(inline)
    diff = check_css_diff()
    if diff:
        errors.append('[WARN] Cambios en secciones protegidas de css/style.css:')
        errors.extend(diff)
    if errors:
        print('\n'.join(errors))
        sys.exit(1)
    print('[OK] Checks CSS OK')
    sys.exit(0)

if __name__ == '__main__':
    main()