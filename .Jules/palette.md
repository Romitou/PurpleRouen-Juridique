## 2026-03-21 - Semantic HTML & Developer Experience
**Learning:** Even in non-standard web apps (like PDF generators), semantic HTML (main vs div) and standard meta tags (viewport) are often missing but expected. Also, missing 'build' scripts in package.json create friction for developers.
**Action:** When auditing a new repo, check basic HTML semantics and standard package.json scripts immediately as "invisible" UX wins.

## 2026-05-24 - WYSIWYG for Document Generators
**Learning:** For tools that generate PDFs from HTML, the lack of "Paper View" styling in the browser makes drafting/previewing difficult. The "screen" media query is often overlooked but crucial for the authoring experience.
**Action:** When working on document generators, always implement a "Paper View" (A4 width, shadow, padding) for screen media to simulate the final output immediately.

## 2026-05-25 - Floating Print Actions for Documents
**Learning:** When displaying "Paper View" documents on screen, users often rely on browser menus to print. A floating "Print" button bridges the gap between web and paper, but MUST be hidden in `@media print` to avoid polluting the final document.
**Action:** Always verify print styles when adding on-screen document controls.
