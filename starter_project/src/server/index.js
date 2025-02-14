const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const NLP_API_URL = 'https://kooye7u703.execute-api.us-east-1.amazonaws.com/NLPAnalyzer';

// Function to scrape text from a given URL
async function scrapeTextFromURL(url) {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        const text = $('body').text().trim();
        return text.slice(0, 200);
    } catch (error) {
        throw new Error('Failed to scrape text from the URL');
    }
}

// API Route to analyze text from a URL
app.post('/analyze-url', async (req, res) => {
    const { url } = req.body;

    if (!url) return res.status(400).json({ error: 'URL is required' });

    try {
        const text = await scrapeTextFromURL(url);
        const response = await axios.post(NLP_API_URL, { text });

        return res.json({
            sentiment: response.data.tone,
            contentType: response.data.subjectivity,
            preview: text
        });

    } catch (error) {
        return res.status(500).json({ error: 'Failed to analyze text' });
    }
});

// Start Server
app.listen(8000, () => console.log('Server running on port 8000'));
