<script lang="ts">
  import CustomInput from "$lib/components/form-components/CustomInput.svelte";

  function filename(v: string) {
    const syntax = /^(\$?[\w.-]+\.\w+|\$\w+)$/;
    return syntax.test(v);
  }
</script>

<div class="center center-text">
  <h1>Welcome to SvelteKit</h1>
  <p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
  <p>With <a href="https://github.com/jsbursik/magic-ui">Magic-UI</a></p>
</div>

<div class="center">
  <div class="card">
    <CustomInput type="text" name="test-input" id="test-input" placeholder="Test Input" validator={filename} required />
  </div>
</div>
