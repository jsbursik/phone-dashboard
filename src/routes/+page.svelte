<script lang="ts">
	import { api } from '~/api';

	async function writeProfile() {
		console.log('Writing profile...');
		const res = await api.profile.addProfile('test', 'This is a test file');
		if (res.error) {
			console.error('Error: ', res.error);
		} else {
			console.log('Success: ', res);
		}
	}
</script>

<div class="container">
	<h2>Hello World!</h2>
	<p>
		<button class="btn" onclick={writeProfile}>Click me</button>
	</p>
</div>
<div class="container">
	<h2>Hello World!</h2>
	<p style="width: 100%;">test</p>
</div>
<div class="container">
	<h2>Hello World!</h2>
	<p>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere sunt ad numquam voluptatem,
		voluptatibus amet error voluptates architecto ullam possimus omnis nobis deleniti voluptatum
		nostrum! Veritatis laborum placeat amet nobis?
	</p>
</div>
<div class="container">
	<h2>Hello World!</h2>
	<p>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere sunt ad numquam voluptatem,
		voluptatibus amet error voluptates architecto ullam possimus omnis nobis deleniti voluptatum
		nostrum! Veritatis laborum placeat amet nobis?
	</p>
</div>
