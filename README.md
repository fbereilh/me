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

```bash
# Create notebook in nbs/
# Add YAML frontmatter with title, date, categories
devbox run render  # Converts notebooks to HTML
```