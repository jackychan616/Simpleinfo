import json
from pathlib import Path
import pathlib
import ast
import os

#!/usr/bin/python
# -*- coding: UTF-8 -*-
root = Path(__file__).parents[1]


def getfromfile(path):
    try:
        with open(mode="r", file=path, encoding="utf-8") as fp:
            data = fp.read()
            o = data[data.find("const Bloglist") : data.rfind("];") + 1]
            final = o[o.find("[") : o.rfind("]") + 1].replace("'", '"')
            ans = ast.literal_eval(final)
            print(ans)
            return ans
    except:
        return None


files = []


def scan():
    for p in os.listdir(f"{root}\pages\content"):
        print(p)
        if ".js" in p:
            continue
        for f in os.listdir(f"{root}\pages\content\{p}"):
            if f == "index.js":
                pa = f"{root}\pages\content/{p}\index.js".replace(f"{chr(92)}", "/")
                l = getfromfile(pa)
                if l != None:
                    save(l)


def save(dic):
    with open(mode="r+", file=f"{root}\data\Blog.json", encoding="utf-8") as b:
        d_b = json.load(b)
        for card in dic:
            if card not in d_b:
                d_b.append(card)
            with open(mode="r+", file=f"{root}\data\Blog.json", encoding="utf-8") as bp:
                json.dump(d_b, bp, indent=4, ensure_ascii=False)


scan()
