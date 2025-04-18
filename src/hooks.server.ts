import { defineHandler } from '@digitak/gravity-svelte-kit/server';
import { services } from './lib/services/index';
import schema from './schema.json';

export const { handle } = defineHandler({
	apiPath: '/api',
	services,
	schema
});
