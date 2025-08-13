<script lang="ts">
  import { enhance } from "$app/forms";
  import type { PageProps } from "./$types";
  import CodeInput from "~/components/form-components/code-input.svelte";
  import Input from "~/components/form-components/input.svelte";
  import InfoTip from "~/components/info-tip/info-tip.svelte";

  type PhoneConfig = {
    filename: string;
    config: string;
  };

  let files = $state<PhoneConfig[]>([{ filename: "", config: "" }]);

  function addFile() {
    files.push({ filename: "", config: "" });
  }

  function removeFile(ind: number) {
    files.splice(ind, 1);
  }
</script>

<form method="POST" use:enhance>
  {#each files as file, i}
    <div class="container-row">
      <div class="container fit">
        {#if i >= 1}
          <button class="btn-close" onclick={() => removeFile(i)}>✕</button>
        {/if}
        <div class="row g-1" style="justify-content: center">
          <Input id={`input-${i}`} label="" placeholder={i == 0 ? "Phone Model" : "File Name"} bind:value={file.filename} required />
          <InfoTip center>Use a file name syntax like 't34w.cfg'</InfoTip>
        </div>
        <CodeInput id={`code-${i}`} label="" bind:value={file.config} />
        {#if i == files.length - 1}
          <div class="row g-1" style="justify-content: flex-end">
            <button class="btn" onclick={addFile}>Another File</button>
            <button type="submit" class="btn btn-primary">Add Model</button>
          </div>
        {/if}
      </div>
      {#if i == 0}
        <div class="container fit">
          <h2>Variables:</h2>
          <ul>
            <li>Placeholder</li>
          </ul>
        </div>
      {/if}
    </div>
  {/each}
</form>
