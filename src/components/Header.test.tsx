import { describe, expect, it, vi, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { Header } from "@/components/Header";

/**
 * Round-16 Header a11y contract (audit L2 + L3):
 * - hamburger carries a stateful accessible name ("Open menu"/"Close menu")
 *   alongside aria-expanded (audit L2 — static "Toggle menu" today);
 * - Escape anywhere dismisses an open desktop dropdown (audit L3 — the
 *   documented AGENTS.md quirk "Header handles Escape to close menus" regressed
 *   to drawer-only handling);
 * - characterization: the mobile drawer is a modal dialog and returns focus to
 *   the hamburger when closed (round-4 contract — must keep passing).
 */
function renderHeader() {
  return render(
    <MemoryRouter initialEntries={["/"]}>
      <Header />
    </MemoryRouter>,
  );
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe("Header hamburger stateful label (audit L2)", () => {
  it('reads "Open menu" when closed and "Close menu" when open', async () => {
    const user = userEvent.setup();
    renderHeader();
    const toggle = screen.getByRole("button", { name: "Open menu" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    await user.click(toggle);
    // The drawer's internal close button shares the accessible name — the
    // hamburger is the one carrying aria-expanded.
    const hamburger = screen
      .getAllByRole("button", { name: "Close menu" })
      .find((b) => b.getAttribute("aria-expanded") !== null);
    expect(hamburger).toBeTruthy();
    expect(hamburger).toHaveAttribute("aria-expanded", "true");
  });
});

describe("Header desktop dropdown Escape (audit L3)", () => {
  it("closes an open dropdown when Escape is pressed anywhere", async () => {
    const user = userEvent.setup();
    renderHeader();
    await user.hover(screen.getByRole("button", { name: /About/i }));
    expect(screen.getByText("Our parish, our priests, and our story"))
      .toBeTruthy();
    await user.keyboard("{Escape}");
    expect(
      screen.queryByText("Our parish, our priests, and our story."),
    ).toBeNull();
  });
});

describe("Header mobile drawer modal contract (round-4, characterization)", () => {
  it("opens a dialog, and closing it restores focus to the hamburger", async () => {
    const user = userEvent.setup();
    renderHeader();
    await user.click(screen.getByRole("button", { name: "Open menu" }));
    const drawer = screen.getByRole("dialog", { name: "Site menu" });
    expect(drawer).toHaveAttribute("aria-modal", "true");
    // The panel receives initial focus on a 50ms timer (Header effect) —
    // Escape only closes the drawer while focus is inside it.
    await waitFor(() => expect(drawer).toHaveFocus());
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog", { name: "Site menu" })).toBeNull();
    await waitFor(() =>
      expect(document.activeElement).toBe(
        screen.getByRole("button", { name: "Open menu" }),
      ),
    );
  });
});
