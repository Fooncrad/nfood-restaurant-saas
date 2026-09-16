import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const publicHome = readFileSync(fileURLToPath(new URL("../pages/PublicHome.tsx", import.meta.url)), "utf8");
const trendSection = readFileSync(fileURLToPath(new URL("../components/PublicTrendMarketSection.tsx", import.meta.url)), "utf8");
const marketplace = readFileSync(fileURLToPath(new URL("../pages/MarketplaceLanding.tsx", import.meta.url)), "utf8");
const marketplaceSector = readFileSync(fileURLToPath(new URL("../pages/MarketplaceSector.tsx", import.meta.url)), "utf8");
const app = readFileSync(fileURLToPath(new URL("../App.tsx", import.meta.url)), "utf8");
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

  it("uses the same canonical sector slugs in the marketplace fallback catalog", () => {
    ["restaurant", "fashion", "beauty_salon", "grocery", "vegetables", "laundry", "automotive", "public_works"].forEach((slug) => {
      expect(marketplace).toContain(`slug: "${slug}"`);
    });
    expect(marketplace).not.toContain('slug: "restaurants-food-cafes"');
    expect(marketplace).not.toContain('slug: "fashion-apparel"');
    expect(marketplace).not.toContain('slug: "field-services"');
  });

  it("keeps the sector page directional and gives every supported language a safe return state", () => {
    expect(marketplaceSector).toContain('const { direction, language } = useLanguage()');
    expect(marketplaceSector).toContain('<main dir={direction}');
    expect(marketplaceSector).toContain('Back to marketplace');
    expect(marketplaceSector).toContain('Retour au marché');
    expect(marketplaceSector).toContain('العودة للسوق');
    expect(marketplaceSector).toContain('This sector is unavailable');
    expect(marketplaceSector).toContain('Ce secteur n’est pas disponible');
  });

  it("redirects legacy store-directory links to the marketplace instead of rendering NotFound", () => {
    expect(app).toContain('function LegacyStoresRoute()');
    expect(app).toContain('navigate("/marketplace", { replace: true })');
    expect(app).toContain('<Route path="/stores" component={LegacyStoresRoute} />');
  });

  it("keeps the marketplace free of a side navigation and enables governance actions", () => {
    expect(marketplace).not.toContain("MarketplaceSidebar");
    expect(storeGovernance).toContain("adminUpdateStore");
    expect(storeGovernance).toContain('store.status ? "تعطيل" : "تفعيل"');
    expect(storeGovernance).toContain("PLAN_TIERS");
  });

  it("keeps complete copy sets for Arabic, English, and French without rendering Arabic fallback in public English or French", () => {
    expect(publicHome).toContain("const copy = {");
    expect(publicHome).toContain("Everything your business needs.");
    expect(publicHome).toContain("Tout ce dont votre activité a besoin.");
    expect(publicHome).toContain("كل ما يحتاجه نشاطك.");
    expect(trendSection).toContain("const localizedSectorCopy = {");
    expect(trendSection).toContain("Restaurants, Food & Cafés");
    expect(trendSection).toContain("Restaurants, cuisine et cafés");
    expect(trendSection).toContain('locale === "ar" ? (restaurant.brandDescription || copy.fallbackDescription) : copy.fallbackDescription');
  });

  it("replaces temporary restaurant skeletons with an honest localized empty state", () => {
    expect(trendSection).toContain('restaurants.isLoading ? [0, 1, 2].map');
    expect(trendSection).toContain('!restaurants.data?.length ? (');
    expect(trendSection).toContain('{copy.noRestaurants}');
    expect(trendSection).toContain('No active restaurants yet.');
    expect(trendSection).toContain('Aucun restaurant actif pour le moment.');
  });
});
