# Live Image Delivery Audit

**URL checked:** `https://dothething.tech/`  
**Finding:** All thirteen landing-page images referenced through `/manus-storage/` resolve as completed image elements with `naturalWidth: 0` and `naturalHeight: 0` in the live production browser.

## Affected production assets

| Asset role | Current production path |
|---|---|
| Brand logo | `/manus-storage/logo_dabca0e9.png` |
| Hero mascot scene | `/manus-storage/dothething-abstract-hero-final_f2a98e80.png` |
| How It Works — Brain Dump | `/manus-storage/dothething-how-it-works-brain-dump-transparent_805dc4d4.png` |
| How It Works — Focus | `/manus-storage/dothething-how-it-works-focus-transparent_c55dcc2f.png` |
| How It Works — Breakdown Size | `/manus-storage/dothething-how-works-breakdown-size-transparent_631cd19e.png` |
| How It Works — Generated Breakdown | `/manus-storage/dothething-how-it-works-breakdown-transparent_3a48d1ce.png` |
| How It Works — Timer | `/manus-storage/dothething-how-it-works-timer-transparent_f4de844b.png` |
| CTA flag | `/manus-storage/dothething-cta-flag_aa5cdcdc.png` |
| Five audience illustrations | `/manus-storage/audience-howitworks-*.png` |

## Diagnosis

The live site is serving markup that points to project-local `/manus-storage/` paths, while the production origin is not resolving those paths. The repair must replace these production-inaccessible paths with assets that are either tracked in the deployed application repository or served from a production-accessible storage origin. The local preview may succeed because it has a Manus storage proxy, so preview-only checks are insufficient.

## Repair and Local Verification — 13 August 2026

Public UI asset paths now pass through `assetUrl()` in `client/src/lib/assetUrl.ts`. The helper changes only `/manus-storage/` paths, prefixing them with the production-capable Manus deployment origin: `https://dothething-zkgytwax.manus.space`.

The blog generator now applies the same origin to featured-image and inline Markdown image paths before writing the browser-consumed post registries.

The development deployment rendered the homepage with the expected external Manus asset URLs. A DOM audit of every `document.images` entry returned an empty broken-image array; every inspected image had nonzero intrinsic dimensions.

The remaining release check is to repeat the DOM audit at `https://dothething.tech` after the next checkpoint publishes, including a representative blog article and the About-page creator avatar.
