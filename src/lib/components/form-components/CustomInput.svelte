<script lang="ts">
  import { Input as BaseInput } from "@jsbursik/magic-ui";
  import type { ComponentProps } from "svelte";

  type BaseProps = ComponentProps<typeof BaseInput>;

  let {
    validator = () => true,
    value = $bindable(""),
    ...props
  }: BaseProps & {
    validator?: (value: string) => boolean;
  } = $props();

  let valid = $state<boolean>(false);

  $effect(() => {
    valid = validator(value);
  });
</script>

<BaseInput bind:value bind:valid {...props} />
