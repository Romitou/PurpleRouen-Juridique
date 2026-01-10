# PurpleRouen-Juridique: AI Coding Instructions

## Project Overview

This is a **legal document generation framework** for French businesses. The project uses Markdown + CSS to create professional PDF legal documents (CGV, privacy policies, legal notices, contracts) with a branded "PurpleRouen" design system.

**Core workflow**: Copy [GABARIT_MASTER.md](../GABARIT_MASTER.md) → Populate with business context from [contexte/CONTEXTE_PROJET.md](../contexte/CONTEXTE_PROJET.md) → Export to PDF via Markdown Preview Enhanced (Puppeteer).

## Architecture & Key Files

```
PurpleRouen-Juridique/
├── GABARIT_MASTER.md           # Master template for all legal docs
├── contexte/
│   └── CONTEXTE_PROJET.md      # Central reference for business info
├── sources/                     # Where generated documents live
│   ├── cgv/                     # Terms & conditions
│   ├── confidentialite/         # Privacy policies
│   ├── contrats/                # Contracts
│   └── mentions-legales/        # Legal notices
├── styles/
│   └── purplerouen.css         # Professional styling system
├── assets/                      # Logos, banners, fonts
└── exports/                     # PDF outputs
```

### Document Structure Pattern

All legal documents follow this structure (see [GABARIT_MASTER.md](../GABARIT_MASTER.md)):

1. **YAML Frontmatter** with Puppeteer PDF config (margins, headers, footers)
2. **Metadata block** (`.metadata-grid`) showing document version, entity, contact
3. **Numbered articles** using CSS counters (h2/h3 auto-numbered via `::before`)
4. **Special callouts**: `.important`, `.note`, `.warning` div classes
5. **Page breaks**: `<div class="page-break"></div>` between major sections

## Critical Conventions

### 1. Context-Driven Generation

**ALWAYS** reference [contexte/CONTEXTE_PROJET.md](../contexte/CONTEXTE_PROJET.md) when creating documents. This file contains:
- Legal entity info (RCS, SIRET, capital, registered address)
- Service descriptions and business model
- GDPR data processing details (retention, hosting, sub-processors)
- Tone of voice rules (formal vs. accessible, tu/vous)
- Required clauses checklist

**Never hardcode** company details—always template them from context file.

### 2. CSS Styling System

Use the [purplerouen.css](../styles/purplerouen.css) classes:
- Headings are **auto-numbered** (h2 = "1.", h3 = "1.1.") via CSS counters—don't manually number
- Color scheme: `--primary-color: #1a1a2e`, `--secondary-color: #6a67ce`, `--accent-color: #8b5cf6`
- Typography: Roboto (body) + Roboto Slab (headings)
- Callout boxes: `.important` (yellow), `.note` (blue), `.warning` (red)

### 3. Puppeteer PDF Export

The YAML frontmatter configures PDF generation:
```yaml
puppeteer:
  format: "A4"
  margin: {top: "25mm", bottom: "30mm", left: "20mm", right: "20mm"}
  displayHeaderFooter: true
  headerTemplate: |- 
    # HTML for header with company name
  footerTemplate: |-
    # HTML for footer with page numbers
```

**Critical**: Footer banner paths must be **absolute** (`file:///absolute/path/to/assets/banners/footer-banner.png`). Relative paths fail in Puppeteer.

### 4. Bilingual & RGPD Focus

- Documents are in **French** (target: French businesses)
- RGPD (GDPR) compliance is paramount—include data retention, DPO contact, user rights
- Use **accessible language** unless context specifies formal legal tone (check "Tone of Voice" in context)

## Common Tasks

### Creating a New Legal Document

1. Copy [GABARIT_MASTER.md](../GABARIT_MASTER.md) to appropriate `sources/` subfolder
2. Update YAML frontmatter (title, date, export path)
3. Populate metadata block from [contexte/CONTEXTE_PROJET.md](../contexte/CONTEXTE_PROJET.md)
4. Write articles using h2/h3 (auto-numbered)—no manual "Article 1.1" prefixes
5. Link CSS: `<style>@import url("../styles/purplerouen.css");</style>` (adjust path depth)
6. Validate paths for assets (banners must be absolute for PDF export)

### Updating Context

Edit [contexte/CONTEXTE_PROJET.md](../contexte/CONTEXTE_PROJET.md) to reflect:
- Company legal changes (new SIRET, capital, address)
- Service additions/modifications
- Data processing updates (new sub-processors, hosting changes)
- Tone adjustments (more/less formal)

All existing documents should be regenerated when context changes.

### Styling Customizations

Modify [purplerouen.css](../styles/purplerouen.css):
- CSS variables at `:root` for theme colors
- Counter logic in `h2::before` / `h3::before` for numbering
- Print optimizations in `@media print` block

## Gotchas & Anti-Patterns

❌ **Don't** manually number headings ("## Article 1 - Objet")—CSS handles this  
❌ **Don't** skip the metadata grid—it's required for professional docs  
❌ **Don't** use relative paths in Puppeteer footerTemplate—always absolute  
❌ **Don't** copy CSS inline—keep styling in [purplerouen.css](../styles/purplerouen.css), import via `<style>` tag  
✅ **Do** validate all company info against [contexte/CONTEXTE_PROJET.md](../contexte/CONTEXTE_PROJET.md)  
✅ **Do** use semantic HTML in callouts (`<div class="important">`)  
✅ **Do** test PDF export via Markdown Preview Enhanced after changes  

## External Dependencies

- **Markdown Preview Enhanced** (VS Code extension): Converts MD → PDF via Puppeteer
- **Google Fonts** (Roboto, Roboto Slab): Loaded in CSS
- No build tools, no package.json—pure Markdown + CSS workflow

## Workflow Commands

No terminal commands needed—this is a document authoring project. Exports happen via:
1. Open `.md` file in VS Code
2. Right-click → "Markdown Preview Enhanced: Open Preview"
3. Right-click preview → "Chrome (Puppeteer) / PDF"

---

**Last Updated**: 2026-01-10  
**Framework Version**: 1.0
