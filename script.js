const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('x-twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Processed Quote (Quote, Author)
let currentQuote;

// Show Loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function complete() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

// Create New Quote
function newQuote() {
    loading();
    const quote = currentQuote;
    
    authorText.textContent = quote.author;
    quoteText.textContent = quote.quote;

    // Check quote length to determine styling
    if (quote.quote.length > 150) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    complete();
}

// Get One Quotes From API
async function getQuote() {
    loading();
    const apiKey = '88Q1SWMyiW9PY5FqzcJG+Q==UvnukUfQ42lnIr46';
    let options = {
        method: 'GET',
        headers: { 'x-api-key': apiKey }
    }
    const apiUrl = 'https://api.api-ninjas.com/v1/quotes';

    try {
        for (; ; ) {
            const response = await fetch(apiUrl, options);

            // Quote that were obtained from the API (Quote, Author, Category)
            let apiQuote = await response.json();

            // Get quote only if its length <= 210
            if (apiQuote[0].quote.length <= 400) {
                currentQuote = apiQuote[0];
                break;
            } else {
                continue;
            }
        }
                

        // Debug Console Output
        // console.log(currentQuote);
        // console.log(currentQuote[0]);
        // console.log(currentQuote[0].text.length);
        
        newQuote();

    } catch (error) {
        // Catch Error Here
        alert('Error. Something wrong.');
    }
}

// Post A Quote On Twitter
function postOnTwitter() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} © ${authorText.textContent}`;

    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', postOnTwitter)

// On Load
getQuote();