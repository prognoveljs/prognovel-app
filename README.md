# ProgNovel

![last commit](https://img.shields.io/github/last-commit/prognoveljs/prognovel-app)
![commit](https://img.shields.io/github/commit-activity/m/prognoveljs/prognovel-app)
![version](https://img.shields.io/github/package-json/v/prognoveljs/prognovel-app)
![netlify](https://img.shields.io/netlify/da504f88-e78c-4e63-bed4-52ebf13860b2)

ProgNovel is a JAMstack web app to make great webnovels. The main feature of ProgNovel, beside offline-first
web app with offline read features and great performance, is to be able to inject interactive plugins
for content creators to experiment with.

## Self-host ProgNovel

### Create backend and upload your first content

Although ProgNovel strives to be as simple as possible, it is currently very difficult to create a smooth flow for deployment due to how young Jamstack ecosystem is (the architecture ProgNovel uses). In the future as the toolings more mature, we're hoping to simplify the deployment process - but for now we'll have to get our hands dirty and go through several steps in getting your ProgNovel ready.

First, you need to get your backend hosted on Cloudflare Workers:

1. Get a Github and Cloudflare Workers account.
2. Login to Cloudflare Workers. In Workers section, get your `Account ID` and create a new `API token` from Cloudflare Workers edit template. Your `API token` can be used to access your Cloudflare Workers account, so treat it as a password and keep it in safe place.
3. Again in Workers section, create KV Workers.
4. Fork [ProgNovel backend](https://github.com/prognoveljs/prognovel-workers) repo.
5. In your new forked repo, go to Actions tab, and enable Workflow if it isn't enabled yet.
6. Then go to settings tab, look for Environments section, click the green button `Configure Environment` after you fill out the Name input with whatever you like. You need to do this in order to add two environment secrets, Cloudflare Account ID and API token (from step 2) - which you can create by click `+ Add secret` in Environment secret section. Fill both under environment secret names `CF_ACCOUNT_ID` and `CF_API_TOKEN`, case sensitive.
7. Go to `wrangler.toml`; fill your `account_id` with your Account ID and `kv-namespaces` with KV Workers ID you created in step 3.
8. Wait for Github Action to complete installing CF Workers backend for you.

Second, create a ProgNovel project in your computer and publish your first content.

1. Install ProgNovel CLI to your computer. You need a stable release of [Node.js](https://nodejs.org/) installed first, then in command prompt, run `npm install @prognovel/cli -g`.
2. In an empty folder, open command prompt and run `prognovel new`. Replace logo and configure settings as you'd like in `site-settings.yml` and list your website staffs and contributors in `site-contributors.yml`.
3. You need at least one novel to publish your own ProgNovel app. Again in root folder of your project (where `site-settings.yml` is), run `prognovel novel some-novel-id` (use alphabets and numbers with dash `-` to replace space for your novel ID). Configure novel settings as you'd like.
4. Once your content is ready, run `prognovel publish`. (PRO tips: if you create Discord bot and get Webhook for it, you can connect it in your `site-settings.yml` and your bot will automatically announce new content whenever you successfully publish your content)

After your contents already published in your backend, you are ready to install your frontend.

### Create frontend

ProgNovel works best when hosted on Jamstack platforms for performance and effiency purpose. Recommended platforms to host ProgNovel's frontend are Netlify, Vercel, and Cloudflare Page.

> Before hosting the frontend, make sure you don't skip hosting your first Cloudflare Workers backend and publishing content so that the frontend has something to build with.

1. Have a Github account and fork this repo.
2. You'll have have your own forked copy of prognovel frontend app in your Github account - use that to connect with Jamstack hosting platforms like [Netlify](https://www.netlify.com/), [Vercel](https://vercel.com/), or [Cloudflare Page](https://pages.cloudflare.com/).

**NOTE:** For now, it is recommended to host on Netlify since there are still bugs when hosting on Vercel and Cloudflare Pages.

3. Fill the build configuration with these:

- Build command: `npm run build`
- Publish/output directory: `__sapper__/export/`
- Under secret environment section, create new variable with key `BACKEND_API` and value of URL of your backend API you create previously (usually is `https://api.{your-cloudflare-account}.workers.dev`).

4. Wait for your hosting platforms building your ProgNovel App, which might takes 2~10 minutes depending on the hosting platform you used. Usually you'll be notified in the dashboard with the link of your newly created site once the build is complete.
5. If you need to upgrade your ProgNovel app, simply click fetch upstream in your forked repo. Your hosting platforms will usually detects change in your repo and will rebuild the app with the latest codebase. (Make sure to your installed backend and CLI compatible first before upgrading your frontend)
