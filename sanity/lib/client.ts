import { createClient } from "next-sanity";

// Falls back to the same project ID/dataset hardcoded in sanity.config.ts so the
// site still connects to Sanity in deployments where env vars aren't set
// (.env* is gitignored and never reaches the hosting provider automatically).
// Uses `||` (not `??`) so a blank-string env var set on the host (common when a
// platform's env var UI is left empty) also falls back correctly.
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "gqvk6o1r";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === "production",
});

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

// projectId now always resolves to a real value (env var or hardcoded fallback above),
// so Sanity is always considered configured. Kept for the many call sites that check it.
export const isSanityConfigured = true;
