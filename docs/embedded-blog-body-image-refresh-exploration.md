# Embedded Blog-Body Image Refresh — Approval-Only Plan

> **Status: approval only.** This plan does not update a public image, article body, or route.

## Confirmed scope

The legacy in-body artwork is limited to five articles and **21 direct markdown image references**. Every one is a legacy CloudFront image rendered directly by the article-body renderer. The refreshed canonical featured image remains correct; it is the inline educational artwork that needs replacement.

| Article | Replacement visual jobs | Count |
|---|---|---:|
| Why People with ADHD Never Finish Anything | Project lifecycle, novelty depletion, competing-interest pull, low-stimulation trap, conceptual dopamine curve | 5 |
| ADHD Symptoms in Adults | Childhood/adult contrast, internal restlessness, time perception, rejection sensitivity, potential-output gap | 5 |
| ADHD Experiences Missing From the Short Checklist | RSD, time blindness, sensory overload, task paralysis, emotional dysregulation, auditory processing, delayed sleep phase | 7 |
| ADHD Burnout Recovery | Hyperfocus-collapse cycle, burnout comparison, recovery phases | 3 |
| Rejection Sensitive Dysphoria | One RSD emotional-experience explainer | 1 |
| **Total** | **New article-specific canonical illustrations** | **21** |

## Image direction

Every replacement will be a **new** wide editorial illustration using the fixed canonical DoTheThing mascot: lavender rounded-rectangle silhouette, square navy eyes, dark navy pixel outline, restrained lavender highlight, navy shadow planes, and no human figures. Each image will express its section’s existing idea with props and visual metaphors rather than pseudo-data or medical claims.

The output will use project-storage URLs and preserve the current image’s accessible alt text, position, heading, surrounding copy, tables, citations, links, metadata, and routes. We will not reuse a featured illustration as an inline replacement and will not substitute generic stock art.

## Safe batch sequence

| Batch | Articles | New images | Validation after batch |
|---|---|---:|---|
| 1 | Articles 25 and 26 | 10 | Canonical mascot visual check, markdown reference check, affected route rendering |
| 2 | Articles 27 and 28 | 10 | Same checks, including crawler-safe image delivery |
| 3 | Article 30 | 1 | Full inline-image inventory must show zero legacy CloudFront references |

If image generation quota is unavailable, the batch stops without substituting old artwork, reused featured art, or mismatched mascots.

## Approval required

Approve this full **21-image canonical refresh**, and I will generate the replacements in the sequence above, wire only the matching markdown image references, and validate all five published articles.
