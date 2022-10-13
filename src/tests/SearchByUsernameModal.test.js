import SearchByUsernameModal from "../modals/SearchByUsernameModal";
import { render, screen, waitFor } from "@testing-library/react/pure";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from 'react-router-dom';

const userRecord = {
    firstName: "test",
    lastName: "case",
    email: "test@gmail.com",
    loginId: "test@1",
    password: "test1@password"
};

describe("SearchByUsernameModal", () => {

    test("should render", async () => {
        render(
            <BrowserRouter>
                <SearchByUsernameModal
                 openModal={true}
                 closeModal={false}
                 saveAndClose={false}
                 userRecord={userRecord}
                  />
            </BrowserRouter>
        );
        const text=await screen.findByText(/User/i);
        expect(text).toBeInTheDocument();
    });

});