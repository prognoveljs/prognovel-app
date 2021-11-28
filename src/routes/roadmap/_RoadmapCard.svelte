<script lang="ts">
  export let type: "bug" | "feature" | "improvement" | "misc" | "plugin";
  export let title: string;
  $: bug = type === "bug";
  $: feature = type === "feature";
  $: improvement = type === "improvement";
  $: plugin = type === "plugin";
  $: misc = type === "misc";
  $: label =
    type === "bug"
      ? "🐞 bug fixing"
      : type === "feature"
      ? "🎉 feature"
      : type === "improvement"
      ? "🔨 improvement"
      : type === "plugin"
      ? "🔌 plugin"
      : "misc";
</script>

<div class="card" class:plugin class:bug class:feature class:improvement class:misc>
  <div class="header">{title}</div>
  <div class="slot">
    <slot />
    <div class="label">{label}</div>
  </div>
</div>

<style lang="scss">
  $paddingWidth: 24px;
  $paddingTop: 24px;
  $paddingBottom: 48px;
  $borderSize: 2px;

  .card {
    background: #0003;
    border-radius: 4px;
    margin-bottom: 12px;
    position: relative;
    border: $borderSize solid transparent;

    :global(:not(.completed)) > &:hover {
      box-shadow: 0 4px 12px #0003, 0 12px 18px #0001;
    }

    .header {
      font-size: 1.3em;
      padding: #{$paddingTop} $paddingWidth 18px;
      background-color: #0003;
      font-weight: 500;
      margin: #{$borderSize * -1};
      margin-bottom: 18px;
      line-height: 1.2;
    }

    .slot {
      padding: 0 $paddingWidth $paddingBottom;
    }
  }

  .label {
    margin-top: 12px;
    text-align: right;
    padding: 4px;
    border-radius: 2px;
    background-color: #0002;
    font-size: 0.9em;
    position: absolute;
    bottom: 8px;
    right: 8px;
    font-weight: 300;
  }

  .bug {
    background: #f223;
  }
  .feature {
    background: rgba(67, 34, 255, 0.452);
  }
  .improvement {
    background: rgba(109, 182, 100, 0.2);
  }
  .plugin {
    background: rgba(194, 184, 98, 0.3);
  }
  .misc {
    background: rgba(197, 197, 197, 0.2);
  }
</style>
