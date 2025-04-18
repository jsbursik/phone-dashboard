<script lang="ts">
	import Icon from '@iconify/svelte';
	import { createEventDispatcher } from 'svelte';
	import { sidebarState } from '../sidebar.store';
	import { page } from '$app/state';

	type DropdownProps = {
		icon: string;
		name: string;
		children: () => any;
	};

	const dispatch = createEventDispatcher();

	let props: DropdownProps = $props();
	let toggleDropdown = $state(false);

	$effect(() => {
		if ($sidebarState) {
			toggleDropdown = false;
		}
	});

	function handleToggle() {
		toggleDropdown = !toggleDropdown;
		dispatch('toggle', { isOpen: toggleDropdown });
	}
</script>

<li class:active={page.url.pathname.startsWith('/settings/')}>
	<button
		class="dropdown-btn"
		class:active={page.url.pathname.startsWith('/settings/')}
		onclick={handleToggle}
	>
		<Icon icon={props.icon} class="inline" />
		<span>{props.name}</span>
		<Icon
			icon="fa6-solid:chevron-up"
			class="inline"
			style={toggleDropdown ? `` : `rotate: 180deg`}
		/>
	</button>
	<ul class={`sub-menu ${toggleDropdown ? 'show' : ''}`}>
		<div>
			{@render props.children()}
		</div>
	</ul>
</li>
