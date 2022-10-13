import Tweets from "../pages/Tweets";
import { render, screen, waitFor } from "@testing-library/react/pure";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from 'react-router-dom';

const tweetsList = [{
    tweetId: "test12345",
    tweet: "testing",
    date_Time: "10-12-2022",
    tag: "testingTag",
    loginId: "testing@1",
    reply: ["test@1",
        "Testing"],
    likedTweets: ["test@1"]
},
{
    tweetId: "test12345",
    tweet: "testing",
    date_Time: "10-12-2022",
    tag: "testingTag",
    loginId: "testing@1",
    reply: [
        "test@1",
        "Testing"],
    likedTweets: ["test@1"]
}
];

describe("Tweets", () => {

    test("should render", async () => {
        render(
            <BrowserRouter>
                <Tweets tweetsList={tweetsList} />
            </BrowserRouter>
        );
        const text = await screen.findAllByText(/Tweet/i);
        expect(text[0]).toBeVisible();
    });

});