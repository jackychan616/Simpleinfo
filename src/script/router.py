#!/usr/bin/env python3
# -*- coding: UTF-8 -*-

import ast
import json
import re
from pathlib import Path

root = Path(__file__).parents[1]
blog_data = root / "data/Blog.json"

for p in (root / "pages/content").glob("**"):
    if not (f := p / "index.js").is_file():
        continue

    data = "["
    is_list = False
    for line in f.read_text("utf-8").split("\n"):
        if is_list:
            if line.startswith("];"):
                break
            data += line.strip().strip("\n")
            continue
        if line.startswith("const Bloglist = ["):
            is_list = True

    parsed = ast.literal_eval(
        re.sub(
            r"([,\]{}])([^,:[{\"\']+):",
            '\\g<1>"\\g<2>":',
            data.replace("'", '"').strip().strip(",") + "]",
        )
    )

    if not parsed:
        continue

    existing = json.loads(blog_data.read_text("utf-8"))
    changed = False

    for card in parsed:
        if card not in existing:
            existing.append(card)
            changed = True

    if changed:
        blog_data.write_text(
            json.dumps(existing, indent=2, ensure_ascii=False),
            encoding="utf-8",
        )
