<script context="module" lang="ts">
  export async function preload({ params }) {
    return {
      novel: params.novelID,
    };
  }
</script>

<script lang="ts">
  export let novel;

  $: novelTitle = novel;

  let contributors = [
    {
      name: "Jonathan",
      email: "test1@email.com",
      paymentPointer: "$wallet.address.com/test-1",
    },
    {
      name: "April",
      email: "test2@email.com",
      paymentPointer: "$wallet.address.com/test-2",
    },
    {
      name: "Emmy",
      email: "test3@email.com",
      paymentPointer: "$wallet.address.com/test-3",
    },
    {
      name: "Samaludin",
      email: "test4@email.com",
      paymentPointer: "$wallet.address.com/test-4",
    },
  ];
</script>

<h1>{novel}</h1>

<label for="site-title">Site title</label>
<input placeholder="My Great ProgNovel Site" type="text" name="site-title" id="site-title" />
<label for="contact">Contact email</label>
<input placeholder="admin@example.com" type="text" name="contact" id="contact" />
<label for="disqus-id">Disqus Shortname ID</label>
<input placeholder="my-disqus-channel" type="text" name="disqus-id" id="disqus-id" />
<label for="image-resizer-service">Image resizer service</label>
<input
  placeholder="https://www.example-image-resizer.com"
  type="text"
  name="image-resizer-service"
  id="image-resizer-service"
/>

<h2>Contributors</h2>
<article>
  <em
    >List the name of all contributors of {novelTitle} here. Their works will be reimbursed in real-time
    through revenue share from Web Monetization subscriptions built-in into ProgNovel.
  </em>
  <div class="grid">
    {#each contributors as { name, email, paymentPointer }}
      <section>
        {name}
        <em>{paymentPointer}</em>
      </section>
    {/each}
  </div>
</article>

<style lang="scss">
  article {
    max-width: 76em;

    & > em {
      margin-bottom: 1.5em;
      width: 60%;
      display: block;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1em;
      section {
        padding: 24px;
        border-radius: 4px;
        box-shadow: 0 2px 8px #0003;
        border: 2px solid #fff2;
      }
    }
  }
</style>
