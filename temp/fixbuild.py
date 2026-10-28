import pathlib
p=pathlib.Path("build-guides.js")
lines=p.read_text(encoding="utf-8").splitlines()
# Remove the bad inserted lines (index 527..531 0-based)
out=lines[:527]+lines[532:]
p.write_text("\n".join(out)+"\n",encoding="utf-8")
print("done")
PY