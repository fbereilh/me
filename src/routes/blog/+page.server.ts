import { getPosts } from '$lib/posts';
import type { PageServerLoad } from './$types';

export const prerender = true;

export const load: PageServerLoad = () => ({
	posts: getPosts(),
	seo: {
		title: 'Blog - Felipe Bereilh | Data Science & ML Articles',
		description:
			'Thoughts on data science, machine learning, and production ML systems. Jupyter notebooks and technical articles by Felipe Bereilh.'
	}
});
