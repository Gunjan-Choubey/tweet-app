import ForgotPassword from "../pages/ForgotPassword";
import { render, screen, waitFor } from "@testing-library/react/pure";
import userEvent from "@testing-library/user-event";
import { Routes, Route, BrowserRouter } from 'react-router-dom';

const inputData = {
  username: "test1",
  password: "test1@password",
  confirmPassword: "test1@password",
};

describe("ForgotPassword form on submit", () => {

  test("should validate username input", () => {
    render(
      <BrowserRouter>
        <ForgotPassword />
      </BrowserRouter>
    );

    const nameInput = screen.getByTestId("username");
    userEvent.type(nameInput, "test1");

    const passwordInput = screen.getByTestId("password");
    userEvent.type(passwordInput, "test1@password");

    const passwordConfirmInput = screen.getByTestId("password");
    userEvent.type(passwordConfirmInput, "test1@password");
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

  test("should display error when passwordConfirm is not filled", async () => {
    userEvent.clear(screen.queryByTestId("confirmPassword"));

    const errorMessageEl = await screen.findByText(/Please Confirm Password/i);
    expect(errorMessageEl).toBeInTheDocument();
    userEvent.type(screen.queryByTestId("confirmPassword"), "test1@password");
  });

  test(" onClick button ", async () => {
    const submitButton = screen.queryByTestId("submitButton", { name: /Submit/i });
    userEvent.click(submitButton);
    expect(screen.getByText('Go back to Homepage!').closest('a')).toHaveAttribute('href', '#!')
  });

});