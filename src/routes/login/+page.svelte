<script lang="ts">
  import { goto } from "$app/navigation";
  import LoginModal from "$lib/components/user/login/LoginModal.svelte";
  import { userData } from "$lib/store/user";

  $: if ($userData?.user?.id) {
    goto(`/profile/${$userData?.user?.id}/`);
  }
</script>

<svelte:head>
  <title>Login</title>
</svelte:head>

<LoginModal />
