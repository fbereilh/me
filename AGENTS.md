# Project agent memory

This file is the project's committed home for project-intrinsic agent knowledge: build, test, release, architecture, and sharp-edge notes that should travel with the code.

## What this repo is

A SvelteKit site (`src/`) plus a Quarto notebook blog (`nbs/`). Each post is a real Jupyter
notebook. `quarto render` turns `nbs/*.ipynb` into standalone HTML under `static/posts/`,
which is committed. SvelteKit reads both: `src/lib/posts.ts` parses post metadata from the
notebook frontmatter, and `src/routes/blog/[slug]/+page.server.ts` lifts the rendered
`<main>` out of the HTML and prerenders each post as a complete static page.

## Writing a post

```
devbox run new-post "Your Post Title"   # -> nbs/YYYYMM-Your-Post-Title.ipynb
devbox run preview                      # quarto preview, live reload while you write
devbox run render                       # one-shot render into static/posts/
```

Without devbox: `python3 scripts/new_post.py "Your Post Title"`, then `cd nbs && quarto render`.

### Rules for agents editing a post notebook

- **Cell 0 is the frontmatter cell.** It is a markdown cell holding a `---` fenced YAML
  block (`title`, `author`, `date`, `categories`, `description`). Quarto reads it to build the
  page's `<title>`, description and title block; `src/lib/posts.ts` reads the same bytes for
  the blog index, sitemap and RSS. Never delete it, never convert it to another cell type,
  never run it, and never put prose in it. Only the first markdown-or-raw cell is read: if
  the fence is not there the parser stops rather than scanning on, and the post ships with
  its slug as the title and no date.
- **Prefer flow style for `categories`**: `categories: [agents, langchain]`, on one line.
  Block style parses fine either way; one line just keeps the frontmatter cell short.
- **No `# Heading` repeating the title** in the body. Quarto already renders the title from
  frontmatter and the post page renders its own header - a markdown `#` duplicate gives the
  page two `<h1>`s.
- **Hide setup code with `#| echo: false`** as the first line of the code cell. Do not use an
  editor's hide-input toggle; that lives in cell metadata Quarto does not honour here.
- **Imports belong in the cell where the prose introduces them**, not hoisted to the top of
  the notebook. (With cellar, that means passing `route_imports: false` when adding a cell.)
- **Linking to another post is fine.** Write it as a normal markdown link to the sibling
  notebook (`[see this](Other-Post.ipynb)`); the extractor resolves the `Other-Post.html`
  Quarto emits to `/blog/Other-Post`, so the reader lands on the real page.
- **Posts are authored-once snapshots.** Quarto publishes the outputs saved in the notebook
  and CI does not re-execute anything. If an output is wrong, fix it by running the cell
  yourself and saving.
- **Before publishing**: replace the template's placeholder `description` with a real blurb
  and fill in `categories`, then clear outputs, run all, save, `quarto render`, and actually
  look at the rendered page. `npm run test:prerender` fails on a leftover placeholder and on
  a missing one: a post with no `description` ships no description meta tags at all, because
  a post never borrows the site blurb.

`_`-prefixed notebooks (`nbs/_template.ipynb`) are ignored by Quarto and by `posts.ts`, so the
template is never published.

## Checks

```
npm run check          # svelte-check
npm run lint           # prettier --check
npm test               # vitest (frontmatter parsing/sorting, post HTML extraction, head tags, RSS)
npm run test:prerender # build, then assert every post ships a real static page
```

`scripts/check-prerender.mjs` is the guard against the blog regressing to client-side
fetch-and-inject, which shipped empty pages to crawlers. It also fails the build when a post
ships source listings with no syntax-highlighting stylesheet, and when the adapter-node
server manifest comes out with no route nodes (see the catch-all note below).

## Sharp edges

- Quarto silently finds **no input files** when the repo lives under a hidden directory (any
  path segment starting with `.`, e.g. a worktree under `~/.treehouse/`). `quarto render`
  then exits 0 having done nothing. Render from a normal path, or copy `nbs/` out to render.
- A post is "published" only once its rendered HTML exists in `static/posts/`. `posts.ts`
  filters on that, so the index, sitemap and RSS can never link to a 404.
- Per-page `<title>`/canonical/OG come from `seo` returned by a route's `load` and are emitted
  once by `<Seo />` in `src/routes/+layout.svelte`. Do not add `<title>` to a page component;
  you will get two.
- `prerender = true` is declared **per route**, never on the root layout, and
  `src/routes/[...catchall]/+page.ts` deliberately stays server-rendered. Prerendering
  everything leaves adapter-node with an empty server manifest, and an unmatched URL then
  crashes instead of rendering `+error.svelte`. The catch-all is what keeps the layout and
  error nodes in the manifest, so a real 404 page ships.

## Maintaining this file

Keep this file for knowledge useful to almost every future agent session in this project.
Do not repeat what the codebase already shows; point to the authoritative file or command instead.
Prefer rewriting or pruning existing entries over appending new ones.
When updating this file, preserve this bar for all agents and keep entries concise.
