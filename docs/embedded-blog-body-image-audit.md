# Embedded Blog-Body Image Audit

> **Status: confirmed source audit; no live image references changed.**

## Finding

The refreshed canonical-mascot set currently covers **featured images**. Five articles still contain a total of **21 inline markdown image references** to older CloudFront-hosted artwork. The live article renderer renders every markdown image URL directly, so those legacy visuals appear inside the article body exactly as authored; it does not substitute them with the new featured image.

| Article source | Inline images | Legacy CloudFront references |
|---|---:|---:|
| `25-adhd-never-finish-anything.md` | 5 | 5 |
| `26-adhd-symptoms-adults.md` | 5 | 5 |
| `27-uncommon-adhd-symptoms.md` | 7 | 7 |
| `28-adhd-burnout-recovery.md` | 3 | 3 |
| `30-rejection-sensitive-dysphoria-rsd.md` | 1 | 1 |
| **Total** | **21** | **21** |

## Live confirmation

The published `/blog/adhd-symptoms-adults` page shows the new canonical featured image at the top, followed by its legacy CloudFront illustrations in the article body. This confirms that the reported issue is real and source-driven rather than a CDN cache or renderer bug.

## Replacement boundary

Any replacement must use **newly generated** canonical DoTheThing mascot visuals, retain each image’s existing educational job and accessible alt text, use project storage URLs, and preserve every article word, heading, table, citation, and link. The 21 illustrations should not be replaced with a repeated or generic visual; each must remain topic-specific.

## Quota-reset continuation

The first five Article 25 replacements have been queued and referenced. The remaining approved images are paused until the daily generation quota resets. A one-time automatic continuation is active; it must use the same canonical mascot reference for every new visual and stop rather than substitute an old, reused, human, or mismatched image if the quota remains unavailable.
