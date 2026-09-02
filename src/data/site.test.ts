import { describe, expect, it } from "vitest";
import { site } from "@/data/site";

describe("site", () => {
  it("has canonical address 1 Commonwealth Drive with full and encoded query", () => {
    expect(site.address.street).toBe("1 Commonwealth Drive");
    expect(site.address.city).toBe("Singapore");
    expect(site.address.zip).toBe("149603");
    expect(site.address.full).toContain(site.address.street);
    expect(site.address.full).toContain(site.address.zip);
    expect(site.address.query).toBe(encodeURIComponent(site.address.full));
  });

  it("has mapsUrl and mapsEmbedSrc matching google.com/maps", () => {
    expect(site.mapsUrl).toMatch(/google\.com\/maps/);
    expect(site.mapsEmbedSrc).toMatch(/google\.com\/maps/);
  });

  it("has contact phones (+65), UEN present, chequePayee, facebook/instagram", () => {
    expect(site.contact.officePhone).toMatch(/\+65/);
    expect(site.contact.email).toMatch(/@/);
    // BSC has a UEN for PayNow
    expect(site.uen).toBe("T08CC1234A");
    expect(site.chequePayee).toBe("Church of the Blessed Sacrament");
    expect(site.facebook).toMatch(/^https:\/\//);
    expect(site.instagram).toMatch(/^https:\/\//);
    expect(site.archdiocese).toMatch(/^https:\/\//);
  });

  it("has hours for church, office, reception, adoration, confession", () => {
    expect(site.hours.church.length).toBeGreaterThan(0);
    expect(site.hours.office.length).toBeGreaterThan(0);
    expect(site.hours.reception.length).toBeGreaterThan(0);
    expect(site.hours.adoration.length).toBeGreaterThan(0);
    expect(site.hours.confessionWeekday.length).toBeGreaterThan(0);
    expect(site.hours.confessionWeekend.length).toBeGreaterThan(0);
  });

  it("has mass schedule with weekdayMorning/weekdayNoon/weekdayEvening/saturday/sunday[6]/confession/adoration", () => {
    expect(site.mass.weekdayMorning.length).toBeGreaterThan(0);
    expect(site.mass.weekdayNoon.length).toBeGreaterThan(0);
    expect(site.mass.weekdayEvening.length).toBeGreaterThan(0);
    expect(site.mass.saturday.length).toBeGreaterThan(0);
    expect(site.mass.sunday).toHaveLength(6);
    for (const slot of site.mass.sunday) {
      expect(slot.time.length).toBeGreaterThan(0);
      expect(slot.language.length).toBeGreaterThan(0);
    }
    expect(site.mass.confession.length).toBeGreaterThan(0);
    expect(site.mass.adoration.length).toBeGreaterThan(0);
    expect(site.mass.note.length).toBeGreaterThan(0);
  });

  it("has feast Corpus Christi", () => {
    expect(site.feast.name).toContain("Corpus Christi");
    expect(site.feast.date).toContain("Trinity");
  });

  it("has canonical url https://bsc.org.sg with ogImage", () => {
    expect(site.url).toBe("https://bsc.org.sg/");
    expect(site.ogImage).toBe("https://bsc.org.sg/images/hero-church.jpg");
  });

  it("exposes youtube social link", () => {
    expect(site.youtube).toMatch(/^https:\/\//);
  });
});
