<script lang="ts">
	import InputField from '~/lib/form-components/input-field.svelte';
</script>

<div class="container">
	<h1>Test Form</h1>
	<form method="POST">
		<div class="form-group">
			<div class="form-row">
				<InputField field="First Name" value="" />
				<InputField field="Last Name" value="" />
			</div>
			<button class="btn btn-primary">Submit</button>
		</div>
	</form>
</div>
<div class="container">
	<h2>Hello World!</h2>
	<p>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere sunt ad numquam voluptatem,
		voluptatibus amet error voluptates architecto ullam possimus omnis nobis deleniti voluptatum
		nostrum! Veritatis laborum placeat amet nobis?
	</p>
</div>
