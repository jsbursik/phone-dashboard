<script lang="ts">
  import Icon from "@iconify/svelte";

  let { center = false, ...props } = $props();

  import "./info-tip.css";
</script>

<span class="info-tip">
  <Icon icon="fa6-solid:circle-info" />
  <div id="info-tip" style={center ? "text-align: center" : ""}>{@render props.children()}</div>
</span>
