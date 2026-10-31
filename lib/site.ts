// The site's public address: Vercel sets VERCEL_PROJECT_PRODUCTION_URL at build time.
export const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const siteTitle = "Sahil Ladhania · The Ride";

export const siteDescription =
  "A ride through ten years, 2016 to 2026, on a black bike. Sahil Ladhania’s entry for the Wispr Flow India growth challenge.";
