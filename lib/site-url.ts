// Set SITE_URL only when the custom-domain launch is ready.
// Preview deployments must not advertise production canonical URLs.
export function siteUrl(path: string): string | undefined {
  if (process.env.VERCEL_ENV === "preview" || !process.env.SITE_URL) return undefined;
  const base = new URL(process.env.SITE_URL);
  if (base.protocol !== "https:" || base.username || base.password || base.pathname !== "/" || base.search || base.hash) {
    throw new Error("SITE_URL must be an HTTPS origin without a path or credentials");
  }
  if (!path.startsWith("/") || path.startsWith("//")) throw new Error("Expected a site-relative path");
  return new URL(path, base).href;
}
