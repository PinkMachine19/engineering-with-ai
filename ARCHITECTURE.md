# Architecture

## Goals

The site is documentation-first, dependency-light, GitHub Pages friendly, and maintainable over a long curriculum lifecycle. Its presentation is deliberately inherited from the React Learning Environment.

## Source of truth

`course-manifest.json` owns session identity, ordering, layer, title, and lifecycle status. `scripts/generate-docs.mjs` combines that manifest with the three implemented lesson bodies and the standard placeholder contract. Generated HTML lives in `docs/` so GitHub Pages can publish it without a runtime build server.

## Page model

Every page uses the same top navigation, content container, typography, palette, spacing, badges, cards, alerts, table treatment, and responsive breakpoints as the reference course. Every page also receives two draft signals: a visible badge near the title and a large semi-transparent diagonal watermark.

Session pages follow the Session 19 instructional rhythm: context and time estimate, learning objectives, concept instruction, exercise, expected evidence, review checklist, reflection, and navigation. Scaffolded sessions render only planning metadata and a warning that the lesson is not yet authored.

## Shared behavior

- `docs/progress.js` stores session completion locally in the browser.
- `docs/notes-widget.js` stores page-specific learner notes locally.
- `docs/bookmark-widget.js` stores one course bookmark locally.
- No learner data leaves the browser.

## Change workflow

1. Update `course-manifest.json` and, for implemented lessons, the lesson data in `scripts/generate-docs.mjs`.
2. Run `npm run build`.
3. Review generated pages and status counts.
4. Advance status only when its definition is actually met.

Do not hand-edit generated session pages; regeneration will replace them. Shared CSS and JavaScript are edited directly.
