<script lang="ts">
  import type { AdditionalFiles, PhoneConfigSchema } from "$lib/types";
  import { Input, toastStore } from "@jsbursik/magic-ui";
  import { filename, validateModelSpecificFile } from "$lib/form-validation";
  import CodeEditor from "$lib/components/code-editor/code-editor.svelte";
  import { IconX } from "@tabler/icons-svelte";
  import "../config.css";

  let { data, ...props } = $props();
  let { models } = data;

  let errors = $state<Record<string, string>>({});

  let selectedModel = $state<string | null>();
  let phone_cfg = $state<PhoneConfigSchema | null>();

  let editValues = $state<Record<string, string> | null>();
  let editFiles = $state<Array<AdditionalFiles>>([]);
  let mainCfgIsModelSpecific = $state(false);
  let binaryFiles = $state<Record<number, File | null>>({});

  async function handleModelSelect(id: number, model: string) {
    selectedModel = model;
    const response = await fetch(`/api/phone-config/${id}`);
    const result = await response.json();
    phone_cfg = response.ok ? result : null;

    if (phone_cfg) {
      editValues = {
        "phone-model": phone_cfg.phone_model,
        "phone-cfg-filename": phone_cfg.phone_cfg_filename,
        "phone-cfg": phone_cfg.phone_cfg,
      };
      mainCfgIsModelSpecific = phone_cfg.phone_cfg_is_model_specific || false;
      editFiles = [...phone_cfg.additional_files];
      binaryFiles = {};
    }
  }

  function addFile() {
    editFiles.push({
      filename: "",
      content: "",
      is_model_specific: false,
      is_binary: false,
    });
  }

  function removeFile(index: number) {
    editFiles = editFiles.filter((_, i) => i !== index);
    delete binaryFiles[index];
  }

  function handleBinaryUpload(index: number, e: Event) {
    const input = e.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      binaryFiles[index] = input.files[0];
      editFiles[index].filename = input.files[0].name;
      // Read file as base64 for storage
      const reader = new FileReader();
      reader.onload = () => {
        editFiles[index].content = reader.result as string;
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // Validate model-specific files
    const mainError = validateModelSpecificFile(
      editValues!["phone-cfg-filename"],
      editValues!["phone-cfg"],
      mainCfgIsModelSpecific
    );
    if (mainError) {
      toastStore.show(mainError, "danger");
      return;
    }

    for (const file of editFiles) {
      const fileError = validateModelSpecificFile(file.filename, file.content, file.is_model_specific);
      if (fileError) {
        toastStore.show(fileError, "danger");
        return;
      }
    }

    const response = await fetch(`/api/phone-config/${phone_cfg!.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        id: phone_cfg!.id,
        ...editValues,
        phone_cfg_is_model_specific: mainCfgIsModelSpecific,
        additional_files: editFiles,
      }),
    });

    if (!response.ok) {
      const result = await response.json();
      errors = result.errors || {};
      toastStore.show(`Error: ${result.message}`, "danger");
    } else {
      window.location.href = "/phones/edit-config";
      toastStore.show("Phone configuration updated!", "success");
    }
  }

  async function deleteConfig() {
    const response = await fetch(`/api/phone-config/${phone_cfg!.id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      const result = await response.json();
      errors = result.errors || {};
      toastStore.show(`Error: ${result.message}`, "danger");
    } else {
      window.location.href = "/phones/edit-config";
      toastStore.show("Phone config deleted!", "success");
    }
  }
</script>

<div class="three-col">
  <div class={selectedModel ? "left-col" : "mid-col"}>
    <div class="card center" style="width: fit-content;">
      {#if models.length === 0}
        <h3>No models found</h3>
        <a href="/phones/add-config" class="btn btn-primary" style="width: 100%; text-align: center">Add Phone Config</a>
      {/if}
      {#each models as model}
        <button onclick={() => handleModelSelect(model.id, model.phone_model)} style="width: 16rem;">{model.phone_model}</button>
      {/each}
    </div>
  </div>
  {#if selectedModel && editValues}
    <div class="mid-col">
      <div class="card">
        <form class="stack" onsubmit={handleSubmit}>
          <fieldset class="stack">
            <legend style="margin-bottom: -100%;">Phone Base Config</legend>
            <div>
              <label for="phone-model">Phone Model</label>
              <Input type="text" id="phone-model" name="phone-model" bind:value={editValues["phone-model"]} placeholder="Phone Model" required />
            </div>
            <div>
              <label for="file-name">Phone Config Filename</label>
              <Input
                type="text"
                name="phone-cfg-filename"
                id="phone-cfg-filename"
                placeholder="$mac.cfg"
                bind:value={editValues["phone-cfg-filename"]}
                validator={filename}
                required
              />
            </div>
            <div>
              <label>
                <input type="checkbox" bind:checked={mainCfgIsModelSpecific} />
                Model-Specific (no variables)
              </label>
            </div>
            <div>
              <label for="phone-cfg">Phone Config</label>
              <CodeEditor id="phone-cfg" bind:value={editValues["phone-cfg"]} />
            </div>
          </fieldset>

          {#each editFiles as file, i (file)}
            <fieldset class="stack">
              <button type="button" class="close" onclick={() => removeFile(i)}><IconX size={16} /></button>
              <legend>Additional File</legend>
              <div>
                <label for={`file-${i}-filename`}>File Name</label>
                <Input
                  type="text"
                  name={`file-${i}-filename`}
                  id={`file-${i}-filename`}
                  placeholder="$model.boot"
                  bind:value={file.filename}
                  validator={filename}
                  required={!file.is_binary}
                />
              </div>
              <div>
                <label>
                  <input type="checkbox" bind:checked={file.is_model_specific} />
                  Model-Specific (no variables)
                </label>
              </div>
              <div>
                <label>
                  <input
                    type="checkbox"
                    bind:checked={file.is_binary}
                    onchange={() => {
                      if (!file.is_binary) {
                        file.content = "";
                        binaryFiles[i] = null;
                      }
                    }}
                  />
                  Binary File
                </label>
              </div>
              {#if file.is_binary}
                <div>
                  <label for={`file-${i}-upload`}>Upload Binary</label>
                  <input type="file" id={`file-${i}-upload`} onchange={(e) => handleBinaryUpload(i, e)} />
                  {#if binaryFiles[i]}
                    <p style="color: var(--color-success, green); font-size: 0.9em;">
                      {binaryFiles[i]?.name} ({((binaryFiles[i]?.size ?? 0) / 1024).toFixed(2)} KB)
                    </p>
                  {/if}
                </div>
              {:else}
                <div>
                  <label for={`file-${i}-content`}>File Content</label>
                  <CodeEditor id={`file-${i}-content`} bind:value={file.content} />
                </div>
              {/if}
            </fieldset>
          {/each}
          <div style="display: flex; width: 100%">
            <button type="button" class="btn-danger" onclick={() => deleteConfig()}>Delete Config</button>
            <span style="margin-left: auto">
              <button type="button" onclick={() => addFile()}>Add File</button>
              <button type="submit" class="btn-primary">Save</button>
            </span>
          </div>
        </form>
      </div>
    </div>
  {/if}
</div>
