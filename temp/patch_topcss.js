const fs = require('fs');
let s = fs.readFileSync('build-guides.js', 'utf8');
const old = "  </style>\r\n";
// find the hf-overrides style block's closing </style>
const marker = "guide-search-hit--active{background:var(--accent);outline:2px solid #fff}\n  </style>";
const add = "guide-search-hit--active{background:var(--accent);outline:2px solid #fff}\n.top-search-toggle{background:none;border:none;color:var(--text-secondary);cursor:pointer;padding:4px 6px;font-size:16px;line-height:1}.top-search-toggle:hover{color:var(--accent)}.top-search-drop{position:absolute;top:100%;right:0;margin-top:8px;background:var(--bg-card);border:1px solid var(--border);border-radius:8px;padding:8px;min-width:260px;box-shadow:0 8px 24px rgba(0,0,0,.4);z-index:9999}.top-search-drop[hidden]{display:none}.top-search-input{width:100%;padding:8px 12px;font-size:13px;color:var(--text);background:var(--bg-secondary);border:1px solid var(--border);border-radius:6px;outline:none;box-sizing:border-box}.top-search-results{max-height:300px;overflow-y:auto;margin-top:6px}.top-search-item{display:block;padding:8px 10px;font-size:13px;color:var(--text);text-decoration:none;border-radius:4px}.top-search-item:hover{background:var(--bg-card-hover);color:var(--accent)}\n  </style>";
if (!s.includes(marker)) { console.log('NOT FOUND'); process.exit(1); }
s = s.replace(marker, add);
fs.writeFileSync('build-guides.js', s);
console.log('done');