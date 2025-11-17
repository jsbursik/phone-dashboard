<script lang="ts">
  import CodeEditor from "$lib/components/code-editor/code-editor.svelte";
  import CustomInput from "$lib/components/form-components/CustomInput.svelte";
  import { Input, toastStore } from "@jsbursik/magic-ui";
  import { filename } from "$lib/form-validation";
  import { IconX } from "@tabler/icons-svelte";
  import "../config.css";

  let editorCount = $state(1);
  let editors = $state<string[]>([]);
  let values = $state<Record<string, string>>({
    "phone-model": "",
    "phone-cfg": "",
    "phone-cfg-filename": "",
  });

  let errors = $state<Record<string, string>>({});

  let variables = $derived.by(() => {
    const allText = Object.values(values).join(" ");
    const matches = allText.match(/\$\w+/g);
    return matches ? [...new Set(matches)] : [];
  });

  function addFile(e: Event) {
    e.preventDefault();
    const editorId = `editor-${editorCount++}`;
    // Initialize values for the new editor BEFORE adding it
    values[`${editorId}-id`] = "";
    values[`${editorId}-code`] = "";
    editors.push(editorId);
  }

  function removeFile(e: Event, editor: string) {
    e.preventDefault();
    editors = editors.filter((e) => e !== editor);
    // Clean up values for removed editor
    delete values[`${editor}-id`];
    delete values[`${editor}-code`];
  }

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const response = await fetch("/api/phone-config", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        values,
        editors,
        variables,
      }),
    });

    if (!response.ok) {
      const result = await response.json();
      errors = result.errors || {};
      toastStore.show(`Error: ${errors}`, "danger");
    } else {
      window.location.href = "/phones/add-config";
      toastStore.show("Phone config added!", "success");
    }
  }
</script>

<div class="three-col">
  <div class="mid-col">
    <div class="card" style="position: relative">
      <form class="stack" onsubmit={handleSubmit}>
        <fieldset class="stack">
          <legend style="margin-bottom: -100%;">Phone Base Config</legend>
          <div>
            <label for="phone-model">Phone Model</label>
            <Input type="text" name="phone-model" id="phone-model" placeholder="Phone Model" bind:value={values["phone-model"]} required />
          </div>
          <div>
            <label for="file-name">Phone Config Filename</label>
            <CustomInput
              type="text"
              name="file-name"
              id="file-name"
              placeholder="$mac.cfg"
              bind:value={values["phone-cfg-filename"]}
              validator={filename}
              required
            />
          </div>
          <div>
            <label for="phone-cfg">Phone Config</label>
            <CodeEditor id="phone-cfg" bind:value={values["phone-cfg"]} />
          </div>
        </fieldset>

        {#each editors as editor (editor)}
          <fieldset class="stack">
            <button class="close" onclick={(e) => removeFile(e, editor)}>
              <IconX size={16} />
            </button>
            <legend>Additional File</legend>
            <div>
              <label for={editor}>File Name</label>
              <CustomInput
                type="text"
                name={`${editor}-id`}
                id={`${editor}-id`}
                placeholder="$model.boot"
                bind:value={values[`${editor}-id`]}
                validator={filename}
                required
              />
            </div>
            <div>
              <label for={`${editor}-code`}>File Code</label>
              <CodeEditor id={`${editor}-code`} bind:value={values[`${editor}-code`]} />
            </div>
          </fieldset>
        {/each}

        <div class="cluster" style="place-self: flex-end;">
          <button onclick={(e) => addFile(e)}>Add File</button>
          <button type="submit" class="btn-success">Submit</button>
        </div>
      </form>
    </div>
  </div>
  <div class="right-col" style="position: relative;">
    <div class="floating-container">
      <div class="card center-text">
        <h3>Variables</h3>
        {#if variables.length > 0}
          {#each variables as variable}
            <p>{variable}</p>
          {/each}
        {:else}
          <p style="color: var(--color-text-muted, #666); font-style: italic;">No variables found</p>
        {/if}
      </div>
    </div>
  </div>
</div>
