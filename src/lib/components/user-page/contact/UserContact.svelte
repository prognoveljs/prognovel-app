<script lang="ts">
  import { getContext } from "svelte";
  import type { UserData } from "$typings/user";

  let userData: UserData = getContext("userData");
</script>

email: {userData?.email || ""}
