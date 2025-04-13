<script lang="ts">
	import Icon from '@iconify/svelte';
	import ListItem from './list-item/list-item.svelte';
	import Dropdown from './dropdown/dropdown.svelte';
	import { sidebarState } from './sidebar.store';

	import './sidebar.css';

	let sidebarClosed = true;

	$: $sidebarState = sidebarClosed;

	function handleDropdown() {
		if ($sidebarState) {
			sidebarState.set(false);
		}
	}
</script>

<nav id="sidebar" class={$sidebarState ? 'closed' : ''}>
	<ul>
		<li>
			<span class="logo">Phone Manager</span>
			<button
				id="toggle-btn"
				onclick={() => {
					sidebarState.set(!$sidebarState);
				}}
			>
				<Icon icon="fa6-solid:bars" class="inline" />
			</button>
		</li>
		<ListItem href="/" icon="fa6-solid:house" name="Dashboard" />
		<ListItem href="/phones" icon="fa6-solid:phone" name="Phones" />
		<Dropdown icon="fa6-solid:gear" name="Settings" on:toggle={handleDropdown}>
			<li><a href="#">Phone Profiles</a></li>
			<li><a href="#">PM Settings</a></li>
		</Dropdown>
	</ul>
</nav>
