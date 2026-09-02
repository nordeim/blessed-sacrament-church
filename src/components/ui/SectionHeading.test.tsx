import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Round-17: the gold rule under every section heading draws itself in
 * (rule-draw) — unifying with the timeline-rail / link-underline motif.
 */

describe("SectionHeading", () => {
  it("renders the title with gold-rule and the round-17 rule-draw animation hook", () => {
    render(<SectionHeading eyebrow="Our Grounds" title="Spaces of Worship & Community" />);
    const h2 = screen.getByRole("heading", { level: 2, name: "Spaces of Worship & Community" });
    expect(h2.className).toMatch(/gold-rule/);
    expect(h2.className).toMatch(/rule-draw/);
  });

  it("keeps the eyebrow and description wiring", () => {
    render(
      <SectionHeading
        eyebrow="Upcoming"
        title="News & Events"
        description="Join us for devotions and parish celebrations."
      />,
    );
    expect(screen.getByText("Upcoming")).toBeInTheDocument();
    expect(screen.getByText("Join us for devotions and parish celebrations.")).toBeInTheDocument();
  });

  it("light variant renders cream heading text on dark bands", () => {
    render(<SectionHeading title="Take Your Place" light align="center" />);
    const h2 = screen.getByRole("heading", { level: 2, name: "Take Your Place" });
    expect(h2.className).toMatch(/text-bsc-cream/);
    expect(h2.className).toMatch(/rule-draw/);
  });

  it("center alignment centers the heading block", () => {
    render(<SectionHeading title="Centered" align="center" />);
    const h2 = screen.getByRole("heading", { level: 2, name: "Centered" });
    expect(h2.className).toMatch(/mx-auto/);
  });
});
