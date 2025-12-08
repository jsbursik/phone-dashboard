<script lang="ts">
  import type { PhoneConfigSchema } from "$lib/types";
  import { Input, toastStore } from "@jsbursik/magic-ui";
  import { validateMacAddress } from "$lib/form-validation";
  import CustomInput from "$lib/components/form-components/CustomInput.svelte";

  let { data } = $props();
  let { models, locations } = data;

  let mac = $state("");
  let selectedModel = $state("");
  let selectedLocation = $state("");
  let newLocation = $state("");
  let showNewLocation = $state(false);

  let phoneConfig = $state<PhoneConfigSchema | null>(null);
  let variableValues = $state<Record<string, string>>({});

  let binaryFiles = $state<File[]>([]);

  async function handleModelChange() {
    if (!selectedModel) {
      phoneConfig = null;
      return;
    }

    const model = models.find((m) => m.phone_model === selectedModel);
    if (model) {
      phoneConfig = model;
      // Initialize variable values
      variableValues = {};
      for (const variable of model.variables) {
        variableValues[variable.replace("$", "")] = "";
      }
    }
  }

  function handleBinaryUpload(e: Event) {
    const input = e.target as HTMLInputElement;
    if (input.files) {
      binaryFiles = Array.from(input.files);
    }
  }

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();

    // Validate MAC address
    if (!validateMacAddress(mac)) {
      toastStore.show("Invalid MAC address format. Use XX:XX:XX:XX:XX:XX or XXXXXXXXXXXX", "danger");
      return;
    }

    // Validate required fields
    if (!selectedModel) {
      toastStore.show("Please select a phone model", "danger");
      return;
    }

    // Prepare form data
    const formData = new FormData();
    formData.append("mac", mac);
    formData.append("model", selectedModel);

    // Handle location
    const locationValue = showNewLocation ? newLocation : selectedLocation;
    if (locationValue) {
      formData.append("location", locationValue);

      // If new location, add it to the database first
      if (showNewLocation && newLocation) {
        await fetch("/api/locations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: newLocation }),
        });
      }
    }

    formData.append("variable_values", JSON.stringify(variableValues));

    // Append binary files
    for (const file of binaryFiles) {
      formData.append("binaries", file);
    }

    // Submit
    const response = await fetch("/api/phones", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      toastStore.show("Phone added successfully!", "success");
      window.location.href = "/phones";
    } else {
      const result = await response.json();
      toastStore.show(`Error: ${result.error}`, "danger");
    }
  }
</script>

<div class="center">
  <div class="card" style="max-width: 800px; width: 100%;">
    <h1>Add Phone</h1>

    <form class="stack" onsubmit={handleSubmit}>
      <div>
        <label for="mac">MAC Address</label>
        <CustomInput
          type="text"
          id="mac"
          name="mac"
          placeholder="00:11:22:33:44:55"
          bind:value={mac}
          validator={validateMacAddress}
          required
        />
        <small style="color: var(--color-text-muted, #666);">Format: XX:XX:XX:XX:XX:XX or XXXXXXXXXXXX</small>
      </div>

      <div>
        <label for="model">Phone Model</label>
        <select id="model" bind:value={selectedModel} onchange={handleModelChange} required>
          <option value="">Select a model...</option>
          {#each models as model}
            <option value={model.phone_model}>{model.phone_model}</option>
          {/each}
        </select>
      </div>

      <div>
        <label for="location">Location</label>
        <div style="display: flex; gap: 0.5rem; align-items: center;">
          {#if !showNewLocation}
            <select id="location" bind:value={selectedLocation} style="flex: 1;">
              <option value="">None</option>
              {#each locations as location}
                <option value={location.name}>{location.name}</option>
              {/each}
            </select>
            <button type="button" onclick={() => (showNewLocation = true)}>New</button>
          {:else}
            <Input
              type="text"
              placeholder="New location name"
              bind:value={newLocation}
              style="flex: 1;"
            />
            <button type="button" onclick={() => (showNewLocation = false)}>Cancel</button>
          {/if}
        </div>
      </div>

      {#if phoneConfig && phoneConfig.variables.length > 0}
        <fieldset class="stack">
          <legend>Configuration Variables</legend>
          {#each phoneConfig.variables as variable}
            {@const varName = variable.replace("$", "")}
            <div>
              <label for={varName}>{variable}</label>
              <Input
                type="text"
                id={varName}
                name={varName}
                bind:value={variableValues[varName]}
                required
              />
            </div>
          {/each}
        </fieldset>
      {/if}

      <div>
        <label for="binaries">Upload Binary Files (optional)</label>
        <input type="file" id="binaries" multiple onchange={handleBinaryUpload} />
        {#if binaryFiles.length > 0}
          <ul style="margin-top: 0.5rem; font-size: 0.9em;">
            {#each binaryFiles as file}
              <li>{file.name} ({(file.size / 1024).toFixed(2)} KB)</li>
            {/each}
          </ul>
        {/if}
      </div>

      <div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
        <a href="/phones" class="btn">Cancel</a>
        <button type="submit" class="btn-primary">Add Phone</button>
      </div>
    </form>
  </div>
</div>
