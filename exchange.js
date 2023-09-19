// const amount=document.getElementById('amount');
// const currency=document.getElementById('currency');
// const convert=document.getElementById('convert');
// const result=document.getElementById('result');

// const API_KEY=""
// const apiUrl="https://api.api-ninjas.com/v1/exchangerate?pair=USD_"

// document.addEventListener('DOMContentLoaded',() =>{

//     convert.addEventListener('click',() => {

//         const amountTotal=amount.value ;
//         const currencyTotal=currency.value;
//         const url=apiUrl+currencyTotal;
    
//         fetch(url,{
//             headers:{
//                 'X-API-KEY' : API_KEY
//             }
//         })
//         .then(response => response.json())
//         .then(data => {
//             const  rate=data.exchange_rate;
//             const resultPrice=amountTotal*rate;
//             result.innerHTML = `${amountTotal} USD = ${resultPrice.toFixed(2)} ${currencyTotal}`;
//         })
    
//         .catch(error => {
//             console.error('Request failed:',error);
//             result.innerHTML = 'An error occured';
//         })
//     })

// })



// Select DOM elements
const amount = document.getElementById('amount');
const currency = document.getElementById('currency');
const convert = document.getElementById('convert');
const result = document.getElementById('result');

// Define your API key and API endpoint
const API_KEY = 'YOUR_API_KEY';
const apiUrl = 'https://api.api-ninjas.com/v1/exchangerate?pair=USD_';

// Function to fetch exchange rate data from the API
async function fetchExchangeRate(currencyTotal) {
    try {
        const response = await fetch(`${apiUrl}${currencyTotal}`, {
            headers: {
                'X-API-KEY': API_KEY,
            }
        });
        
        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        return data.exchange_rate;
    } catch (error) {
        console.error('Error fetching exchange rate:', error);
        throw error;
    }
}

// Function to handle the conversion when the "Convert" button is clicked
async function handleConversion() {
    const amountTotal = amount.value;
    const currencyTotal = currency.value;

    try {
        // Fetch the exchange rate
        const rate = await fetchExchangeRate(currencyTotal);

        // Calculate the converted amount
        const resultPrice = amountTotal * rate;

        // Display the result
        result.innerHTML = `${amountTotal} USD = ${resultPrice.toFixed(2)} ${currencyTotal}`;
    } catch (error) {
        // Handle errors gracefully
        result.innerHTML = 'An error occurred during conversion.';
    }
}

// Event listener for the "Convert" button
document.addEventListener('DOMContentLoaded', () => {
    convert.addEventListener('click', handleConversion);
});
