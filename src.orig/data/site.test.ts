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
    expect(site.mapsUrl).toMatch(/^https:\/\/www\.google\.com\/maps/);
  });

  it("has contact phones (+65), no UEN, chequePayee BSC, facebook/instagram/whatsapp", () => {
    expect(site.contact.parishPriestPhone).toMatch(/\+65/);
    expect(site.contact.officePhone).toMatch(/\+65/);
    expect(site.contact.emergencyPhone).toMatch(/\+65/);
    expect(site.contact.email).toMatch(/@/);
    // BSC has no UEN — cheque payable to Blessed Sacrament Church
    expect((site as Record<string, unknown>).uen).toBeUndefined();
    expect(site.chequePayee).toBe("Blessed Sacrament Church");
    expect(site.facebook).toMatch(/^https:\/\//);
    expect(site.instagram).toMatch(/^https:\/\//);
    expect(site.whatsapp).toMatch(/^https:\/\//);
    expect(site.archdiocese).toMatch(/^https:\/\//);
  });

  it("has hours for gates, mainChurch, chapel, reception, parishOffice, adorationRoom", () => {
    expect(site.hours.gates.length).toBeGreaterThan(0);
    expect(site.hours.mainChurch.length).toBeGreaterThan(0);
    expect(site.hours.chapel.length).toBeGreaterThan(0);
    expect(site.hours.reception.length).toBeGreaterThan(0);
    expect(site.hours.parishOffice.length).toBeGreaterThan(0);
    expect(site.hours.adorationRoom.length).toBeGreaterThan(0);
    expect((site.hours as Record<string, unknown>).mediaCentre).toBeUndefined();
  });

  it("has mass schedule with weekdayMorning/weekdayEvening/saturday/sunday[6]/confession/adoration/secondCollection", () => {
    expect(site.mass.weekdayMorning.length).toBeGreaterThan(0);
    expect(site.mass.weekdayEvening.length).toBeGreaterThan(0);
    expect(site.mass.saturday.length).toBeGreaterThan(0);
    expect(site.mass.sunday).toHaveLength(6);
    for (const slot of site.mass.sunday) {
      expect(slot.length).toBeGreaterThan(0);
    }
    expect(site.mass.confession.length).toBeGreaterThan(0);
    expect(site.mass.adoration.length).toBeGreaterThan(0);
    expect(site.mass.secondCollection.length).toBeGreaterThan(0);
    expect(site.mass.note.length).toBeGreaterThan(0);
  });

  it("has feast Corpus Christi Thursday after Trinity", () => {
    expect(site.feast.name).toBe("Corpus Christi · Most Holy Body and Blood of Christ");
    expect(site.feast.date).toBe("Thursday after Trinity");
  });

  it("has canonical origin https://www.bsc.org.sg with derived url and ogImage", () => {
    expect(site.origin).toBe("https://www.bsc.org.sg");
    expect(site.origin.endsWith("/")).toBe(false);
    expect(site.url).toBe(`${site.origin}/`);
    expect(site.ogImage).toBe(`${site.origin}/images/hero-church.jpg`);
    expect(site.ogImage.startsWith(site.origin)).toBe(true);
  });

  it("exposes whatsapp, sacredHearts and parishUpdates links", () => {
    expect(site.whatsapp).toMatch(/^https:\/\//);
    expect(site.sacredHearts).toMatch(/^https:\/\//);
    expect(site.parishUpdates).toMatch(/^https:\/\//);
  });
});
