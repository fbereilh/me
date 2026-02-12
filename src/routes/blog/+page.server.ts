import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';

interface Post {
	title: string;
	date: string;
	description: string;
	slug: string;
	categories?: string[];
}

export async function load() {
	const postsDir = join(process.cwd(), 'static', 'posts');
	const files = readdirSync(postsDir).filter(file => file.endsWith('.html'));
	
	const posts: Post[] = files.map(file => {
		const slug = file.replace('.html', '');
		const content = readFileSync(join(postsDir, file), 'utf-8');
		
		// Extract metadata from HTML
		const titleMatch = content.match(/<title>(.*?)<\/title>/);
		const dateMatch = content.match(/<meta name="dcterms\.date" content="(.*?)"/);
		const descMatch = content.match(/<meta name="description" content="(.*?)"/);
		
		// Extract categories from content (you might want to adjust this)
		const categories: string[] = [];
		
		return {
			title: titleMatch ? titleMatch[1] : slug,
			date: dateMatch ? new Date(dateMatch[1]).toLocaleDateString('en-US', { 
				year: 'numeric', 
				month: 'long', 
				day: 'numeric' 
			}) : 'Unknown date',
			description: descMatch ? descMatch[1] : '',
			slug,
			categories
		};
	}).sort((a, b) => {
		// Sort by date, newest first
		return new Date(b.date).getTime() - new Date(a.date).getTime();
	});
	
	return { posts };
}
