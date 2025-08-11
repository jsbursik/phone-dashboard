<script lang="ts">
	import Icon from '@iconify/svelte';
	import { page } from '$app/state';

	type ListItemProps = {
		href: string;
		icon: string;
		name: string;
	};

	let props: ListItemProps = $props();
</script>

<li class:active={page.url.pathname === props.href}>
	<a href={props.href}>
		<Icon icon={props.icon} class="inline" />
		<span>{props.name}</span>
	</a>
</li>
