import type { Actions } from './$types';

export const actions = {
	default: async ({ request }) => {
		const fd = await request.formData();
		console.log(fd);
	}
} satisfies Actions;
