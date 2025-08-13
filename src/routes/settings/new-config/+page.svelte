<script lang="ts">
  import CodeInput from "~/components/form-components/code-input.svelte";
  import Input from "~/components/form-components/input.svelte";

  let phoneModel = $state("");
</script>

<div class="container-row">
  <div class="container fit">
    <Input id="phone-model" label="" placeholder="Phone Model" bind:value={phoneModel} />
    <CodeInput id="phone-config" label="" />
    <div class="row g-1" style="justify-content: flex-end">
      <button class="btn">Another File</button>
      <button type="submit" class="btn btn-primary">Add</button>
    </div>
  </div>
  <div class="container fit">
    <h2>Variables:</h2>
    <ul>
      <li>Placeholder</li>
    </ul>
  </div>
</div>
