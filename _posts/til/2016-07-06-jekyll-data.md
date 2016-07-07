---
title: "How to use Data Files with Jekyll"
date: 2016-07-06 19:04:00 +0300
tags:
  - jekyll
  - yml
references:
  - "https://jekyllrb.com/docs/datafiles/"
---

I came across this one while creating the new version of this website. Basically you must create a folder named `_data`
in your project root.

You can create the data file as `json`, `yml` or `csv`. Find below an example of a data file in the `yml` format named
`social_networks.yml`:

<script src="https://gist.github.com/vitorfs/331414851bf9b6816ccd643f7104a8f9.js"></script>

And now how to use it in your HTML files:

<script src="https://gist.github.com/vitorfs/4ad54c89d8bbe6097effa206bd66f494.js"></script>
