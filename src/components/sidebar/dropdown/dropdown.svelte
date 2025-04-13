<script lang="ts">
	type DropdownProps = {
		icon: string;
		name: string;
		children: () => any;
	};

	import Icon from '@iconify/svelte';

	let props: DropdownProps = $props();
	let toggleDropdown = $state(false);
</script>

<li>
	<button
		class="dropdown-btn"
		onclick={() => {
			toggleDropdown = !toggleDropdown;
		}}
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
