---
title: "How to change OS X default screenshot folder"
date: 2016-07-02 13:44:00 +0300
tags:
  - mac
  - osx
  - el capitain
references:
  - "https://discussions.apple.com/docs/DOC-9081"
---

That's something that has always bothered me. Unfortunately there is no way to do it via a user interface. But it can
be easily achieved running the following commands in the Terminal:

<script src="https://gist.github.com/vitorfs/3e575c777fd4d421ff173ef5be5481dc.js"></script>

Change the `~/Desktop/Screenshots/` with the desired path you want to save the screenshots. It is important to note
that you need to create the target folder before changing the path.