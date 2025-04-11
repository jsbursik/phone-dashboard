<script lang="ts">
	import Icon from '@iconify/svelte';
	import ListItem from './list-item/list-item.svelte';
	import Dropdown from './dropdown/dropdown.svelte';

	import './sidebar.css';

	let toggleSidebar = $state(false);
</script>

<nav id="sidebar" class={toggleSidebar ? 'closed' : ''}>
	<ul>
		<li>
			<span class="logo">Phone Manager</span>
			<button
				id="toggle-btn"
				onclick={() => {
					toggleSidebar = !toggleSidebar;
				}}
			>
				<Icon icon="fa6-solid:bars" class="inline" />
			</button>
		</li>
		<ListItem href="/" icon="fa6-solid:house" name="Dashboard" />
		<ListItem href="/phones" icon="fa6-solid:phone" name="Phones" />
		<Dropdown icon="fa6-solid:gear" name="Settings">
			<li><a href="#">Phone Profiles</a></li>
			<li><a href="#">PM Settings</a></li>
		</Dropdown>
	</ul>
</nav>
