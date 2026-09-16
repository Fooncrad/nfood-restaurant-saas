import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const component = readFileSync(fileURLToPath(new URL("../components/DriverDeliveryView.tsx", import.meta.url)), "utf8");

describe("DriverDeliveryView localization", () => {
  it("follows the shared language direction instead of a fixed RTL layout", () => {
    expect(component).toContain('const { direction, language } = useLanguage()');
    expect(component).toContain('<div dir={direction}');
    expect(component).not.toContain('dir="rtl"');
  });

  it("contains complete Arabic, English, and French driver labels", () => {
    expect(component).toContain('title: "مركز السائق والتوصيل"');
    expect(component).toContain('title: "Driver & delivery hub"');
    expect(component).toContain('title: "Centre chauffeur & livraison"');
    expect(component).toContain('Share location');
    expect(component).toContain('Partager la position');
  });

  it("keeps Arabic API refusal codes stable while rendering translated labels", () => {
    expect(component).toContain('const FAILURE_REASON_CODES = ["العميل لم يرد"');
    expect(component).toContain('setFailureReason(event.target.value as FailureReasonCode | "")');
    expect(component).toContain('refusalReasonLabels[index]');
  });
});
