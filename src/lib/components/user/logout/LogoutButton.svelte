<script lang="ts">
  import { logoutUser } from "$lib/utils/backend/user";
  import { Button } from "carbon-components-svelte";

  function logout() {
    logoutUser();
  }
</script>

<div on:click={logout}>
  <Button>Logout</Button>
</div>
