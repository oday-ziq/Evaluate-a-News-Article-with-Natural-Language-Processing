import { scrapeTextFromURL } from "../src/server/index";
import axios from 'axios';
import cheerio from 'cheerio';

// Mock Axios GET request
jest.mock('axios', () => ({
    get: jest.fn(() => Promise.resolve({ data: "<html><body>Sample text</body></html>" })),
}));

describe("Testing text extraction", () => {
    test("scrapeTextFromURL should be defined", () => {
        expect(scrapeTextFromURL).toBeDefined();
    });

    test("scrapeTextFromURL should return extracted text", async () => {
        const text = await scrapeTextFromURL("https://example.com");
        expect(text).toContain("Sample text");
    });
});