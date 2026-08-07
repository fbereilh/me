// Prerendering is declared per route rather than here: with the root layout marked
// `prerender`, SvelteKit drops the layout node from the server manifest and adapter-node
// can no longer render `+error.svelte` for URLs that match no route.
export const ssr = true;
