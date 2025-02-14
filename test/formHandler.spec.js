import { handleSubmit } from "../src/client/js/formHandler";

// Mock the DOM
document.body.innerHTML = `
    <form id="urlForm">
        <input id="name" type="text" name="url">
        <button type="submit">Submit</button>
    </form>
    <div id="results"></div>
`;

// Mock Fetch API
global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({ sentiment: "positive", contentType: "subjective", preview: "Sample text" }),
    })
);

describe("Testing formHandler.js", () => {
    test("handleSubmit function should be defined", () => {
        expect(handleSubmit).toBeDefined();
    });

    test("handleSubmit should update the results div", async () => {
        document.getElementById("name").value = "https://www.example.com";
        const event = { preventDefault: jest.fn() };

        await handleSubmit(event);

        expect(document.getElementById("results").innerHTML).toContain("Sentiment");
        expect(document.getElementById("results").innerHTML).toContain("Content Type");
    });
});