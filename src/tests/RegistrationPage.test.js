import RegistrationPage from "../pages/RegistrationPage";
import { render, screen, waitFor } from "@testing-library/react/pure";
import userEvent from "@testing-library/user-event";
import { Routes, Route, BrowserRouter } from 'react-router-dom';

const inputData = {
  firstName: "test",
  lastName: "case",
  email: "test@gmail.com",
  loginId: "test@1",
  password: "test1@password",
  contactNumber: "9999900000"
};

describe("RegistrationPage form on submit", () => {

  test("should validate firstName input", () => {
    render(
      <BrowserRouter>
        <RegistrationPage />
      </BrowserRouter>
    );

    const firstNameInput = screen.getByTestId("firstName");
    userEvent.type(firstNameInput, "test");

    const lastNameInput = screen.getByTestId("lastName");
    userEvent.type(lastNameInput, "case");

    const email = screen.getByTestId("email");
    userEvent.type(email, "test@gmail.com");

    const loginId = screen.getByTestId("loginId");
    userEvent.type(loginId, "test@1");

    const passwordInput = screen.getByTestId("password");
    userEvent.type(passwordInput, "test1@password");

    const contactNumber = screen.getByTestId("contactNumber");
    userEvent.type(contactNumber, "9999900000");
  });

  test("should display error when firstName is not filled", async () => {
    userEvent.clear(screen.queryByTestId("firstName"));

    const errorMessageEl = await screen.findByText(/First Name is required/i);
    expect(errorMessageEl).toBeInTheDocument();
    userEvent.type(screen.queryByTestId("firstName"), "test");
  });

  test("should display error when lastName is not filled", async () => {
    userEvent.clear(screen.queryByTestId("lastName"));

    const errorMessageEl = await screen.findByText(/Last Name is required/i);
    expect(errorMessageEl).toBeInTheDocument();
    userEvent.type(screen.queryByTestId("lastName"), "case");
  });

  test("should display error when email is not filled", async () => {
    userEvent.clear(screen.queryByTestId("email"));

    const errorMessageEl = await screen.findByText(/Email is required/i);
    expect(errorMessageEl).toBeInTheDocument();
    userEvent.type(screen.queryByTestId("email"), "test@gmail.com");
  });

  test("should display error when loginId is not filled", async () => {
    userEvent.clear(screen.queryByTestId("loginId"));

    const errorMessageEl = await screen.findByText(/LoginId is required/i);
    expect(errorMessageEl).toBeInTheDocument();
    userEvent.type(screen.queryByTestId("loginId"), "test@1");
  });

  test("should display error when password is not filled", async () => {
    userEvent.clear(screen.queryByTestId("password"));

    const errorMessageEl = await screen.findByText(/Password is required/i);
    expect(errorMessageEl).toBeInTheDocument();
    userEvent.type(screen.queryByTestId("password"), "test1@password");
  });

  test("should display error when contactNumber is not filled", async () => {
    userEvent.clear(screen.queryByTestId("contactNumber"));

    const errorMessageEl = await screen.findByText(/Contact Number is required/i);
    expect(errorMessageEl).toBeInTheDocument();
    userEvent.type(screen.queryByTestId("contactNumber"), "9999900000");
  });


  test("should find Registered Text", async () => {
    expect(screen.getByText('Registered? Go with Sign IN').closest('a')).toHaveAttribute('href', '#!')
  })

});
