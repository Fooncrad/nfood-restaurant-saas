import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const source = (relative: string) => readFileSync(fileURLToPath(new URL(relative, import.meta.url)), "utf8");
const dialogSource = source("../components/ui/dialog.tsx");
const marketingSource = source("../pages/StoreMarketing.tsx");
const marketplaceSource = source("../../../server/marketplaceRouter.ts");

describe("action surfaces and multi-sector product intake", () => {
  it("centers dialog content with safe mobile bounds", () => {
    expect(dialogSource).toContain("!left-1/2 !right-auto !top-1/2");
    expect(dialogSource).toContain("max-h-[calc(100dvh-2rem)]");
    expect(dialogSource).toContain("w-[calc(100%-2rem)]");
  });

  it("provides direct image upload, image URL, pricing, tags, and sector-specific fields", () => {
    expect(marketingSource).toContain("mediaUpload.mutateAsync");
    expect(marketingSource).toContain("image/jpeg,image/png,image/webp");
    expect(marketingSource).toContain('placeholder="https://..."');
    expect(marketingSource).toContain("compareAtPrice");
    expect(marketingSource).toContain("sizes");
    expect(marketingSource).toContain("colors");
    expect(marketingSource).toContain("addOns");
    expect(marketingSource).toContain("duration");
    expect(marketingSource).toContain("material");
    expect(marketingSource).toContain("weight");
  });

  it("persists flexible sector metadata without a fixed category schema", () => {
    expect(marketplaceSource).toContain("metadataJson: z.string().max(8000).optional()");
    expect(marketplaceSource).toContain("marketplace.listing.created");
  });
});
