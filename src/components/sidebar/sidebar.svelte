<script lang="ts">
	import Icon from '@iconify/svelte';

	import './sidebar.css';

	let toggled = $state(false);
</script>

<div class={`sidebar bg-stone-700 ${toggled ? 'closed' : ''}`}>
	<div class="menu bg-stone-700 cursor-pointer" onclick={() => (toggled = !toggled)}>
		<Icon icon="fa6-solid:bars" />
	</div>
	<div class="top text-xl font-bold flex justify-center">
		<p>Phone Manager</p>
	</div>
	<div class="user"></div>
	<ul>
		<li class="hover:bg-stone-800">
			<a href="/">
				<Icon icon="fa6-solid:house" class="inline" />
				<span>Dashboard</span>
			</a>
		</li>
		<li class="hover:bg-stone-800">
			<a href="/">
				<Icon icon="fa6-solid:phone" class="inline" />
				<span>Phones</span>
			</a>
		</li>
		<li class="hover:bg-stone-800">
			<a href="/">
				<Icon icon="fa6-solid:gear" class="inline" />
				<span>Config</span>
			</a>
		</li>
	</ul>
</div>
