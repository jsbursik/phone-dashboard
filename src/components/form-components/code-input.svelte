<script lang="ts">
  let { id, label, value = $bindable(""), error = "", placeholder = "", rows = 10, ...props } = $props();

  import "./code-input.css";

  let textareaRef: HTMLTextAreaElement;
  let lines = $state(["1"]);

  function updateLineNumbers() {
    const lineCount = value.split("\n").length;
    lines = Array.from({ length: Math.max(lineCount, rows) }, (_, i) => String(i + 1));
  }

  function handleInput() {
    updateLineNumbers();
  }

  function handleScroll() {
    const lineNumbers = document.querySelector(`#${id}-lines`) as HTMLElement;
    if (lineNumbers && textareaRef) {
      lineNumbers.scrollTop = textareaRef.scrollTop;
    }
  }

  $effect(() => {
    updateLineNumbers();
  });
</script>

<span class="form-control">
  <label for={id}>{label}</label>
  <div class="code-input-container" class:invalid={error}>
    <div class="line-numbers" id="{id}-lines">
      {#each lines as line}
        <div class="line-number">{line}</div>
      {/each}
    </div>
    <textarea
      bind:this={textareaRef}
      class="code-textarea"
      {id}
      name={id}
      bind:value
      {placeholder}
      {rows}
      spellcheck="false"
      autocomplete="off"
      autocapitalize="off"
      oninput={handleInput}
      onscroll={handleScroll}
      {...props}
    ></textarea>
    <div class="syntax-overlay" aria-hidden="true">
      {@html value.replace(
        /^(\w+)\s*([:=])\s*(.+)$/gm,
        '<span class="config-key">$1</span><span class="config-separator">$2</span><span class="config-value">$3</span>'
      )}
    </div>
  </div>
  {#if error}<small class="error">{error}</small>{/if}
</span>
