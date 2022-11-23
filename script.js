let apiQuotes=[];
const quoteContainer=document.getElementById('quote-container');
const quoteText=document.getElementById('quote')
const authorText=document.getElementById('author');
const newQuoteBtn=document.getElementById('new-quote'); 
const twitterBtn=document.getElementById ('twitter');
const loader=document.getElementById('loader');

// Show Loader
function loading(){
    loader.hidden=false;
    quoteContainer.hidden=true;
}
// Hide Loader
function completed(){
    loader.hidden=true;
    quoteContainer.hidden=false;
}

// Get new Quote
function quotes(){
    loading();
    const quote=apiQuotes[Math.floor(Math.random()*apiQuotes.length)];
    if(!quote.author){
        authorText.textContent='Unknown';
    }else{
    
    authorText.textContent=quote.author;
    
    }
    if(quote.text.length>100){
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent=quote.text;
    completed();
}
// Get Quotes from API
async function getQuotes(){
    loading();
    const apiUrl='https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try{
        const response=await fetch(apiUrl);
        apiQuotes=await response.json();
        quotes();
    }catch(error){
        // Catch Error 
    }
}

// Tweet Quote
function tweetQuote(){
    const twitterUrl=`https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl,'_blank');
}

// Event Listeners on Button CLick
newQuoteBtn.addEventListener('click',quotes) ;
twitterBtn.addEventListener('click',tweetQuote) ;

// On Load
getQuotes();