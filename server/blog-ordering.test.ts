import fs from "fs";
import path from "path";
import { describe, expect, it } from "vitest";

function parseDateValue(dateString: string) {
  const timestamp = Date.parse(dateString);
  return Number.isNaN(timestamp) ? 0 : timestamp;
}

describe("blog post ordering", () => {
  it("keeps generated blog posts sorted from newest to oldest", () => {
    const filePath = path.join(process.cwd(), "public", "blog-posts.json");
    const posts = JSON.parse(fs.readFileSync(filePath, "utf8")) as Array<{
      title: string;
      date: string;
    }>;

    expect(posts.length).toBeGreaterThan(1);

    for (let index = 1; index < posts.length; index += 1) {
      const previous = posts[index - 1];
      const current = posts[index];
      expect(parseDateValue(previous.date)).toBeGreaterThanOrEqual(parseDateValue(current.date));
    }
  });
});
