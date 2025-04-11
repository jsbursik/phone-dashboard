<!--
		<li>
			<button
				class="dropdown-btn"
				onclick={() => {
					toggleSubMenu = !toggleSubMenu;
					toggleSubMenu ? (toggleSidebar = false) : '';
				}}
			>
				<Icon icon="fa6-solid:gear" class="inline" />
				<span>Config</span>
				<Icon
					icon="fa6-solid:chevron-up"
					class="inline"
					style={toggleSubMenu ? `` : `rotate: 180deg`}
				/>
			</button>
			<ul class={`sub-menu ${toggleSubMenu ? 'show' : ''}`}>
				<div>
					<li><a href="#">Phone Profiles</a></li>
					<li><a href="#">PM Settings</a></li>
				</div>
			</ul>
		</li>
-->

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
		<Icon icon="fa6-solid:gear" class="inline" />
		<span>Config</span>
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
