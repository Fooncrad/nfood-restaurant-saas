import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const page = readFileSync(fileURLToPath(new URL("../pages/StoreMarketing.tsx", import.meta.url)), "utf8");

describe("StoreMarketing language and product workflow", () => {
  it("uses LanguageContext direction instead of a fixed RTL layout", () => {
    expect(page).toContain('const { direction, language } = useLanguage()');
    expect(page).toContain('<main dir={direction}');
    expect(page).not.toContain('dir="rtl"');
  });

  it("keeps Arabic, English, and French merchant copy in the local translation set", () => {
    expect(page).toContain('title: "لوحة التاجر"');
    expect(page).toContain('title: "Merchant console"');
    expect(page).toContain('title: "Espace marchand"');
    expect(page).toContain('Back to marketplace');
    expect(page).toContain('Retour au marché');
  });

  it("retains direct image upload and the complete sector-specific product metadata workflow", () => {
    expect(page).toContain('trpc.media.upload.useMutation()');
    expect(page).toContain('scope: "user"');
    expect(page).toContain('sizes: product.sizes');
    expect(page).toContain('colors: product.colors');
    expect(page).toContain('addOns: product.addOns');
    expect(page).toContain('duration: product.duration');
    expect(page).toContain('material: product.material');
    expect(page).toContain('weight: product.weight');
  });
});
