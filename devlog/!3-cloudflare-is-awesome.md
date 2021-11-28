---
title: Cloudflare is Awesome! Happy 10th Birthday to Cloudflare.
author: Radhy
tags: blog, cloudflare, serverless, workers, web development
---

Cloudflare is awesome! Here in ProgNovel I use Cloudflare Workers as one of primary infastructure for serverless function, like fetching chapter documents stored in remote storage (currently in git repos as for staging), as well as an edge proxy servers to sit between (future) users and an image CDN resize proxy, currently being hosted on a [Fly.io](https://fly.io) free server.

I have experimented on Cloudflare Workers for months now, and been watching their development since they announced Workers to be publicly available for non-Cloudflare websites. For performance and cost scaling, it's pretty damn cool--if you're a web developer and haven't tried it I suggest you do. [It doesn't cost you anything to try!](https://workers.cloudflare.com)

This week, as for Cloudflare's tradition, they announced new products everyday during the week. In a preface post they give a bit of spoiler that two products will be revealed that would--in their opinion--change how people think about serverless (and perhaps the web development industry as we know it today). I expect they'll talk about Workers more powerful little brother, Workers Unbound, that's currently in closed beta. But oh boy, how wrong I was.

Fourth day entering their birthday week they didn't even talk about Workers Unbound. Instead, they revealed a cron job service and this strange thing Durable Object.

Durable Object? What is Durable Object? As cynist developers might tell you, this is going to be a marketing shinnenigans this-or-that company throws around to create hype. As someone who _hasn't the experience_ to use it I'm going to tell you that this isn't the case. Even if I don't even have a single experience trying it. Because just by reading their announcement post I can feel this is going to be big. Very, very big.

Imagine you can build Discord without hefty amount of investment and an army of genius developers to maintain chains of microservices behind the scene, imagine you can build Google Docs without having to burn money on paying researchers optimizing OT algorithm or other technology; all with _much much_ less the cost and faster performance. This is the promise of Cloudflare's new Durable Object--a significant push for stateful serverless.

Stateful serverless is new but isn't a stranger in recent years. [FaunaDB](https://www.fauna.com) is one of the first distributed database marketed for astute serverless crowd, and recently a new company called [Fly](https://fly.io) managed to create a microservice business that can spawn nimble, moveable containers with simple scaling that aimed to provide developers creating micro servers across the world easily. But FaunaDB, although has its in-house function capability to manage business logic, is inheretly a database provider and seemingly only interested in doing distributed databases, and Fly, although provides in-house redis solution for in-cache database, is primarily designed as "kinda serverless" server, has feature to automatically up and downscaling with kinda pay-per-use pricing, but not really a serverless business at heart.

Cloudflare also has its own implementation of stateful serverless previously, that is edge cache (that's based on V8 cache feature and is available for free, limited use cases) and a more powerful and more persistent cousin, KV Workers (based on key-value storage), that's currently only available for paid users. One main caveat that prevents KV Workers from being adopted massively is that due to Cloudflare's 200-ish data centers across the globe made it hard to scale on performance basis--its eventually consistent writing takes to a whole minute for an update to a key, a major deal breaker for most. Durable Object is here to change that.

## Durable Object

Fly has a very cool idea to make a service based on moveable Docker containers--thanks to AWS-backed firecracker VM making container isolation significantly more cost-effective--that can be duplicated and moved across the globe at will. Durable Object, at the very core from Cloudflare's explanation from their announcement post, work kinda the same; they automatically spawn an instance near users location, then can potentially move that same instance to the other side of the globe if needed. Fly makes a pretty convincing argument for how efficient this idea is because based on the timezone, you can move your server to the busier part of the globe, then move it somewhere else when people living there gone to sleep. Cloudflare doesn't seem to have this kind of feature yet, but from the way I see it, there's no telling it can be done for the future.

What's also make Fly and Cloudflare approach different is their choice of app containtment. Fly uses firecracker VM that can be converted from Docker images to draw the microservice crowd, while Cloudflare has inovated on serverless computing a few years ago by bringing in Chromium engine, V8, to the edge, significantly reduce serverless functions booting time down to mere milliseconds.

Faster performance might be a gimmick when the difference is about a few hundreds of milliseconds against competitors. But it's worth noting that the lighter their functions are, the less resource it takes to run their business, the more they can cut down their pricing for their customers.

This enables other companies or developers to create performant SAAS app with edge network capabilities, but with more competitive pricing--it's what made Amazon's AWS the big thing nearly a decade ago. This is just plain awesome.

Cloudflare doesn't gain this kind of advantages previously because for stateful serverless, KV Cache, isn't reliable enough for anyone, while AWS and Google Clould as well as Azure provide their in-house SQL and no-SQL databases in their platforms. With Durable Object, however, Cloudflare now has an ability where previously they were at the disadvantages, and from the way they represent it, Durable Object even could be a lower layer for people to create their own distributed databases. Maybe, instead using Google or Amazon owned datacenters, someone will instead create a direct competitor of FaunaDB's kind of database entirely on top of Cloudflare Workers, with competitive pricing but still make a bunch of profits from it.

Durable Object is not going to be a panacea in the world of serverless. But I'm sure as heck it's going to be a major force to make a significant shift in the world of cloud computing in the near future as more and more people succeed on making innovations with this shinny, new thing.

## Ready for Web 3.0

Next generation web will be distributed and smart. Few organizations such as IPFS, Ethereum, Interledger, Polkadot, they are leading the way to 3.0 with their own innovative breakhtrough. Cloudflare up until now was supportive to this movement, opening their services for IPFS and Ethereum for free with [Distributed Gateway](https://cloudflare-ipfs.com).

But this year's birthday week Cloudflare unexpectedly flexing their muscle on their distributed, edge serverless Workers, giving the groundwork for this commercial company to join the ranks of Web 3.0 pioneers, if they are not already. Although one company that do all the thing wouldn't exactly what you'd call distributed system, per se, but Cloudflare by doing so making distributed systems for the web more powerful and accessible than ever.

Anyway, from their other announcement on their serverless platform, that cron service that previously I ignored in favor of Durable Object--the thing that I don't bother to capitalize because while it's good, it just doesn't have the big wow effect--Cloudflare has hinted that their serverless will evolve further from basic HTTP request call. Their musing on the possibility of new Workers "handle events" got me excited for next year birthday announcement; what's next? Serverless distributed identity?

Distributed identity service seems a good idea. Maybe Cloudflare will release direct competitor for Firebase and AWS Amplify in the future, who knows?

**EDIT:**
A few months after writting this I found Cloudflare made another big move -- giving a free version of their Workers KV!

This is awesome. It's essentially enable us to create world class serverless platform even with their free-tier plan!

This change also effectively makes Cloudflare the first choice for ProgNovel's serverless stack, because there's just no better alternative in term of performance and cost-effectiveness at this very moment. Yes, ProgNovel's API is currently being rewritten just for this change!

**EDIT:**
Okay, after making their Workers KV free, now Cloudflare announced their Jamstack platform Cloudflare Pages, which in many ways, has more robust infastructure and better pricing than other Jamstack hosting providers! This is a very good news for Jamstack webapp projects like ProgNovel!
