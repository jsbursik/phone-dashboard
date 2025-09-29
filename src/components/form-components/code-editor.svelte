<script lang="ts">
  import { onMount } from "svelte";
  import { languages } from "prism-code-editor/prism";
  import "prism-code-editor/layout.css";
  import "prism-code-editor/scrollbar.css";
  import "prism-code-editor/themes/dracula.css";
  import "prism-code-editor/prism/languages/markup";
  import "./code-editor.css";

  let { id, ...props } = $props();

  languages.phone_configs = {
    comment: {
      pattern: /#.*/,
    },
    url: {
      pattern: /\[([^\]]+)\]/,
    },
    keyword: [/(.*?)=/, /(.*?):/],
    function: {
      pattern: /\$.*/,
    },
  };

  const filler = `#This is a comment
this:that
that=$test`;

  onMount(async () => {
    const { createEditor } = await import("prism-code-editor");

    const editor = createEditor(`#${id}`, {
      language: "phone_configs",
      value: filler,
    });
  });
</script>

<div {id} style="display: grid; width: 80ch; height: 25ch"></div>
