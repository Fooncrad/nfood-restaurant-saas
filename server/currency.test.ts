import { describe, expect, it } from "vitest";
import { COUNTRIES, CURRENCIES, formatMoney, getCountry, getCurrency } from "@shared/currencies";

describe("country and currency catalog", () => {
  it("contains the default Saudi configuration", () => {
    expect(getCountry("SA")).toMatchObject({ currencyCode: "SAR", locale: "ar-SA" });
    expect(getCurrency("SAR")).toMatchObject({ decimals: 2, symbol: "ر.س" });
  });

  it("supports currencies with three decimal places", () => {
    expect(getCurrency("KWD").decimals).toBe(3);
    expect(formatMoney("12.345", "KWD", "en-US")).toContain("12.345");
  });

  it("normalizes malformed money strings without multiplying the amount", () => {
    expect(formatMoney("5000.00.000", "SAR", "en-US")).toBe("5,000.00");
    expect(formatMoney("3000", "SAR", "en-US")).toBe("3,000.00");
    expect(formatMoney("not-a-number", "SAR", "en-US")).toBe("0.00");
  });

  it("includes African countries and their ISO currencies", () => {
    expect(getCountry("NG")).toMatchObject({ nameAr: "نيجيريا", currencyCode: "NGN" });
    expect(getCountry("ZA")).toMatchObject({ nameAr: "جنوب أفريقيا", currencyCode: "ZAR" });
    expect(getCountry("KE")).toMatchObject({ nameAr: "كينيا", currencyCode: "KES" });
    expect(getCountry("DZ")).toMatchObject({ nameAr: "الجزائر", currencyCode: "DZD" });
    expect(getCurrency("XOF").name).toContain("West African");
    expect(getCurrency("XAF").name).toContain("Central African");
  });

  it("keeps country and currency catalogs non-empty and unique", () => {
    expect(new Set(COUNTRIES.map((country) => country.code)).size).toBe(COUNTRIES.length);
    expect(new Set(CURRENCIES.map((currency) => currency.code)).size).toBe(CURRENCIES.length);
    expect(COUNTRIES.every((country) => CURRENCIES.some((currency) => currency.code === country.currencyCode))).toBe(true);
  });

  it("covers the world: every inhabited country with its ISO currency", () => {
    expect(COUNTRIES.length).toBeGreaterThanOrEqual(190);
    expect(CURRENCIES.length).toBeGreaterThanOrEqual(140);
    expect(getCountry("GE")).toMatchObject({ name: "Georgia", currencyCode: "GEL" });
    expect(getCountry("JP")).toMatchObject({ name: "Japan", currencyCode: "JPY" });
    expect(getCountry("BR")).toMatchObject({ name: "Brazil", currencyCode: "BRL" });
    expect(getCountry("CL")).toMatchObject({ name: "Chile", currencyCode: "CLP" });
    expect(getCountry("TH")).toMatchObject({ name: "Thailand", currencyCode: "THB" });
    expect(getCountry("GH")).toMatchObject({ name: "Ghana", currencyCode: "GHS" });
    expect(getCountry("US")).toBeDefined();
    expect(getCountry("GB")).toBeDefined();
    expect(getCountry("CN")).toBeDefined();
    expect(getCountry("IN")).toBeDefined();
  });

  it("infers each world country's currency and symbols", () => {
    expect(getCountry("GE").currencyCode).toBe("GEL");
    expect(getCurrency("GEL").symbol).toBe("₾");
    expect(getCurrency("SYP").symbol).toBe("ل.س");
    expect(getCurrency("THB").symbol).toBe("฿");
    expect(getCurrency("PYG").decimals).toBe(0);
  });
});
