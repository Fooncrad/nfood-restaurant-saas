import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const page = readFileSync(fileURLToPath(new URL("../pages/CustomerPortal.tsx", import.meta.url)), "utf8");

describe("CustomerPortal direction", () => {
  it("uses the shared language direction rather than forcing RTL", () => {
    expect(page).toContain('const { language, direction, setLanguage } = useLanguage()');
    expect(page).toContain('<main dir={direction}');
    expect(page).not.toContain('dir="rtl"');
  });

  it("renders a restaurant phone only once per directory card", () => {
    const phoneRows = page.match(/\{restaurant\.phone && <p className="mt-2 text-xs font-bold text-slate-500">الجوال: \{restaurant\.phone\}<\/p>\}/g) ?? [];
    expect(phoneRows).toHaveLength(1);
  });
});
