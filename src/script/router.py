#!/usr/bin/python
# -*- coding: UTF-8 -*-

import json
from pathlib import Path
import ast
import re

root = Path(__file__).parents[1]
blog_data = root / "data/Blog.json"

files = []


for p in (root / "pages/content").glob("**"):
    if (f := p / "index.js").is_file():
        data = "["
        isList = False
        for line in f.read_text("utf-8").split("\n"):
            if isList:
                if line.startswith("];"):
                    break
                data += line.strip().strip("\n")
                continue
            if line.startswith("const Bloglist = ["):
                isList = True
        data = ast.literal_eval(
            re.sub(
                r"([,\]{}])([^,:[{\"\']+):",
                '\\g<1>"\\g<2>":',
                data.replace("'", '"').strip().strip(",") + "]",
            )
        )
        if not data:
            continue

        d_b = json.loads(blog_data.read_text("utf-8"))
        for card in data:
            if card not in d_b:
                d_b.append(card)

            with open(
                mode="r+",
                file=f"{root}/data/Blog.json",
                encoding="utf-8",
            ) as bp:
                json.dump(d_b, bp, indent=2, ensure_ascii=False)
