---
title: Hello World
author: Radhy
tags: blog
createdAt: 2021-02-26T10:21:41.298Z
---

My first blog post for ProgNovel!

I previously always wanted a blog of my own but I procrastinated for months because I'm too lazy to learn popular static site generators like Gatsby or Hugo.

Ideas on making JAMstack blog based on Sapper has been on my mind for a while, which by default Sapper has very limited support on it. I tried on making markdown based blog, exposed to new things like glob and markdown-based things like frontmatter, but I failed because I couldn't make it happen back then.

Months later, precisely a few days ago since this blog is written, I revisited the idea, armed with a slightly more knowledge on Sapper. I'm preparing for a war, expecting a few days of marathon coding and sweeping through dozens of stackoverflow threads and github repo issues, only to realize the problem that made my head aches was one line that I previously didn't notice -- nodejs glob function I used back then was asynchronous with callbacks, while current Sapper implementation for server that I used was synchronous, and so after change the glob synchronous to a synchronous one the markdown-based blog for my ProgNovel is born.

I succeed. Yet I couldn't help but feel dumb about it.
