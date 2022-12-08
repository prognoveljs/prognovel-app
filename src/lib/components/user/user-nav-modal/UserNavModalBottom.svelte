<script lang="ts">
  import { logoutUser } from "$lib/utils/backend/user";
  import { Button } from "carbon-components-svelte";
  import { Logout } from "carbon-icons-svelte";

  function logout() {
    logoutUser();
  }
</script>

<section>
  <Button size="field" kind="danger" icon={Logout} on:click={logout}>Logout</Button>
</section>

<style lang="scss">
  section {
    display: flex;
    justify-content: end;
  }
</style>
