import Users from "../pages/Users";
import { render, screen } from "@testing-library/react/pure";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from 'react-router-dom';

const usersList = [{
    firstName: "testing",
    lastName: "cases",
    email: "testing@gmail.com",
    loginId: "testing@1",
    contactNumber: "9999966666"

},
{
    firstName: "test",
    lastName: "case",
    email: "test@gmail.com",
    loginId: "test@1",
    contactNumber: "9999977777"
}
];

describe("Users", () => {

    test("should render", async () => {
        render(
            <BrowserRouter>
                <Users usersList={usersList} />
            </BrowserRouter>
        );
        const text = await screen.findByText(/Results/i);
        expect(text).toBeInTheDocument();
    });

});