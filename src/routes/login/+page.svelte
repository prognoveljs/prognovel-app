<script lang="ts">
  import { goto } from "$app/navigation";
  import LoginModal from "$lib/components/user/login/LoginModal.svelte";
  import { profile, userData } from "$lib/store/user";

  $: if ($profile?.id) {
    goto(`/profile/${$profile?.id}/`);
  }
</script>

<svelte:head>
  <title>Login</title>
</svelte:head>

<LoginModal />
