import Welcome from "../pages/Welcome";
import { render, screen } from "@testing-library/react/pure";
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { MemoryRouter } from 'react-router-dom';
import { Card } from "react-bootstrap";
import userEvent from "@testing-library/user-event";


describe("Welcome", () => {

    test("should render", async () => {
        render(
            <MemoryRouter initialEntries={[{ pathname: '/', state: { name: "test" }, search: '?value=teresa_teng' }]}>
                <Welcome />
            </MemoryRouter>
        );
        const text = await screen.findByText(/Hello/i);
        expect(text).toBeInTheDocument();
    });

    test("should render", async () => {
        render(
            <MemoryRouter initialEntries={[{ pathname: '/', state: { name: "test" }, search: '?value=teresa_teng' }]}>
                <Card />
            </MemoryRouter>
        );
    });

});