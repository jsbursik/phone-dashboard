import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'url';

export default defineConfig({
	plugins: [sveltekit()],
	resolve: {
		alias: {
			'~': fileURLToPath(new URL('./src', import.meta.url))
		}
	}
});
