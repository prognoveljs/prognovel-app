<script>
  import { registeredPlugins } from "store/read-page";
  import { onMount } from "svelte";

  onMount(() => {
    if (!process.browser) return;

    registerAuthorNote();
    registerNovelTrivia();
    registerUnlockBonus();
  });

  const registerAuthorNote = () => {
    const tag = "author-note";
    if ($registeredPlugins.has(tag)) return;
    import(/* webpackChunkName: "native-plugins" */ "plugins/web-components/authors-note")
      .then((plugin) => plugin.default())
      .catch((err) => {
        console.error("Error on establishing plugin authors-note");
        console.error(err);
      });

    $registeredPlugins.add(tag);
  };

  const registerNovelTrivia = () => {
    const tag = "novel-trivia";
    if ($registeredPlugins.has(tag)) return;
    import(/* webpackChunkName: "native-plugins" */ "plugins/web-components/novel-trivia")
      .then((plugin) => plugin.default())
      .catch((err) => {
        console.error("Error on establishing plugin novel-trivia");
        console.error(err);
      });
    $registeredPlugins.add(tag);
  };

  const registerUnlockBonus = () => {
    const tag1 = "unlock-bonus";
    const tag2 = "unlock-window";
    if ($registeredPlugins.has(tag1) && $registeredPlugins.has(tag2)) return;
    import(/* webpackChunkName: "native-plugins" */ "plugins/web-components/unlock-bonus")
      .then((plugin) => plugin.default())
      .catch((err) => {
        console.error("Error on establishing plugin unlock-bonus");
        console.error(err);
      });
    $registeredPlugins.add(tag1);
    $registeredPlugins.add(tag2);
  };
</script>
