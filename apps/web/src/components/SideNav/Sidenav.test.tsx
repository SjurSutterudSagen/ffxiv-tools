import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, beforeEach, vi, Mock } from "vitest";
import { usePathname } from "next/navigation";

import Sidenav from "./Sidenav";

// Mock the usePathname hook
vi.mock("next/navigation", () => ({
  usePathname: vi.fn(),
}));

describe("Sidenav", () => {
  beforeEach(() => {
    (usePathname as Mock).mockReturnValue("/market");
  });

  it("renders without crashing", () => {
    render(<Sidenav section="/market" />);

    expect(screen.getByText("Market")).toBeTruthy();
  });

  it("renders with correct aria attributes", () => {
    render(<Sidenav section="/market" />);

    const sidenav = screen.getByRole("navigation");
    expect(sidenav).toHaveAttribute("aria-label", "Sidenav");
  });

  it("displays the correct sub-navigation items", () => {
    render(<Sidenav section="/market" />);

    expect(screen.getByText("Overview")).toBeTruthy();
    expect(screen.getByText("Price History")).toBeTruthy();
    expect(screen.getByText("Market Analysis")).toBeTruthy();
    expect(screen.getByText("Favorites")).toBeTruthy();
  });

  it("toggles the sidenav open and closed", () => {
    render(<Sidenav section="/market" />);

    const toggleButton = screen.getByRole("button");

    fireEvent.click(toggleButton);

    expect(screen.queryByText("Market")).not.toBeTruthy();

    fireEvent.click(toggleButton);

    expect(screen.getByText("Market")).toBeTruthy();
  });

  it("highlights the active link", () => {
    render(<Sidenav section="/market" />);

    const activeLink = screen.getByText("Overview").closest("a");

    expect(activeLink).toHaveClass("bg-gray-700");
  });

  it("renders null if no sub-navigation items are found", () => {
    const { container } = render(<Sidenav section="/unknown" />);

    expect(container.firstChild).toBeNull();
  });

  it("renders the correct section title", () => {
    render(<Sidenav section="/crafting" />);

    expect(screen.getByText("Crafting")).toBeTruthy();
  });

  it("displays the correct sub-navigation items for crafting", () => {
    render(<Sidenav section="/crafting" />);

    expect(screen.getByText("Recipe Search")).toBeTruthy();
    expect(screen.getByText("Calculator")).toBeTruthy();
    expect(screen.getByText("Materials")).toBeTruthy();
    expect(screen.getByText("Rotations")).toBeTruthy();
  });

  it("displays the correct sub-navigation items for gathering", () => {
    render(<Sidenav section="/gathering" />);

    expect(screen.getByText("Node Timer")).toBeTruthy();
    expect(screen.getByText("Maps")).toBeTruthy();
    expect(screen.getByText("Collectables")).toBeTruthy();
  });
});
