---
title: "How to change Python recursion limit"
date: 2016-07-09 12:00:00 +0300
tags: python
references:
  - https://docs.python.org/3/library/sys.html#sys.setrecursionlimit
---

This is how you set the maximum depth of the Python interpreter stack to limit. This limit prevents infinite recursion
from causing an overflow of the C stack and crashing Python. The limit is platform dependant though.

<script src="https://gist.github.com/vitorfs/a6481883d20c74c3f291ed847cb53903.js"></script>