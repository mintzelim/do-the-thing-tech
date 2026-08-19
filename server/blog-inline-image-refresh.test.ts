import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const refreshedArticles = {
  "26-adhd-symptoms-adults": [
    "body-26-childhood-adult-symptoms_eded15d3.png",
    "body-26-internal-restlessness_4ecad889.png",
    "body-26-time-blindness_c9f141ac.png",
    "body-26-emotional-spike_0742e9ca.png",
    "body-26-support-structure_2087eb13.png",
  ],
  "27-uncommon-adhd-symptoms": [
    "body-27-rejection-response_29ccfb0d.png",
    "body-27-time-cues_fe6a5418.png",
    "body-27-sensory-overload_3f6a7307.png",
    "body-27-first-action_a91a9f1d.png",
    "body-27-emotion-pause_c9e03d80.png",
    "body-27-speech-noise_b58c8f5a.png",
    "body-27-sleep-rhythm_70224205.png",
  ],
  "28-adhd-burnout-recovery": [
    "body-28-hyperfocus-recovery-cycle_0e059f1a.png",
    "body-28-burnout-demands-support_39be8d35.png",
    "body-28-gentle-recovery-steps_7d0d3490.png",
  ],
  "30-rejection-sensitive-dysphoria-rsd": [
    "body-30-rejection-grounding_9c698db3.png",
  ],
};

describe("embedded canonical mascot image refresh", () => {
  it("replaces every remaining legacy inline image with its dedicated storage asset", () => {
    for (const [slug, assets] of Object.entries(refreshedArticles)) {
      const source = readFileSync(resolve(process.cwd(), `blog/${slug}.md`), "utf8");
      expect(source).not.toContain("d2xsxph8kpxj0f.cloudfront.net");
      for (const asset of assets) {
        expect(source).toContain(`/manus-storage/${asset}`);
      }
    }
  });

  it("routes inline storage image URLs through the shared cross-deployment asset helper", () => {
    const renderer = readFileSync(resolve(process.cwd(), "client/src/components/BlogContentRenderer.tsx"), "utf8");
    expect(renderer).toContain("import { assetUrl } from '@/lib/assetUrl';");
    expect(renderer).toContain("src={assetUrl(imageUrl)}");
  });
});
