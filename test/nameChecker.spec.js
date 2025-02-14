import { isValidURL } from "../src/client/js/nameChecker";

describe("Testing the URL validation function", () => {
    test("Valid URL should return true", () => {
        expect(isValidURL("https://www.google.com")).toBe(true);
    });

    test("Invalid URL should return false", () => {
        expect(isValidURL("invalid-url")).toBe(false);
    });
});
