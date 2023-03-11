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

def scan(P):
        for p in os.listdir(P):
            if ".js" in p:
                  continue
            for f in os.listdir(P + p):
                if f == "index.js":
                    pa = P+f"{p}\index.js".replace(f"{chr(92)}","/")
                    l = getfromfile(pa)
                    if l != None:
                        print(l)
                elif not ".js" in P + p + chr(92) + f:
                     scan(P + p + chr(92) + f)
scan(P = f"{root}\pages\content\code-tutorial{chr(92)}")        
    
                    


                    

#getfromfile(path=f"{root}\pages\content/code-turorial\index.js".replace(f"{chr(92)}","/"))