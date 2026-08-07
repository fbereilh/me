# Personal Site

Portfolio and blog built with SvelteKit and Quarto.

## Stack

- **Frontend**: SvelteKit + Vanilla CSS
- **Blog**: Quarto (Jupyter notebooks → HTML)
- **Dev Environment**: Devbox (Bun + Quarto + UV)

## Development

```bash
devbox shell
bun install
bun run dev
```

## Blog Workflow

Each post is a Jupyter notebook in `nbs/`. `quarto render` turns it into HTML under
`static/posts/`, which is committed; SvelteKit reads the notebook frontmatter for the blog
index, sitemap and RSS, and server-renders each post as a static page at `/blog/<slug>`.

```bash
devbox run new-post "Your Post Title"  # -> nbs/YYYYMM-Your-Post-Title.ipynb
devbox run preview                     # quarto preview, live reload while writing
devbox run render                      # one-shot render into static/posts/
devbox run preview-site                # preview the built SvelteKit site
```

A post goes live only once its rendered HTML exists in `static/posts/`.
See [AGENTS.md](AGENTS.md) for the authoring rules.

## Checks

```bash
npm run check           # svelte-check
npm run lint            # prettier --check
npm test                # vitest
npm run test:prerender  # build, then assert every post ships a real static page
```
