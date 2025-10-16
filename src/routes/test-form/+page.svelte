<script lang="ts">
  import CodeEditor from "$lib/components/code-editor/code-editor.svelte";
  import { Input } from "@jsbursik/magic-ui";

  let editorCount = $state(1);
  let editors = $state<string[]>([]);
  let values = $state<Record<string, string>>({});
  let variables = $state<string[]>([]);

  function addFile(e: Event) {
    e.preventDefault();
    editors.push(`editor-${editorCount++}`);
  }

  function removeFile(e: Event, editor: string) {
    e.preventDefault();
    editors = editors.filter((e) => e !== editor);
  }

  $effect(() => {
    // let allText = "";
    // let reg = /\$\w+/;

    // Object.keys(values).forEach((key) => {
    //   allText += "," + values[key];
    // });
    // console.log(allText);
    // variables = [...new Set(allText.match(reg))];
    $inspect(values);
  });
</script>

<div class="center">
  <div class="card" style="position: relative">
    <form class="stack" method="POST">
      <fieldset class="stack">
        <legend style="margin-bottom: -100%;">Phone Base Config</legend>
        <div>
          <label for="phone-model">Phone Model</label>
          <Input type="text" name="phone-model" id="phone-model" placeholder="Phone Model" value={values["phone-model"]} required />
        </div>
        <div>
          <label for="phone-cfg">Phone Config</label>
          <CodeEditor id="phone-cfg" value={values["phone-cfg"]} />
        </div>
      </fieldset>
      {#each editors as editor (editor)}
        <fieldset class="stack">
          <button class="close" onclick={(e) => removeFile(e, editor)}>&times;</button>
          <legend>Additional File</legend>
          <div>
            <label for={editor}>File Name</label>
            <Input type="text" name={`${editor}-id`} id={`${editor}-id`} placeholder="File Name" value={values[`${editor}-id`]} required />
          </div>
          <div>
            <label for={`${editor}-code`}>File Code</label>
            <CodeEditor id={`${editor}-code`} value={values[`${editor}-code`]} />
          </div>
        </fieldset>
      {/each}
      <div class="cluster" style="place-self: flex-end;">
        <button onclick={(e) => addFile(e)}>Add File</button>
        <button type="submit" class="btn-success">Submit</button>
      </div>
    </form>
    <div class="floating-container">
      <div class="card">
        <h3 class="center-text">Variables</h3>
        {#each variables as variable}
          <p>{variable}</p>
        {/each}
      </div>
    </div>
  </div>
</div>

<style>
  fieldset:has(> button.close) {
    position: relative;
  }

  button.close {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 9999;
    padding: 0.5rem;
    margin: 0;

    background: unset;
    color: color-mix(in srgb, var(--color-danger), 20% black);
    font-size: 1.4rem;

    &:hover {
      color: var(--color-danger);
      box-shadow: unset;
    }
  }

  .floating-container {
    --container-width: 16rem;

    position: absolute;
    width: var(--container-width);
    height: 100%;
    top: 0;
    right: calc(var(--container-width) * -1 - 1rem);

    > .card {
      position: sticky;
      top: 0;
    }
  }
</style>
