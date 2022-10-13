import RoutesComponent from "../routes/Routes";
import { render, screen, waitFor } from "@testing-library/react/pure";
import userEvent from "@testing-library/user-event";
import { Routes, Route, BrowserRouter } from 'react-router-dom';


describe("RoutesComponent", () => {

    test("should render", async () => {
        render(
            <RoutesComponent />
        );
    });

});