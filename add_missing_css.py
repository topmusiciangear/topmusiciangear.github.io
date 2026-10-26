s = open('css/style.css', encoding='utf-8').read()

# Insert missing rules at position 52226 (after mobile media query, before @media min-width:901px)
insert_pos = 52226

missing_css = '''

.guide-section-prods {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 0;
  margin-top: 0;
}
.guide-section-prod {
  background: transparent;
  border: 1px solid transparent;
  border-radius: var(--radius);
  padding: 16px;
}
.guide-section-prod-name {
  font-size: 14px;
  font-weight: 700;
  color: var(--accent);
  margin-bottom: 10px;
}
.guide-section-prod-imgs {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
.guide-section-prod .guide-section-buy {
  margin-top: 10px;
}
.guide-section-wide {
  grid-column: 1 / -1;
}

/* Guide Verdict */
.guide-verdict {
  display: block;
  background: rgba(59,130,246,.08);
  border: 1px solid rgba(59,130,246,.2);
  border-radius: var(--radius);
  padding: 14px 22px;
  margin-bottom: 40px;
}

.verdict-label {
  font-size: 20px;
  font-weight: 800;
  color: var(--white);
  margin-bottom: 12px;
}

.verdict-text {
  font-size: 15px;
  color: var(--text-secondary);
  line-height: 1.8;
}

.guide-verdict-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  margin-top: 14px;
}

.verdict-col {
  min-width: 0;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
  border-top: 1px solid rgba(59,130,246,.15);
}

.verdict-col:nth-child(odd) {
  border-right: 1px solid rgba(59,130,246,.15);
}

.verdict-product-name {
  font-size: 15px;
  font-weight: 800;
  color: var(--white);
  margin-bottom: 10px;
}

.verdict-pros-cons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.verdict-list-group {
  margin-bottom: 12px;
}

.verdict-list-group:last-child {
  margin-bottom: 0;
}

.verdict-list-label {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  margin-bottom: 5px;
}

.verdict-list-label.pros {
  color: #34d399;
  background: rgba(52,211,153,.12);
}

.verdict-list-label.cons {
  color: #f87171;
  background: rgba(248,113,113,.12);
}

.verdict-col ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.verdict-col li {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.5;
  padding: 2px 0 2px 14px;
  position: relative;
}

.verdict-col li::before {
  position: absolute;
  left: 0;
  top: 2px;
  font-weight: 700;
  font-size: 12px;
}

.verdict-pros-list li::before {
  content: "+";
  color: #34d399;
}

.verdict-cons-list li::before {
  content: "\\2013";
  color: #f87171;
}
'''

s = s[:insert_pos] + missing_css + s[insert_pos:]
open('css/style.css', 'w', encoding='utf-8', newline='').write(s)
print('Missing rules restored')