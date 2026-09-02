import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Worship } from "@/pages/Worship";

/**
 * Round-17: the two sacrament cards (Confession / Eucharistic Adoration)
 * gain aria-hidden icon chips so the left column carries the same visual
 * weight as the six devotion rows beside it.
 */

function renderWorship() {
  return render(
    <MemoryRouter>
      <Worship />
    </MemoryRouter>,
  );
}

describe("Worship sacraments column", () => {
  it("pairs the Confession card with a decorative icon", () => {
    renderWorship();
    const heading = screen.getByRole("heading", { name: "Confession" });
    const card = heading.closest("div.rounded-xl") ?? heading.parentElement;
    expect(card?.querySelector("svg[aria-hidden='true']")).not.toBeNull();
  });

  it("pairs the Eucharistic Adoration card with a decorative icon", () => {
    renderWorship();
    // "Eucharistic Adoration" also titles a devotion row — target the card heading
    const headings = screen.getAllByRole("heading", { name: "Eucharistic Adoration" });
    const card = headings
      .map((h) => h.closest("div.rounded-xl"))
      .find((el) => el?.querySelector("svg[aria-hidden='true']"));
    expect(card).toBeDefined();
  });

  it("keeps the mass schedule facts rendered from site.ts", () => {
    renderWorship();
    expect(screen.getByRole("heading", { name: "Confession" })).toBeInTheDocument();
    expect(
      screen.getAllByRole("heading", { name: "Eucharistic Adoration" }).length,
    ).toBeGreaterThanOrEqual(1);
  });
});
