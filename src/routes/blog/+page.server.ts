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
	const nbsDir = join(process.cwd(), 'nbs');
	const files = readdirSync(postsDir).filter(file => file.endsWith('.html'));
	
	const posts: Post[] = files.map(file => {
		const slug = file.replace('.html', '');
		const content = readFileSync(join(postsDir, file), 'utf-8');
		
		// Extract metadata from HTML
		const titleMatch = content.match(/<title>(.*?)<\/title>/);
		const dateMatch = content.match(/<meta name="dcterms\.date" content="(.*?)"/);
		const descMatch = content.match(/<meta name="description" content="(.*?)"/);
		
		// Try to read categories from the notebook file
		let categories: string[] = [];
		try {
			const nbFile = join(nbsDir, `${slug}.ipynb`);
			const nbContent = readFileSync(nbFile, 'utf-8');
			const categoryMatch = nbContent.match(/categories:\s*\[(.*?)\]/);
			if (categoryMatch) {
				categories = categoryMatch[1].split(',').map(c => c.trim().replace(/['"]/g, ''));
			}
		} catch (e) {
			// If notebook doesn't exist, skip categories
		}
		
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
