---
title: Introducing ProgNovel
author: Radhy
tags: blog, prognovel
---

You don't know ProgNovel. I'm here to explain what it is, and to explain why it's going to be a big deal for webnovel community.

ProgNovel is an open source website that anyone could get for free. Like WordPress, anyone can access its source code, make a copy, edit, and hosted it somewhere--though, at the time this blog was written, ProgNovel still in very early and in an unstable stage, thus source code still unavailable for public.

The things that makes ProgNovel different than existing website solutions like WordPress and Blogger is that it uses modern stacks and tools to help website owners creating modern web app, for novel site that they can own instead of relying on big platforms like Wattpad and Webnovel. Companies would need to hire developers with tens of thousands to hundreds of thousands dollars annual sallary to do this. I choose to give it away for free, because I believe this is the most right thing to do to make the webnovel community move forward.

## Technical summary

Technically, the terms most suitable to call ProgNovel is that it is a Progressive Web App (PWA for short), a kind of web app that gains tremendous popularity in the recent years due to big push from tech giants such as Google and Microsoft. Progressive Web App is web apps or websites that can be progressively enhanced to work as a native app, thus can be installed on desktop and mobile phones directly from the browser (currently works best with Chromium based browsers), and can usually works without internet connection (ProgNovel has a good support for offline reading mode!).

Progressive Web App is very cool. Why? Installable web app means you already have an app that can be used just the way your apps do from the playstore.

(Amazon, for example, made their game streaming service Luna a PWA because they just don't want to bother putting themselves under Apple or Google playstore!)

## Bleeding Edge Web Technologies

Making a website turns Progressive Web Ap that can be installed for offline reading is awesome, and currently I haven't seen any novel sites doing that, except for few companies (with tens or even hundreds of thousands dollars to spend) with their own mobile apps on Play Store. Although, in other community, I've seen some other websites with giant reader base developing their own version of PWA and offline reading.

Offline mode is awesome it's actually not the biggest ball in the park for ProgNovel. At least, for me, it's not the most challenging aspect (technically and creatively) during the developement of ProgNovel. What made ProgNovel loads smoothly aside from making the most out of the technologies behind PWA are technical details and stacks choices, third party cloudservices, sweeping through dozens of github repos, many of which takes a lot of time to be picked in trial-and-error fashion. During my time of research many choice of technologies that I made turned out to be not suited for ProgNovel (or simply I found better alternatives), which often lead to rewriting my code to make the new stack fit in. This process sometimes fun, sometimes boring, but mostly first it was fun then became boring because the lack of power of my current laptop made it tedious for me to even make change on a single line of CSS code (4GB RAM on Windows 10 is simply hell for multitasking between VS Code and Chrome/Edge browser).

Many of these rewriting take more time than I expected--hours if I'm very lucky but weeks even months usually. But looking back now, with ProgNovel becoming more and more mature, I wouldn't say all those spent development times was a waste of effort, as to make my ambition for ProgNovel to be a great web app for web novel site walking through the thorns of bleeding edge web technologies would be inventable.

After all, to ambitiously create a great product that is free for all, there's a need deliberately create a strong foundation, to design them with great care right from the bottom, while looking a head far for the future at the same time.

## Focusing on user experience, one step at a time

Many novel sites simply don't focus providing delightful user experiences. Most of the time this due to website owners don't have the resource, money, and skill to invest on their websites' user experience. It's easy to dismiss it as indie authors and fans translations group simply don't have the capital to hire developers, but, looking back, I think the reason why user experience in novel sites suck mainly due the lack of accessible tools available to community.

Think of WordPress. WordPress is the most common for authors/translators to publish their works outside of centralized platforms. It's accessibility and popularity has made it the obvious choice for anyone to publish any contents in written form. However, WordPress itself wasn't built to host serialized contents in mind. This resulting in many bad user experiences, primarily on "next chapters" links that content creators have to put manually resulting in many confusion in link placements, table of contents are not update for months, links directing to wrong pages, or the website owners simply don't bother to put "next chapter" link at all (and rely on WordPress's built-in next post links, which most of the times aren't accurate for websites that host more than one novel).
