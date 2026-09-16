import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const source = readFileSync(
  fileURLToPath(new URL("../components/CentralAdminDashboard.tsx", import.meta.url)),
  "utf8",
);

describe("CentralAdminDashboard language synchronization", () => {
  it("uses the global LanguageContext instead of a second persisted language state", () => {
    expect(source).toContain('import { useLanguage } from "@/contexts/LanguageContext"');
    expect(source).toContain("const { language: activeLanguage, setLanguage: setGlobalLanguage } = useLanguage();");
    expect(source).toContain("setGlobalLanguage(order[(order.indexOf(lang) + 1) % order.length])");
    expect(source).not.toContain("localStorage.getItem('nfood-lang')");
    expect(source).not.toContain("localStorage.setItem('nfood-lang'");
  });
});
