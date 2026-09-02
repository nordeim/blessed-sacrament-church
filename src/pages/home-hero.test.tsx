import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Home } from "@/pages/Home";

/**
 * Round-17 home visual contract: the hero image becomes visible and
 * settles via hero-fade under the named scrim, the Welcome section gains
 * the parish Emblem, the hero meta strip is closed by a weave rule, and
 * featured event cards gain the card-lift affordance.
 *
 * Round-19 ("The Merge") additions: the hero carries a meaningful alt
 * naming the folded blue roof, the display headline is "A tent of meeting."
 * with the parish name in the eyebrow, and the Welcome section closes with
 * an overlapping parchment quote card (voice 7.6 → ).
 */

function renderHome() {
  return render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>,
  );
}

describe("Home hero", () => {
  it("lifts the hero image to opacity-55 and keeps the ken-burns drift", () => {
    const { container } = renderHome();
    const img = container.querySelector("section img");
    expect(img?.className).toMatch(/opacity-55/);
    expect(img?.className).toMatch(/hero-ken-burns/);
  });

  it("settles the hero layer in with the hero-fade wrapper", () => {
    const { container } = renderHome();
    const fade = container.querySelector("section .hero-fade");
    expect(fade).not.toBeNull();
    expect(fade?.querySelector("img")).not.toBeNull();
  });

  it("replaces the hand-rolled gradient with the named scrim-hero utility", () => {
    const { container } = renderHome();
    const hero = container.querySelector("section")!;
    expect(hero.querySelector(".scrim-hero")).not.toBeNull();
  });

  it("closes the meta strip with a divider-weave-thin rule", () => {
    const { container } = renderHome();
    const hero = container.querySelector("section")!;
    expect(hero.querySelector(".divider-weave-thin")).not.toBeNull();
  });
});

describe("Home welcome", () => {
  it("anchors the welcome section with the parish Emblem", () => {
    const { container } = renderHome();
    const emblem = container.querySelector("section svg[viewBox='0 0 120 120']");
    expect(emblem).not.toBeNull();
  });
});

describe("Home hero — round-19 voice & alt (audit R1 merge-02)", () => {
  it("describes the folded blue tent roof in the hero image alt", () => {
    const { container } = renderHome();
    const img = container.querySelector("section img");
    expect(img?.getAttribute("alt")).toMatch(/tent-shaped roof|tent roof/i);
  });

  it("no longer hides the meaningful hero image behind aria-hidden", () => {
    const { container } = renderHome();
    const img = container.querySelector("section img");
    expect(img?.closest("[aria-hidden='true']")).toBeNull();
  });

  it("carries the parish name in the eyebrow and the evocative display headline", () => {
    const { container } = renderHome();
    const h1 = container.querySelector("h1");
    expect(h1?.textContent).toContain("A tent of meeting.");
    const eyebrow = h1?.previousElementSibling;
    expect(eyebrow?.textContent).toContain("Church of the Blessed Sacrament");
  });
});

describe("Home welcome — round-19 overlapping quote card", () => {
  it("closes with the expected-you quote on the parchment card", () => {
    const { container } = renderHome();
    const quote = container.querySelector(".welcome-quote");
    expect(quote).not.toBeNull();
    expect(quote?.textContent).toContain(
      "You are not a visitor here. You are expected.",
    );
  });
});

describe("Home featured events", () => {
  it("gives featured event cards the card-lift affordance", () => {
    const { container } = renderHome();
    const lifted = container.querySelectorAll(".card-lift");
    // 3 grounds cards + 4 featured event cards
    expect(lifted.length).toBeGreaterThanOrEqual(7);
  });
});
