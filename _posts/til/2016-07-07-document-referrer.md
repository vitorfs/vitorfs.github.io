---
title: "How to access the referrer link of a web page"
date: 2016-07-07 17:17:00 +0300
tags: javascript
references:
  - https://developer.mozilla.org/en-US/docs/Web/API/Document/referrer
---

This is one of those things that I knew it was possible to achieve, but never really came across the solution on how to
access this piece of information.

<script src="https://gist.github.com/vitorfs/adea0b4aca11a9f56350ccd6c83ab4c5.js"></script>

The value is an empty string if the user navigated to the page directly (not through a link, but, for example, via a
bookmark).
