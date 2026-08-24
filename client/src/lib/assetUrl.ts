/**
 * The public GitHub release is the durable browser-facing host for the
 * project's image library. Source content may retain concise /manus-storage/
 * paths, but the browser never requests the Manus storage route directly.
 */
export const GITHUB_ASSET_RELEASE_ORIGIN =
  "https://github.com/mintzelim/do-the-thing-tech/releases/download/dothething-assets-v1";

export function assetUrl(path: string): string {
  if (!path.startsWith("/manus-storage/")) return path;

  const filename = path.split("/").at(-1);
  return filename ? `${GITHUB_ASSET_RELEASE_ORIGIN}/${filename}` : path;
}
