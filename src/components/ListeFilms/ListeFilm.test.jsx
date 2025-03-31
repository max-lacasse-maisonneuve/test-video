import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, expect, it, vi } from "vitest";
import ListeFilms from "./ListeFilms";
import { useNavigate } from "react-router-dom";
import userEvent from "@testing-library/user-event";

vi.mock("react-router-dom", () => {
    return {
        useNavigate: vi.fn(),
    };
});

globalThis.fetch = vi.fn();

describe("LISTE FILM", () => {
    it("devrait récupérer et afficher une liste de films", async () => {
        const tableauFilms = [
            { id: "1", titre: "Patate", titreVignette: "Patate.jpg" },
            { id: "1", titre: "Patate", titreVignette: "Patate.jpg" },
        ];
        const reponse = {
            json: async () => {
                return await tableauFilms;
            },
            ok: true,
        };
        globalThis.fetch.mockResolvedValue(reponse);

        const { container } = render(<ListeFilms></ListeFilms>);

        await waitFor(() => {
            const vignettes = container.querySelectorAll(".grille-element");
            console.log(vignettes.length);

            expect(vignettes.length).toBeGreaterThan(0);
        });
    });
});
