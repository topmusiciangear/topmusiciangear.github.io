import pathlib
p=pathlib.Path("build-guides.js")
lines=p.read_text(encoding="utf-8").splitlines()
out=[l for l in lines if l.strip()!="```"]
p.write_text("\n".join(out)+"\n",encoding="utf-8")
print("done")
PY