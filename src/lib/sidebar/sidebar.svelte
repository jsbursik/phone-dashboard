<script lang="ts">
	import Icon from '@iconify/svelte';
	import ListItem from './list-item/list-item.svelte';
	import Dropdown from './dropdown/dropdown.svelte';
	import { colorMode, sidebarState } from './sidebar.store';

	import './sidebar.css';
	import { page } from '$app/state';

	let sidebarClosed = true;
	let darkMode = false;

	$: $sidebarState = sidebarClosed;
	$: $colorMode = darkMode;

	function handleDropdown() {
		if ($sidebarState) {
			sidebarState.set(false);
		}
	}

	function handleDarkMode() {
		colorMode.set(!$colorMode);
		document.body.setAttribute('data-theme', $colorMode ? 'dark' : 'light');
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
			<li class:active={page.url.pathname === '/settings/profiles'}>
				<a href="/settings/profiles">Phone Profiles</a>
			</li>
			<li class:active={page.url.pathname === '/settings/manager'}>
				<a href="/settings/manager">PM Settings</a>
			</li>
		</Dropdown>
		<li>
			<button onclick={handleDarkMode}>
				<Icon icon={$colorMode ? 'fa6-solid:sun' : 'fa6-solid:moon'} class="inline" />
			</button>
		</li>
	</ul>
</nav>
