import { describe, expect, it } from "vitest";
import { monogram } from "@/utils/monogram";

describe("monogram", () => {
  it("strips Fr. honorific and SS.CC post-nominal", () => {
    expect(monogram("Fr Johan Wongso, SS.CC")).toBe("JW");
    expect(monogram("Fr. Rusdi Santoso, SS.CC")).toBe("RS");
  });

  it("strips Father/Rev. variants", () => {
    expect(monogram("Father John Doe")).toBe("JD");
    expect(monogram("Rev. Jane Smith")).toBe("JS");
  });

  it("handles names without honorifics", () => {
    expect(monogram("Esmond Chua")).toBe("EC");
    expect(monogram("Julian Mariaratnam")).toBe("JM");
  });

  it("handles single-word names", () => {
    expect(monogram("Francis")).toBe("FR");
    expect(monogram("OFM")).toBe("OF");
  });

  it("returns empty string for empty input", () => {
    expect(monogram("")).toBe("");
    expect(monogram("   ")).toBe("");
  });

  it("handles hyphenated and multi-word names", () => {
    expect(monogram("John-Paul Smith")).toBe("JS");
    expect(monogram("Mary Anne Lee")).toBe("ML");
  });
});
