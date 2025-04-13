<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Icon from '@iconify/svelte';
	import { sidebarState } from '../sidebar.store';

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

<li>
	<button class="dropdown-btn" onclick={handleToggle}>
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
