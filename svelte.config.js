import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter({
			// default options are shown. On some platforms
			// these options are set automatically — see below
			out: 'build'
		}),
		alias: {
			"@/*": "./src/lib/*",
		},
		prerender: {
			handleHttpError: ({ path, referrer, message }) => {
				// ignore image not found errors when prerendering
				if (path.endsWith('.jpg') || path.endsWith('.png') || path.endsWith('.svg')) {
					console.warn(`[prerender] Warning: Missing asset ${path} referred from ${referrer}`);
					return;
				}
				
				// otherwise fail the build
				throw new Error(message);
			},
			handleMissingId: ({ id, path, referrers, message }) => {
				// Log the warning but don't fail the build
				console.warn(`[prerender] Warning: Missing ID "${id}" on page "${path}", referred from: ${referrers.join(', ')}`);
			}
		}
	},
};

export default config;
