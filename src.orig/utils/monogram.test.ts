import { describe, expect, it } from "vitest";
import { monogram } from "@/utils/monogram";

/**
 * Audit R5-L2 + BSC extension: monogram() now handles SS.CC
 * honorifics (Fr Johan Wongso, SS.CC → JW) in addition to OFM/Friar.
 */
describe("monogram", () => {
  it("strips Friar/OFM and initials adjacent names", () => {
    expect(monogram("Friar Esmond Chua, OFM")).toBe("EC");
    expect(monogram("Friar Julian Mariaratnam, OFM")).toBe("JM");
    expect(monogram("Friar Justin Lim, OFM")).toBe("JL");
    expect(monogram("Friar Robin Toha, OFM")).toBe("RT");
  });

  it("strips SS.CC and returns initials for BSC priests", () => {
    expect(monogram("Fr Johan Wongso, SS.CC")).toBe("JW");
    expect(monogram("Fr Rusdi Santoso, SS.CC")).toBe("RS");
    expect(monogram("Fr Karolus Kapolok Huar, SS.CC")).toBe("KK");
    expect(monogram("Fr Sambodo Sru Ujianto, SS.CC")).toBe("SS");
    expect(monogram("Fr Anthony Hutjes, SS.CC")).toBe("AH");
  });

  it("handles names without honorifics", () => {
    expect(monogram("Esmond Chua")).toBe("EC");
    expect(monogram("Julian Mariaratnam")).toBe("JM");
  });

  it("strips Fr./Rev./Father variants case-insensitively", () => {
    expect(monogram("Fr. John Doe")).toBe("JD");
    expect(monogram("Rev. Jane Smith")).toBe("JS");
    expect(monogram("FATHER Michael OFM")).toBe("M");
    expect(monogram("friar john paul")).toBe("JP");
  });

  it("handles hyphenated and multi-word names", () => {
    expect(monogram("John-Paul Smith")).toBe("JS");
    expect(monogram("Mary Anne Lee")).toBe("MA");
    expect(monogram("Jean-Pierre O'Connor")).toBe("JO");
  });

  it("returns a single initial when only one word remains", () => {
    expect(monogram("Francis")).toBe("F");
    expect(monogram("OFM")).toBe("");
    expect(monogram("Friar")).toBe("");
    expect(monogram("SS.CC")).toBe("");
  });

  it("returns empty string for empty or honorific-only input", () => {
    expect(monogram("")).toBe("");
    expect(monogram("   ")).toBe("");
    expect(monogram("Friar OFM")).toBe("");
    expect(monogram("Fr SS.CC")).toBe("");
  });

  it("is case-insensitive and punctuation-tolerant", () => {
    expect(monogram("friar esmond chua, ofm")).toBe("EC");
    expect(monogram("  Friar  Esmond   Chua  ")).toBe("EC");
    expect(monogram("Esmond,, Chua..")).toBe("EC");
    expect(monogram("fr johan wongso, ss.cc")).toBe("JW");
  });
});
