---
title: "StackOverflow Exception Troubleshooting"
website: https://pypi.python.org/pypi/django-soet
source_code: https://github.com/vitorfs/soet/
date: 2016-07-18
technology: Python 2.7, Django 1.9
github_repo: soet
---

A simple Django Middleware for Exception Troubleshooting. It is meant to be used in debug mode only.

In a nutshell, the Middleware intercepts a exception thrown by a view and look up for the three most relevant questions
on StackOverflow and prints the result to the console.
