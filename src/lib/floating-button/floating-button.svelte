<script lang="ts">
	import Icon from '@iconify/svelte';

	import './floating-button.css';

	let {
		top = 'none',
		right = 'none',
		bottom = 'none',
		left = 'none',
		icon = undefined,
		text = undefined,
		func = () => {}
	} = $props();
</script>

<button
	class="btn-floating"
	style={`top: ${top}; right: ${right}; bottom: ${bottom}; left: ${left};`}
	onclick={func()}
>
	{#if icon}
		<Icon icon={`fa6-solid:${icon}`} />
	{/if}
	{#if text}
		<span class="btn-floating-text">{text}</span>
	{/if}
</button>
