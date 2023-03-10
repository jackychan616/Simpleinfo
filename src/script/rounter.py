import json
from pathlib import Path
import ast 
#!/usr/bin/python
# -*- coding: UTF-8 -*-
root = Path(__file__).parents[1]
with open(mode = "r", file = f"{root}\pages\main-page.js",encoding="utf-8") as fp:
        data = fp.read()
        o = data[data.find('const') : data.rfind('];')+1]
        final = o[o.find('['): o.rfind(']')+1].replace("'",'"')
        ans = ast.literal_eval(final)


with open(mode = "r+",file = f"{root}\data\Blog.json",encoding="utf-8") as b:
        d_b = json.load(b)
        for card in ans:
            d_b.append(card)
            with open(mode = "r+",file = f"{root}\data\Blog.json",encoding="utf-8") as bp:
                json.dump(d_b,bp,indent = 4,ensure_ascii=False)


      