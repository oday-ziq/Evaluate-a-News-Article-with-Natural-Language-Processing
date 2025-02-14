import { isValidURL } from "../src/client/js/nameChecker";

describe("Testing URL validation", () => {
    test("isValidURL function should be defined", () => {
        expect(isValidURL).toBeDefined();
    });

    test("Valid URLs should return true", () => {
        expect(isValidURL("https://www.google.com")).toBe(true);
        expect(isValidURL("http://example.org")).toBe(true);
    });

    test("Invalid URLs should return false", () => {
        expect(isValidURL("invalid-url")).toBe(false);
        expect(isValidURL("www.example")).toBe(false);
    });
});