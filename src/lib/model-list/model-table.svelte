<script lang="ts">
	import Icon from '@iconify/svelte';

	import './model-table.css';
</script>

<table>
	<thead>
		<tr>
			<th>Model</th>
			<th>Devices Registered</th>
			<th>Actions</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td> Zip 22G </td>
			<td>0</td>
			<td>
				<button class="table-btn">
					<Icon icon="fa6-solid:pencil" />
				</button>
				<button class="table-btn">
					<Icon icon="fa6-solid:x" />
				</button>
			</td>
		</tr>
		<tr>
			<td>Zip 33G</td>
			<td>0</td>
			<td>
				<button class="table-btn">
					<Icon icon="fa6-solid:pencil" />
				</button>
				<button class="table-btn">
					<Icon icon="fa6-solid:x" />
				</button>
			</td>
		</tr>
		<tr>
			<td>Zip 43G</td>
			<td>0</td>
			<td>
				<button class="table-btn">
					<Icon icon="fa6-solid:pencil" />
				</button>
				<button class="table-btn">
					<Icon icon="fa6-solid:x" />
				</button>
			</td>
		</tr>
		<tr>
			<td>Zip 33i</td>
			<td>0</td>
			<td>
				<button class="table-btn">
					<Icon icon="fa6-solid:pencil" />
				</button>
				<button class="table-btn">
					<Icon icon="fa6-solid:x" />
				</button>
			</td>
		</tr>
		<tr>
			<td>Zip 45G</td>
			<td>0</td>
			<td>
				<button class="table-btn">
					<Icon icon="fa6-solid:pencil" />
				</button>
				<button class="table-btn">
					<Icon icon="fa6-solid:x" />
				</button>
			</td>
		</tr>
	</tbody>
</table>
