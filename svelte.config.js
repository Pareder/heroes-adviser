import netlify from '@sveltejs/adapter-netlify';
import fs from 'fs';

const pkg = JSON.parse(fs.readFileSync('./package.json'));

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		adapter: netlify(),
		vite: {
			ssr: {
				noExternal: process.env.NODE_ENV === 'production' ? Object.keys(pkg.dependencies || {}) : undefined
			}
		}
	}
};

export default config;
