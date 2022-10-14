<script lang="ts">
  import { getContext } from "svelte";
  import type { UserData, UserProfile } from "$typings/user";

  let userData: UserProfile = getContext("profileData");
</script>

<!-- email: {userData?.email || ""} -->
