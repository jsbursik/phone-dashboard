import type { services } from './lib/services';
import { defineApi } from '@digitak/gravity-svelte-kit';

export const { api, store } = defineApi<typeof services>({
	apiPath: '/api'
	// ...additional options go there
});
