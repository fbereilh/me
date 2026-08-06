#!/usr/bin/env python3
"""Start a new blog post from nbs/_template.ipynb.

    devbox run new-post "Building a Smart Scheduling Agent"

Creates nbs/YYYYMM-Building-a-Smart-Scheduling-Agent.ipynb with the title and date
already filled in, and prints the path. Everything else - writing, running cells,
rendering - happens in the notebook. See AGENTS.md for the authoring rules.
"""

from __future__ import annotations

import json
import re
import sys
import unicodedata
from datetime import date
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
TEMPLATE = REPO_ROOT / "nbs" / "_template.ipynb"


def slugify(title: str) -> str:
    """`Building a Smart Scheduling Agent!` -> `Building-a-Smart-Scheduling-Agent`."""
    normalised = unicodedata.normalize("NFKD", title)
    ascii_only = normalised.encode("ascii", "ignore").decode("ascii")
    words = re.findall(r"[A-Za-z0-9]+", ascii_only)
    return "-".join(words)


def yaml_escape(title: str) -> str:
    """Escape a title for the template's double-quoted YAML scalar.

    `He said "hi" \\o/` has to survive as YAML, or Quarto refuses to render the post and
    the site silently falls back to the slug as its title.
    """
    escaped = title.replace("\\", "\\\\").replace('"', '\\"')
    return escaped.replace("\n", "\\n").replace("\r", "\\r").replace("\t", "\\t")


def fill(source: list[str], title: str, published: date) -> list[str]:
    return [
        line.replace("POST_TITLE", yaml_escape(title)).replace(
            "POST_DATE", published.isoformat()
        )
        for line in source
    ]


def new_post(title: str, today: date | None = None) -> Path:
    today = today or date.today()
    slug = slugify(title)
    if not slug:
        raise SystemExit("Give the post a title with at least one letter or digit.")

    destination = REPO_ROOT / "nbs" / f"{today:%Y%m}-{slug}.ipynb"
    if destination.exists():
        raise SystemExit(f"{destination.relative_to(REPO_ROOT)} already exists.")

    notebook = json.loads(TEMPLATE.read_text())
    for cell in notebook["cells"]:
        cell["source"] = fill(cell["source"], title, today)

    destination.write_text(json.dumps(notebook, indent=1, ensure_ascii=False) + "\n")
    return destination


def main(argv: list[str]) -> int:
    title = " ".join(argv[1:]).strip()
    if not title:
        print(f'Usage: {Path(argv[0]).name} "Your Post Title"', file=sys.stderr)
        return 2

    destination = new_post(title)
    print(destination.relative_to(REPO_ROOT))
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv))
