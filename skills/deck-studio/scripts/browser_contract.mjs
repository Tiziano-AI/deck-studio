import { createHash } from "node:crypto";

// One reviewed CfT identity. Updating requires reviewing this version's official
// metadata and rerunning render/export qualification, never resolving "latest".
export const browserVersion = "156.0.8078.47";
export const browserMetadata = "https://googlechromelabs.github.io/chrome-for-testing/156.0.8078.47.json";
export const browserMetadataSha256 = "280a3aaf97babf78351b78176ca4fbf3727bf374752f34ea05aa7753bf423c87";
export const qualifiedBrowserVersion = (value) => value.trim() === `Google Chrome for Testing ${browserVersion}`;
export async function verifyBrowserMetadata(request = fetch) {
  const response = await request(browserMetadata, { redirect: "error", signal: AbortSignal.timeout(15000) });
  if (!response.ok) throw new Error("BROWSER_METADATA_UNAVAILABLE");
  const bytes = await response.text();
  if (createHash("sha256").update(bytes).digest("hex") !== browserMetadataSha256) throw new Error("BROWSER_METADATA_CHANGED");
}
