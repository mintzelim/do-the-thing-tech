/**
 * Vercel serves dothething.tech, but it does not proxy Manus's /manus-storage
 * route. Keep storage assets on the project deployment origin so the same
 * uploaded asset is available in local preview, Manus production, and Vercel.
 */
export const MANUS_ASSET_ORIGIN = "https://dothething-zkgytwax.manus.space";

export function assetUrl(path: string): string {
  return path.startsWith("/manus-storage/") ? `${MANUS_ASSET_ORIGIN}${path}` : path;
}
