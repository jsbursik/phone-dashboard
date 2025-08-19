<script lang="ts">
  import type { PageProps } from "./$types";

  import CodeInput from "~/components/form-components/code-input.svelte";
  import Input from "~/components/form-components/input.svelte";
  import InfoTip from "~/components/info-tip/info-tip.svelte";

  let { form }: PageProps = $props();
  let errors = form?.errors;
  let values = form?.values;
  let errorMap = $derived(errors ? Object.fromEntries(errors.map((e) => [e.field, e.message])) : {});

  type PhoneConfig = {
    filename: string;
    config: string;
  };

  let files = $state<PhoneConfig[]>([{ filename: "", config: "" }]);

  $effect(() => {
    if (values) {
      const inputKeys = Object.keys(values).filter((key) => key.startsWith("input-"));
      files = inputKeys.map((inputKey) => {
        const index = inputKey.split("-")[1];
        return {
          filename: (values[`input-${index}`] as string) || "",
          config: (values[`code-${index}`] as string) || "",
        };
      });
    }
  });

  function addFile() {
    files.push({ filename: "", config: "" });
  }

  function removeFile(ind: number) {
    files.splice(ind, 1);
  }
</script>

<form method="POST" id="config-form">
  <div class="container-row center">
    <div class="container">
      <Input id="phone-model" label="Model:" placeholder="Model Name" required />
    </div>
  </div>
  {#each files as file, i}
    <div class="container-row center">
      <div class="container fit">
        {#if i >= 1}
          <button class="btn-close" onclick={() => removeFile(i)}>✕</button>
        {/if}
        <div class="row g-1" style="justify-content: center">
          <Input id={`input-${i}`} label="" placeholder={"file_name.cfg"} bind:value={file.filename} error={errorMap[`input-${i}`]} required />
          <InfoTip
            >Use a file name syntax like 't34w.cfg'.<br /> You can also use variables in the name, like '$mac.boot' or '$MAC.boot' if it needs to be uppercase.'</InfoTip
          >
        </div>
        <CodeInput id={`code-${i}`} label="" bind:value={file.config} />
        {#if i == files.length - 1}
          <div class="row g-1" style="justify-content: flex-end">
            <button class="btn" onclick={addFile}>Another File</button>
            <button type="submit" class="btn btn-primary">Add Model</button>
          </div>
        {/if}
      </div>
    </div>
  {/each}
  <div class="container fit" id="variables">
    <h2>Variables:</h2>
    <ul>
      <li>Placeholder</li>
    </ul>
  </div>
</form>

<style>
</style>
