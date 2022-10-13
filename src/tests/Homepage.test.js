import Homepage from "../pages/Homepage";
import { render, screen, waitFor } from "@testing-library/react/pure";
import userEvent from "@testing-library/user-event";
import { Routes, Route, BrowserRouter } from 'react-router-dom';

const inputData = {
  username: "test1",
  password: "test1@password"
};

describe("Homepage form on submit", () => {

  test("should validate username input", () => {
    render(
      <BrowserRouter>
        <Homepage />
      </BrowserRouter>
    );

    const nameInput = screen.getByTestId("username");
    userEvent.type(nameInput, "test1");

    const passwordInput = screen.getByTestId("password");
    userEvent.type(passwordInput, "test1@password");
  });

  test("should display error when username is not filled", async () => {
    userEvent.clear(screen.queryByTestId("username"));

    const errorMessageEl = await screen.findByText(/Username is required/i);
    expect(errorMessageEl).toBeInTheDocument();
    userEvent.type(screen.queryByTestId("username"), "test1");
  });


  test("should display error when password is not filled", async () => {
    userEvent.clear(screen.queryByTestId("password"));

    const errorMessageEl = await screen.findByText(/Password is required/i);
    expect(errorMessageEl).toBeInTheDocument();
    userEvent.type(screen.queryByTestId("password"), "test1@password");
  });

  test("should show display text", async () => {
    const text = await screen.findByText(/We are the Twitter Team/i);
    expect(text).toBeInTheDocument();
  })

});