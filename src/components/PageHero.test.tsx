import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { PageHero } from "@/components/PageHero";

/**
 * Round-17 visual contract for the inner-page hero:
 * imagery becomes visible (opacity up), scrims move to the named
 * utilities, the image settles with hero-fade, and a weave edge
 * closes the band. Copy/roles unchanged (e2e-safe).
 */

describe("PageHero — dusk variant (default)", () => {
  it("renders title and subtitle with the rise-in entrances", () => {
    render(
      <PageHero title="Parish History" subtitle="1954 – Today" image="/images/hero-church.jpg" />,
    );
    const h1 = screen.getByRole("heading", { level: 1, name: "Parish History" });
    expect(h1.className).toMatch(/rise-in/);
    expect(screen.getByText("1954 – Today").className).toMatch(/rise-in-d1/);
  });

  it("lifts image visibility to opacity-45 and settles with hero-fade", () => {
    const { container } = render(
      <PageHero title="Parish History" image="/images/hero-church.jpg" />,
    );
    const img = container.querySelector("img");
    expect(img?.className).toMatch(/opacity-45/);
    expect(img?.className).toMatch(/hero-fade/);
  });

  it("uses the named scrim-page utility", () => {
    const { container } = render(
      <PageHero title="Parish History" image="/images/hero-church.jpg" />,
    );
    const scrim = container.querySelector(".scrim-page");
    expect(scrim).not.toBeNull();
  });

  it("closes the band with a divider-weave-thin edge", () => {
    const { container } = render(
      <PageHero title="Parish History" image="/images/hero-church.jpg" />,
    );
    expect(container.querySelector(".divider-weave-thin")).not.toBeNull();
  });
});

describe("PageHero — light variant", () => {
  it("lifts image visibility to opacity-55 with the lighter scrim-hero", () => {
    const { container } = render(
      <PageHero
        title="News & Events"
        image="/images/hero-church.jpg"
        variant="light"
      />,
    );
    const img = container.querySelector("img");
    expect(img?.className).toMatch(/opacity-55/);
    expect(img?.className).toMatch(/hero-fade/);
    expect(container.querySelector(".scrim-hero")).not.toBeNull();
    expect(container.querySelector(".scrim-page")).toBeNull();
  });
});

describe("PageHero — compact + child content", () => {
  it("keeps the compact padding contract and renders children", () => {
    render(
      <PageHero title="Give" compact image="/images/hero-church.jpg">
        <span>hub line</span>
      </PageHero>,
    );
    const section = screen.getByRole("heading", { name: "Give" }).closest("section");
    expect(section?.className).toMatch(/py-20/);
    // rise-in-d2 lives on the wrapper div around the children
    expect(screen.getByText("hub line").parentElement?.className).toMatch(/rise-in-d2/);
  });

  it("renders without an image (no scrim, no weave)", () => {
    const { container } = render(<PageHero title="Plain" />);
    expect(container.querySelector("img")).toBeNull();
    expect(container.querySelector(".scrim-page")).toBeNull();
    expect(container.querySelector(".divider-weave-thin")).toBeNull();
  });
});
