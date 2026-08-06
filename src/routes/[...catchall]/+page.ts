import { error } from '@sveltejs/kit';

// Every real route is prerendered, which would leave adapter-node with an empty server
// manifest and no way to render `+error.svelte`. This catch-all is the one route that stays
// server-rendered, so unknown URLs get a proper 404 page instead of a stack trace.
export const prerender = false;

export function load({ params }) {
	throw error(404, `Nothing here at /${params.catchall}`);
}
