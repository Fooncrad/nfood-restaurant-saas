import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const publicHome = readFileSync(fileURLToPath(new URL("../pages/PublicHome.tsx", import.meta.url)), "utf8");
const trendSection = readFileSync(fileURLToPath(new URL("../components/PublicTrendMarketSection.tsx", import.meta.url)), "utf8");
const marketplace = readFileSync(fileURLToPath(new URL("../pages/MarketplaceLanding.tsx", import.meta.url)), "utf8");
const storeGovernance = readFileSync(fileURLToPath(new URL("../components/MarketplaceStoresView.tsx", import.meta.url)), "utf8");

describe("public Trend marketplace integration", () => {
  it("places Trend Market directly after the public cover", () => {
    expect(publicHome).toContain('import PublicTrendMarketSection from "@/components/PublicTrendMarketSection"');
    expect(publicHome.indexOf("<PublicTrendMarketSection />")).toBeGreaterThan(publicHome.indexOf("</section>"));
    expect(trendSection).toContain('id="trend-market"');
  });

  it("covers the eight sectors with direct sector links", () => {
    expect(trendSection).toContain('slug: "restaurant"');
    expect(trendSection).toContain('slug: "fashion"');
    expect(trendSection).toContain('slug: "beauty_salon"');
    expect(trendSection).toContain('slug: "grocery"');
    expect(trendSection).toContain('slug: "vegetables"');
    expect(trendSection).toContain('slug: "laundry"');
    expect(trendSection).toContain('slug: "automotive"');
    expect(trendSection).toContain('slug: "public_works"');
    expect(trendSection).toContain('href={`/marketplace/sector/${slug}`}');
  });

  it("keeps the marketplace free of a side navigation and enables governance actions", () => {
    expect(marketplace).not.toContain("MarketplaceSidebar");
    expect(storeGovernance).toContain("adminUpdateStore");
    expect(storeGovernance).toContain('store.status ? "تعطيل" : "تفعيل"');
    expect(storeGovernance).toContain("PLAN_TIERS");
  });
});
