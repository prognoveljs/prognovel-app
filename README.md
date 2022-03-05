# 🚀 ProgNovel

[![NodeJS Build](https://github.com/prognoveljs/prognovel-app/actions/workflows/nodejs.yml/badge.svg)](https://github.com/prognoveljs/prognovel-app/actions/workflows/nodejs.yml)
![maintained?](https://img.shields.io/badge/maintained%3F-yes-green.svg)
![last commit](https://img.shields.io/github/last-commit/prognoveljs/prognovel-app/develop)
![commit](https://img.shields.io/github/commit-activity/m/prognoveljs/prognovel-app/develop)
![version](https://img.shields.io/github/package-json/v/prognoveljs/prognovel-app)
![netlify](https://img.shields.io/netlify/da504f88-e78c-4e63-bed4-52ebf13860b2)

[Demo](https://demo.prognovel.com) | [Changelog](CHANGELOG.md) | [Promotional Video](https://youtu.be/4nBUq1638zk)

ProgNovel Promotional Video (YouTube):
[![ProgNovel Promotional Video](images/pv-screenshot.png)](https://youtu.be/4nBUq1638zk)

ProgNovel is a JAMstack web app to make great webnovels. The main feature of ProgNovel, beside offline-first
web app with offline read features and great performance, is to be able to inject interactive plugins
for content creators to experiment with. Because ProgNovel built mainly in Jamstack architecture, it can be hosted with great loading page performance on many Jamstack platform free-tier offerings such as Netlify and Cloudflare Workers.

## Screenshot

_ProgNovel on Desktop_
![ProgNovel on Desktop](images/prognovel-desktop.jpg "ProgNovel on Desktop")

_ProgNovel on Mobile_
![ProgNovel on Mobile](images/prognovel-mobile.jpg "ProgNovel on Mobile")

## Self-host ProgNovel

Although ProgNovel strives to be as simple as possible, it is currently very difficult to create a smooth flow for deployment due to how young Jamstack ecosystem is (the architecture ProgNovel uses). In the future as the toolings more mature, we're hoping to simplify the deployment process - but for now we'll have to get our hands dirty and go through several steps in getting your ProgNovel ready.

ProgNovel works best when hosted on Jamstack platforms for performance and effiency purpose. Recommended platforms to host ProgNovel's frontend are Netlify, Vercel, and Cloudflare Page.

> ❗ Before hosting the frontend, make sure you don't skip hosting your first ProgNovel backend on Cloudflare Workers and publishing content with ProgNovel CLI so that the frontend has something to build with.

[![Netlify deploy](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/prognoveljs/prognovel-app#BACKEND_API=https://prognovel-api.YOUR-CF-WORKERS-ACCOUNT.workers.dev)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fprognoveljs%2Fprognovel-app&env=BACKEND_API&envDescription=Connect%20your%20ProgNovel%20App%20frontend%20with%20an%20existing%20backend.&envLink=https%3A%2F%2Fgithub.com%2Fprognoveljs%2Fprognovel-workers&project-name=prognovel-app&repo-name=my-prognovel-app&redirect-url=https%3A%2F%2Fgithub.com%2Fprognoveljs%2Fprognovel-app&demo-title=ProgNovel%20App&demo-description=The%20next-generation%20web%20app%20to%20hose%20webnovels.&demo-url=https%3A%2F%2Fdemo.prognovel.com&demo-image=https%3A%2F%2Fprognovel-static.b-cdn.net%2Fprognovel-static-images%2Fprognovel-new-ss.png)

1. You need to get your backend hosted on Cloudflare Workers with some content already online on Cloudflare Workers network. Follow [how to get your first content published with ProgNovel CLI here](https://github.com/prognoveljs/prognovel-cli), then [read how to host ProgNovel backend here.](https://github.com/prognoveljs/prognovel-workers)
2. Click deploy button. Fill the environment variable `BACKEND_API` with the backend URL you get from hosting your backend in the previous step.
3. Wait for your hosting platforms building your ProgNovel App, which might takes 2~10 minutes depending on the hosting platform you used. Usually you'll be notified in the dashboard with the link of your newly created site once the build is complete.

### Upgrade your ProgNovel app

(WIP)

## Notes

- Technically, you can host ProgNovel frontend traditionally on a VPS (but not the backend). However it will be less optimized in term of performance and cost-value, and some pages will crash when directly entered their URL or reloading the page from their location. Therefore, ProgNovel will be limited on Jamstack and Serverless as its default hosting choice platform.

## Other links

[ProgNovel on Web Monetization community space](https://community.webmonetization.org/prognovel)<br/>
[ProgNovel on Twitter](https://twitter.com/ProgNovel)<br/>
[ProgNovel on Reddit](https://www.reddit.com/r/prognovel)

## Credits

![GftW](images/gftw.jpg)

ProgNovel is honored to join ranks of experimenters and innovators in the Web Monetization space as a spark Grant for the Web grantee during June~December 2021.

## License and Fair Use

ProgNovel is licensed with Apache 2.0. See [license details](LICENSE.md) for more information.
