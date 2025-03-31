import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, expect, it, vi } from "vitest";
import VignetteFilm from "./VignetteFilm";
import { useNavigate } from "react-router-dom";
import userEvent from "@testing-library/user-event";

vi.mock("react-router-dom", () => {
    return {
        useNavigate: vi.fn(),
    };
});

describe("VignetteFilm", () => {
    it("devrait affiche les bonnes données d'un film en paramètre", () => {
        const filmTest = {
            id: "1",
            titre: "Patate",
            titreVignette: "Patate.jpg",
        };
        const { container } = render(<VignetteFilm film={filmTest}></VignetteFilm>);

        const titre = container.querySelector(".titre");
        expect(titre).toBeInTheDocument();
        expect(titre.textContent).toBe(filmTest.titre);
    });

    it("devrait déclencher la bonne route lors du clic", async () => {
        const fausseFonction = vi.fn();
        useNavigate.mockReturnValue(fausseFonction);
        const filmTest = {
            id: "1",
            titre: "Patate",
            titreVignette: "Patate.jpg",
        };
        const { container } = render(<VignetteFilm film={filmTest}></VignetteFilm>);
        const titre = container.querySelector(".titre");
        await userEvent.click(titre);
        expect(fausseFonction).toBeCalledWith("/films/1");
    });
});
