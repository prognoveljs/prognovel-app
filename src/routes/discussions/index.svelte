<script context="module" lang="ts">
  import { goto } from "@sapper/app";

  export async function preload() {
    goto("/discussions/all");
  }
</script>
