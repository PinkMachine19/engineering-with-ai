# Engineering with AI

**Professional Software Engineering in the Age of AI**

This documentation-first course exists to teach professional software engineering while using AI as a development partner. It is not anti-AI, a prompt-engineering course, or a catalog of tricks. Its recurring principle is:

> AI can generate artifacts. Engineers own the consequences.

Those artifacts may be C#, Python, React, Angular, SQL, Bicep, Terraform, YAML, Dockerfiles, Kubernetes manifests, CI/CD pipelines, or documentation. The course treats application code and infrastructure code as engineering work that must be reviewed, validated, tested, maintained, secured, and operated.

## Development status

🚧 **This repository is a draft.** Sessions 1–3 are initial implementations. Later sessions are intentionally incomplete scaffolds containing only their purpose, learning objectives, planned concepts, expected exercises, and notes for the future author.

AI was used to help establish the repository, documentation scaffold, and early drafts. The curriculum itself grows from ongoing discussions and practical software engineering experience. The author is actively walking through, validating, correcting, and improving every session. Technical accuracy is strengthened over time as each session is personally completed and validated; AI assistance does not transfer ownership of the result.

The source of truth for maturity is [`course-manifest.json`](course-manifest.json). A session moves through: Planned → Scaffolded → Drafted → Implemented → Validated → Personally Completed → Published.

## Local use

Run `npm run build`, then serve the repository root with any static web server and open `docs/index.html`. GitHub Pages publishes directly from `docs/` through the included workflow.

## Repository map

- `docs/` — the GitHub Pages site
- `docs/sessions/` — generated session pages
- `course-manifest.json` — curriculum and lifecycle status
- `scripts/generate-docs.mjs` — deterministic page generator
- `ARCHITECTURE.md` — design and maintenance decisions
- `STATUS.md` — human-readable project status

## Visual lineage

This course intentionally uses the same static documentation architecture and visual language as the React Learning Environment, with Session 19 as the principal instructional-page reference. Changes should preserve that family resemblance rather than introduce a new design system.
## Project Status

This project is intentionally public while it is still evolving.

The repositories in this academy are my personal learning and reference material. They combine my professional software engineering experience, topics I am actively learning, and ideas developed through extensive discussions with AI.

AI has been used to help organize the curriculum, generate initial drafts, create code examples, suggest exercises, review documentation, and accelerate development.

That does not mean I assume the generated content is correct.

The purpose of publishing these repositories early is to make the material easily accessible from anywhere and to document my own learning journey. As I work through each course, I personally review, validate, correct, refactor, expand, and sometimes completely rewrite sections based on what I learn.

Because of that, some sessions may be fully validated while others remain drafts or works in progress. Each repository includes status indicators so readers can distinguish between planned, drafted, implemented, and validated content.

If you discover an error, inconsistency, or a better approach, please assume it is part of an evolving project rather than a finished product. Constructive feedback is always appreciated.

The goal is not to present myself as the ultimate authority on these subjects. The goal is to build a high-quality collection of practical engineering references that improve over time through testing, experience, and continual refinement.
