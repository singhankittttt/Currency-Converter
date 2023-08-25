const fromAmountElement = document.querySelector('.amount');
const convertedAmountElement = document.querySelector('.convertedAmount');
const fromCurrencyElement = document.querySelector('.fromCurrency');
const toCurrencyElement = document.querySelector('.toCurrency');
const resultElement = document.querySelector('.result');
const converterContainer = document.querySelector('.converter-container');

//Array to populate the select tags with these countries
const countries = [
    { code: "AED", name: "United Arab Emirates Dirham" },
    { code: "ARS", name: "Argentine Peso" },
    { code: "AUD", name: "Australian Dollar" },
    { code: "BRL", name: "Brazilian Real" },
    { code: "CAD", name: "Canadian Dollar" },
    { code: "CHF", name: "Swiss Franc" },
    { code: "CLP", name: "Chilean Peso" },
    { code: "CNY", name: "Chinese Yuan" },
    { code: "COP", name: "Colombian Peso" },
    { code: "CZK", name: "Czech Koruna" },
    { code: "DKK", name: "Danish Krone" },
    { code: "EGP", name: "Egyptian Pound" },
    { code: "EUR", name: "Euro" },
    { code: "GBP", name: "British Pound Sterling" },
    { code: "HKD", name: "Hong Kong Dollar" },
    { code: "HRK", name: "Croatian Kuna" },
    { code: "HUF", name: "Hungarian Forint" },
    { code: "IDR", name: "Indonesian Rupiah" },
    { code: "ILS", name: "Israeli New Shekel" },
    { code: "INR", name: "Indian Rupee" },
    { code: "ISK", name: "Icelandic Krona" },
    { code: "JPY", name: "Japanese Yen" },
    { code: "KRW", name: "South Korean Won" },
    { code: "MXN", name: "Mexican Peso" },
    { code: "MYR", name: "Malaysian Ringgit" },
    { code: "NOK", name: "Norwegian Krone" },
    { code: "NZD", name: "New Zealand Dollar" },
    { code: "PEN", name: "Peruvian Sol" },
    { code: "PHP", name: "Philipine Peso" },
    { code: "PLN", name: "Polish Zloty" },
    { code: "RON", name: "Romanian Leu" },
    { code: "RUB", name: "Russian Ruble" },
    { code: "SEK", name: "Swedish Krona" },
    { code: "SGD", name: "Singapore Dollar" },
    { code: "THB", name: "Thai Bhat" },
    { code: "TRY", name: "Turkish Lira" },
    { code: "TWD", name: "Taiwan New Dollar" },
    { code: "UAH", name: "Ukranian Hryvnia" },
    { code: "USD", name: "United States Dollar" },
    { code: "UYU", name: "Uruguyan Peso" },
    { code: "VND", name: "Vietnamese Dong" },
    { code: "ZAR", name: "South African Rand" },
];

// Showing countries from array to select tag
countries.forEach(country => {
    const option1 = document.createElement('option');
    const option2 = document.createElement('option');

    option1.value = option2.value = country.code;
    option1.textContent = option2.textContent = `${country.code} (${country.name})`;

    fromCurrencyElement.appendChild(option1);
    toCurrencyElement.appendChild(option2);

    // Setting default values of select tag
    fromCurrencyElement.value = "USD";
    toCurrencyElement.value = "INR";
});


const getExchangeRate = async () => {
    const amount = parseFloat(fromAmountElement.value);
    const fromCurrency = fromCurrencyElement.value;
    const toCurrency = toCurrencyElement.value;
    resultElement.textContent = "Fetching Exchange Rates....";

    try {
        //Fetch data from API
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
        const data = await response.json();

        const conversionRate = data.rates[toCurrency];
        const convertedAmount = (amount * conversionRate).toFixed(2);

        if (typeof conversionRate === 'undefined') {
            resultElement.textContent = "Exchange rate data is not available for selected countries!!!";
            convertedAmountElement = "";
        }
        else {
            convertedAmountElement.value = convertedAmount;
            resultElement.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
        }
    }
    catch (error) {
        converterContainer.innerHTML = `<h2>Error while fetching exchange rates!!! </h2>`;
    }
}

// Fetching exchange rate when user inputs the amount
fromAmountElement.addEventListener('input', getExchangeRate);

// Fetching exchange rate when user change currency
fromCurrencyElement.addEventListener('change', getExchangeRate);
toCurrencyElement.addEventListener('change', getExchangeRate);

window.addEventListener('load', getExchangeRate);