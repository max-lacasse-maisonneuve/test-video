import Footer from "./Footer";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, expect, it } from "vitest";

describe("FOOTER", () => {
    it("devrait comporter l'année en cours", () => {
        const { container } = render(<Footer></Footer>);
        const annee = new Date().getFullYear();
        const elementHTML = screen.getByText(`© Tous droits réservés ${annee}`);
        expect(elementHTML).toBeInTheDocument();
    });

    it("devrait être une balise footer", () => {
        const { container } = render(<Footer></Footer>);
        const footer = container.querySelector("footer");
        expect(footer).toBeInTheDocument();
    });
});
