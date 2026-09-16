import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const dashboardSource = readFileSync(
  fileURLToPath(new URL("../components/CentralAdminDashboard.tsx", import.meta.url)),
  "utf8",
);
const commandCenterSource = readFileSync(
  fileURLToPath(new URL("../components/CentralAdminCommandCenter.tsx", import.meta.url)),
  "utf8",
);
const homeSource = readFileSync(
  fileURLToPath(new URL("../pages/Home.tsx", import.meta.url)),
  "utf8",
);

describe("CentralAdminDashboard language synchronization", () => {
  it("uses the global LanguageContext instead of a second persisted language state", () => {
    expect(dashboardSource).toContain('import { useLanguage } from "@/contexts/LanguageContext"');
    expect(dashboardSource).toContain("const { language: activeLanguage, setLanguage: setGlobalLanguage } = useLanguage();");
    expect(dashboardSource).toContain("setGlobalLanguage(order[(order.indexOf(lang) + 1) % order.length]");
    expect(dashboardSource).not.toContain("localStorage.getItem('nfood-lang')");
    expect(dashboardSource).not.toContain("localStorage.setItem('nfood-lang'");
  });

  it("opens the central admin on its translated overview instead of the legacy Arabic-only management view", () => {
    expect(homeSource).toContain('if (isCentralAdmin) setActive("overview")');
    expect(homeSource).not.toContain('if (isCentralAdmin) setActive("admin")');
  });

  it("provides French dashboard copy and labels instead of falling back to English", () => {
    expect(commandCenterSource).toContain("const COPY_FR");
    expect(commandCenterSource).toContain('language === "fr" ? COPY_FR : COPY_EN');
    expect(commandCenterSource).toContain('fr: "Vue d’ensemble"');
    expect(commandCenterSource).toContain('fr: "Paiement en attente"');
    expect(commandCenterSource).toContain('all: "Tous"');
    expect(commandCenterSource).toContain('{label(NAV_LABELS[key])}');
    expect(commandCenterSource).toContain('{copy.noResults}');
  });
});
