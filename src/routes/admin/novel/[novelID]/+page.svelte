<script lang="ts">
  throw new Error("@migration task: Add data prop (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292707)");

  import { faSave } from "@fortawesome/free-solid-svg-icons";
  import Icon from "$lib/components/Icon.svelte";
  import { isBrowser } from "$lib/store/states";
  import { getDataFromFile, isGUIWebSocketReady } from "$lib/utils/admin";
  import { saveDataForFile } from "$lib/utils/admin/data";
  import { activeNovels, adminNovelsData, isAdminGUIConnected } from "$lib/utils/admin/_store";
  import { deepEqual } from "$lib/utils/misc";

  export let novel;
  $: novelTitle = $adminNovelsData?.[novel]?.title || novel;
  let isActive;

  let dataSnapshot = {};
  let synopsisSnapshot = "";
  let contributorsSnapshot = {
    mm: {
      name: "--",
      paymentPointer: "--",
    },
  };
  let title: string = "";
  let author: string = "";
  let contact: string = "";
  let demographic: string = "";
  let genre: string = "";
  let tags: string = "";
  let discord_group_id: string = "";
  let synopsis: string = "";
  let contributors: {
    [id: string]: {
      name?: string;
      email?: string;
      paymentPointer?: string;
    };
  } = {};

  $: getDataStructure = () => {
    return {
      title: title || "",
      author: author || "",
      demographic: demographic || "",
      contact: contact || "",
      genre: genre || "",
      tags: tags || "",
      discord_group_id: discord_group_id || "",
      // contributors: contributorsSnaphsot,
    };
  };

  $: if (isBrowser && novel) onStart();
  async function onStart() {
    await isGUIWebSocketReady;
    const [data_snapshot, synospsis_snapshot, contributors_snapshot] = await Promise.all([
      getDataFromFile(`${novel}/info`),
      getDataFromFile(`${novel}/synopsis`),
      getDataFromFile(`${novel}/contributorsConfig`),
    ]);
    dataSnapshot = {
      title: data_snapshot?.data?.title || "",
      author: data_snapshot?.data?.author || "",
      demographic: data_snapshot?.data?.demographic || "",
      contact: data_snapshot?.data?.contact || "",
      genre: data_snapshot?.data?.genre || "",
      tags: data_snapshot?.data?.tags || "",
      discord_group_id: data_snapshot.data.discord_group_id || "",
    };
    synopsisSnapshot = synospsis_snapshot.data;
    contributorsSnapshot = contributors_snapshot.data;
    title = dataSnapshot.title || "";
    author = dataSnapshot.author || "";
    demographic = dataSnapshot.demographic || "";
    contact = dataSnapshot.contact || "";
    genre = dataSnapshot.genre || "";
    tags = dataSnapshot.tags || "";
    discord_group_id = dataSnapshot.discord_group_id || "";
    synopsis = synopsisSnapshot || "";
    contributors = contributorsSnapshot || {};

    (async () => {
      await isGUIWebSocketReady;
      isActive = $activeNovels.includes(novel);
    })();
  }

  $: canSubmit = () => {
    return !(deepEqual(dataSnapshot, getDataStructure()) && deepEqual(synopsisSnapshot, synopsis));
  };

  function saveData() {
    saveDataForFile(`${novel}/info`, getDataStructure());
    saveDataForFile(`${novel}/synopsis`, synopsis);
    dataSnapshot = getDataStructure();
    synopsisSnapshot = synopsis;
  }

  function changeActiveState() {
    const novels = isActive
      ? [...new Set([...$activeNovels, novel])]
      : $activeNovels.filter((n) => n !== novel);
    saveDataForFile("settings", {
      novels,
    });
  }
</script>

<h1>{novelTitle}</h1>
<strong>Novel ID:</strong> <em>{novel}</em><br />
<strong>Publish novel: </strong>
<input
  bind:checked={isActive}
  on:change={changeActiveState}
  type="checkbox"
  name="active-novel"
  id="active-novel"
/>
<div class="flex">
  <label for="novel-title">Novel title</label>
  <input
    bind:value={title}
    placeholder="My Awesome Novel"
    type="text"
    name="novel-title"
    id="novel-title"
  />
  <label for="author">Author</label>
  <input bind:value={author} placeholder="My Awesome Novel" type="text" name="author" id="author" />
  <label for="demographic">Demographic</label>
  <input
    bind:value={demographic}
    placeholder="Shounen / Young Adult"
    type="text"
    name="demographic"
    id="demographic"
  />
  <label for="genre">Genre</label>
  <input
    bind:value={genre}
    placeholder="fantasy, drama, comedy"
    type="text"
    name="genre"
    id="genre"
  />
  <label for="tags">Tags</label>
  <input
    bind:value={tags}
    placeholder="demo novel, translated novel, web novel"
    type="text"
    name="tags"
    id="tags"
  />
  <label for="contact">Contact</label>
  <input
    bind:value={contact}
    placeholder="author@example.com"
    type="text"
    name="contact"
    id="contact"
  />
  <label for="discord-group-id">Discord Group ID</label>
  <input
    bind:value={discord_group_id}
    placeholder="888472524xxxxx"
    type="number"
    name="discord-group-id"
    id="discord-group-id"
  />
  <label for="synopsis">Synopsis</label>
  <div bind:innerHTML={synopsis} contenteditable="true" id="synopsis" />

  <button class="submit" disabled={!canSubmit()} on:click={saveData}>
    <Icon icon={faSave} color="var(--body-text-color)" size="1.5em" paddingBottom="4px" /> Save</button
  >
</div>

<h2>Chapters (WIP)</h2>
<p>
  Feature to edit chapters in admin dashboard is under construction. In the meantime, you can create
  and edit chapter markdown files manually. Please read <a
    href="https://github.com/prognoveljs/prognovel-cli"
  >
    this instruction</a
  > to do so.
</p>

<h2>Contributors (WIP)</h2>
<article>
  <em
    >List the name of all contributors of {novelTitle} here. Their works will be reimbursed in real-time
    through revenue share from Web Monetization subscriptions built-in into ProgNovel.
  </em>
  <div class="grid">
    {#each Object.keys(contributors) as id}
      <section>
        {contributors[id].name}
        <em>{contributors[id].paymentPointer}</em>
      </section>
    {/each}
  </div>
</article>

<style lang="scss">
  .flex {
    display: flex;
    flex-direction: column;
    max-width: 30em;

    #synopsis {
      min-height: 20em;
      border-radius: 2px;
      background-color: #fff3;
    }
  }

  p {
    max-width: 36em;

    a {
      color: var(--primary-color-lighten-2);
    }
  }

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
      opacity: 0.6 section {
        padding: 24px;
        border-radius: 4px;
        box-shadow: 0 2px 8px #0003;
        border: 2px solid #fff2;
      }
    }
  }
</style>
