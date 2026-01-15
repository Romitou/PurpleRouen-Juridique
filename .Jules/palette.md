## 2026-03-21 - Semantic HTML & Developer Experience
**Learning:** Even in non-standard web apps (like PDF generators), semantic HTML (main vs div) and standard meta tags (viewport) are often missing but expected. Also, missing 'build' scripts in package.json create friction for developers.
**Action:** When auditing a new repo, check basic HTML semantics and standard package.json scripts immediately as "invisible" UX wins.

## 2026-03-21 - Print-First vs Screen-First UX
**Learning:** Tools generating PDFs often ignore the HTML preview experience, resulting in unreadable full-width text. A "Paper View" (constrained width + shadow) mimics the final output and improves readability significantly for developers/viewers.
**Action:** For print-generation tools, always implement a screen-only "Paper View" CSS layer to bridge the gap between digital preview and physical output.
