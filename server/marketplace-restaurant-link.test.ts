import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const source = readFileSync(fileURLToPath(new URL("./marketplaceRouter.ts", import.meta.url)), "utf8");

describe("marketplace restaurant linkage", () => {
  it("persists the authenticated merchant restaurant on new listings", () => {
    expect(source).toContain("const restaurantId = await getMerchantRestaurantId(ctx.user.id)");
    expect(source).toContain("restaurantId: restaurantId ?? null");
  });

  it("uses listing restaurantId before the legacy brand-name fallback for public storefront data", () => {
    expect(source).toContain("restaurantId: marketplaceListings.restaurantId");
    expect(source).toContain("const restaurantsById = new Map(linkedRestaurants.map");
    expect(source).toContain("let restaurant = linkedRestaurantId ? restaurantsById.get(linkedRestaurantId) ?? null : null");
    expect(source).toContain("if (!restaurant) restaurant =");
    expect(source).toContain("where(eq(restaurants.brandName, entity.customerName))");
  });

  it("keeps public store details and the merchant console aligned with the same relationship", () => {
    expect(source).toContain("const linkedRestaurantId = listings.find((listing) => listing.restaurantId != null)?.restaurantId;");
    expect(source).toContain("?? await getMerchantRestaurantId(ctx.user.id)");
  });
});
