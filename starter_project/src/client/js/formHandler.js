import { isValidURL } from './nameChecker';

async function handleSubmit(event) {
    event.preventDefault();
    const url = document.getElementById('name').value;
    const resultsContainer = document.getElementById('results');

    if (!isValidURL(url)) {
        resultsContainer.innerHTML = `<p class="error">Invalid URL. Please enter a valid one.</p>`;
        return;
    }

    try {
        resultsContainer.innerHTML = `<p class="loading">Processing... Please wait.</p>`;

        const response = await fetch('/analyze-url', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url })
        });

        const result = await response.json();

        resultsContainer.innerHTML = `
            <div class="result-card">
                <h3>Analysis Result</h3>
                <p><strong> Sentiment: </strong> ${result.sentiment} </p>
                <p><strong> Content Type: </strong> ${result.contentType} </p>
                <p><strong> Input Text Preview: </strong> "${result.preview}" </p>
            </div>
        `;

    } catch (error) {
        resultsContainer.innerHTML = `<p class="error">Something went wrong. Please try again later.</p>`;
    }
}

export { handleSubmit };
