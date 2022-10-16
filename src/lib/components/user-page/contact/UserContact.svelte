<script lang="ts">
  import { getContext, tick } from "svelte";
  import type { UserProfile } from "$typings/user";

  let profile: UserProfile = getContext("profileData");
</script>

<!-- email: {userData?.email || ""} -->
