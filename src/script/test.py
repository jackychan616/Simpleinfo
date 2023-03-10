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
        with open(mode = "r", file = path,encoding="utf-8") as fp:
            data = fp.read()
            o = data[data.find('const Bloglist') : data.rfind('];')+1]
            final = o[o.find('['): o.rfind(']')+1].replace("'",'"')
            ans = ast.literal_eval(final)
            return ans
    except:
        pass

print(getfromfile(path=f"{root}\pages\content/ai-tutorial\index.js".replace(f"{chr(92)}","/")))