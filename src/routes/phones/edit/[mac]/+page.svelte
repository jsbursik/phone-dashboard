<script lang="ts">
  import { Input, toastStore } from "@jsbursik/magic-ui";
  import { validateMacAddress } from "$lib/form-validation";

  let { data } = $props();
  let { phone, phoneConfig, locations } = data;

  let selectedLocation = $state(phone.location || "");
  let newLocation = $state("");
  let showNewLocation = $state(false);

  let variableValues = $state<Record<string, string>>({ ...phone.variable_values });
  let binaryFiles = $state<File[]>([]);

  function handleBinaryUpload(e: Event) {
    const input = e.target as HTMLInputElement;
    if (input.files) {
      binaryFiles = Array.from(input.files);
    }
  }

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();

    // Prepare form data
    const formData = new FormData();

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
    const response = await fetch(`/api/phones/${phone.mac}`, {
      method: "PUT",
      body: formData,
    });

    if (response.ok) {
      toastStore.show("Phone updated successfully!", "success");
      window.location.href = "/phones";
    } else {
      const result = await response.json();
      toastStore.show(`Error: ${result.error}`, "danger");
    }
  }
</script>

<div class="center">
  <div class="card" style="max-width: 800px; width: 100%;">
    <h1>Edit Phone</h1>

    <form class="stack" onsubmit={handleSubmit}>
      <div>
        <label for="mac">MAC Address</label>
        <Input type="text" id="mac" value={phone.mac} disabled />
      </div>

      <div>
        <label for="model">Phone Model</label>
        <Input type="text" id="model" value={phone.model} disabled />
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

      {#if phone.custom_binaries.length > 0}
        <div>
          <label>Current Binary Files</label>
          <ul style="font-size: 0.9em;">
            {#each phone.custom_binaries as binary}
              <li>{binary.filename}</li>
            {/each}
          </ul>
        </div>
      {/if}

      <div>
        <label for="binaries">Upload Additional Binary Files (optional)</label>
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
        <button type="submit" class="btn-primary">Update Phone</button>
      </div>
    </form>
  </div>
</div>
