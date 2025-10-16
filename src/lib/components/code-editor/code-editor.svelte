<script lang="ts">
  import { onMount } from "svelte";
  import "./configLanguage";

  let { id = "editor", value = $bindable(), ...props } = $props();

  let editorContainer: HTMLElement;
  let name = id;

  onMount(async () => {
    const { createEditor } = await import("prism-code-editor");
    await import("prism-code-editor/layout.css");
    await import("prism-code-editor/themes/github-dark.css");

    const editor = createEditor(editorContainer, {
      language: "phone-config",
      value,
    });

    function updateValue() {
      if (editor) {
        value = editor.textarea.value;
      }
    }

    editor.options.onUpdate = () => updateValue();
    editor.textarea.name = name;
  });
</script>

<div {id} bind:this={editorContainer}></div>
