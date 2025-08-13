<script lang="ts">
  import { inputValidation, type InputType } from "./inputValidation";

  let { type = "text" as InputType, id, label, value = $bindable(), error = "", ...props } = $props();

  import "./input.css";
</script>

<span class="form-control">
  <label for={id}>{label}</label>
  <input class={{ invalid: error }} {type} {id} name={id} bind:value use:inputValidation={{ type }} {...props} />
  {#if error}<small class="error">{error}</small>{/if}
</span>
