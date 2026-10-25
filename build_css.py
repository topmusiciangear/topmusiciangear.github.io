#!/usr/bin/env python3
"""
build_css.py
Minify css/style.css -> css/style.min.css
Update index.html cache-busting query string ?v=<hash>
"""
import re, hashlib

CSS_SRC = 'css/style.css'
CSS_MIN = 'css/style.min.css'
INDEX   = 'index.html'

def minify(css: str) -> str:
    css = re.sub(r'/\*.*?\*/', '', css, flags=re.DOTALL)   # remove comments
    css = re.sub(r'\s+', ' ', css)                         # collapse whitespace
    css = re.sub(r'\s*([{}:;,>+~])\s*', r'\1', css)       # remove spaces around punctuation
    return css.strip()

def version_hash(content: str) -> str:
    return hashlib.md5(content.encode()).hexdigest()[:10]

def main():
    with open(CSS_SRC, encoding='utf-8') as f:
        css = f.read()
    minified = minify(css)
    with open(CSS_MIN, 'w', encoding='utf-8') as f:
        f.write(minified)

    v = version_hash(minified)
    with open(INDEX, encoding='utf-8') as f:
        idx = f.read()
    idx = re.sub(r'style\.min\.css\?v=[a-f0-9]+', f'style.min.css?v={v}', idx)
    with open(INDEX, 'w', encoding='utf-8', newline='') as f:
        f.write(idx)

    print(f'[OK] CSS minificado -> {CSS_MIN}')
    print(f'[OK] index.html actualizado a v={v}')

if __name__ == '__main__':
    main()