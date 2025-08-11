<script lang="ts">
	import Icon from '@iconify/svelte';
	import { sidebarOpen } from '../sidebar.store';
	import { page } from '$app/state';

	let { icon, name, ...props } = $props();

	let open = $state(false);

	function handleToggle() {
		open = !open;
		if (open) {
			sidebarOpen.set(true);
		}
	}

	$effect(() => {
		if (!$sidebarOpen) {
			open = false;
		}
	});
</script>

<li class:active={page.url.pathname.startsWith(`/${name.toLowerCase()}/`)}>
	<button
		class="dropdown-btn"
		class:active={page.url.pathname.startsWith(`/${name.toLowerCase()}/`)}
		onclick={handleToggle}
	>
		<Icon icon={props.icon} class="inline" />
		<span>{props.name}</span>
		<Icon icon="fa6-solid:chevron-up" class="inline" style={open ? `` : `rotate: 180deg`} />
	</button>
	<ul class={`sub-menu ${open ? 'show' : ''}`}>
		<div>
			{@render props.children()}
		</div>
	</ul>
</li>
