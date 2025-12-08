<script lang="ts">
  import type { Phone } from "$lib/types";
  import { toastStore } from "@jsbursik/magic-ui";

  let { data } = $props();
  let { phones } = data;

  async function deletePhone(mac: string) {
    if (!confirm(`Are you sure you want to delete phone ${mac}?`)) {
      return;
    }

    const response = await fetch(`/api/phones/${mac}`, {
      method: "DELETE",
    });

    if (response.ok) {
      toastStore.show("Phone deleted successfully", "success");
      window.location.reload();
    } else {
      toastStore.show("Failed to delete phone", "danger");
    }
  }
</script>

<div class="center center-text">
  <div class="card" style="max-width: 1200px; width: 100%;">
    <h2>Phones</h2>

    {#if phones.length === 0}
      <p style="color: var(--color-text-muted, #666); margin: 2rem 0;">No phones configured yet.</p>
      <a href="/phones/add" class="btn btn-primary">Add Phone</a>
    {:else}
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr style="border-bottom: 2px solid var(--color-border, #ddd);">
            <th>MAC Address</th>
            <th>Model</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {#each phones as phone}
            <tr>
              <td style="font-family: monospace;">{phone.mac}</td>
              <td>{phone.model}</td>
              <td>{phone.location || "-"}</td>
              <td>
                <a href="/phones/edit/{phone.mac}" class="btn">Edit</a>
                <button class="btn btn-danger" onclick={() => deletePhone(phone.mac)}>Delete</button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
      <div>
        <a href="/phones/add" class="btn btn-primary">Add Phone</a>
      </div>
    {/if}
  </div>
</div>
