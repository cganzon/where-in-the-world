const express = require('express');
const router = express.Router();
const axios = require('axios');

// All countries route
router.get('/', (req, res, next) => {
    axios.get('https://restcountries.com/v2/all')
        .then(response => {
            const countries = response.data;
            res.render('countries', { countries });
        })
        .catch(() => next());
});

// Filter countries by region route
router.get('/region', (req, res, next) => {
    const { filter } = req.query;
    axios.get(`https://restcountries.com/v2/region/${filter}`)
        .then(response => {
            const countries = response.data;
            res.render('countries', { countries });
        })
        .catch(() => next());
});

// Search countries route
router.get('/search', (req, res, next) => {
    const { query } = req.query;
    axios.get(`https://restcountries.com/v2/name/${query.trim()}`)
        .then(response => {
            const countries = response.data;
            res.render('countries', { countries });
        })
        .catch(() => next());
});

const getBorderCountries = async borderCountries => {
    const borderCountriesArr = [];
    // Checking to see if the country.borders property exists for the country that is being viewed
    if(borderCountries) {
        for(let borderCountry of borderCountries) {
            await axios.get(`https://restcountries.com/v2/alpha/${borderCountry}`)
                .then(response => {
                    borderCountriesArr.push(response.data);
                })
                .catch(err => console.log(err));
        }
        return borderCountriesArr;
    };
};

// Show country route
router.get('/:countryCode', (req, res, next) => {
    const { countryCode } = req.params;
    axios.get(`https://restcountries.com/v2/alpha/${countryCode}`)
        .then(async response => {
            const country = response.data;
            let languages;
            let currencies;
            if(country.currencies) {
                // Mapping the currency names into a new array and using that to created a comma separated list (if there are multiple currencies)
                currencies = country.currencies.map(currency => currency.name).join(', ');
            };
            if(country.languages) {
                // Mapping the language names into a new array and using that to created a comma separated list (if there are multiple languages)
                languages = country.languages.map(language => language.name).join(', ');
            };
            // The country.borders array (if it exists) only contains the alpha3Code for each border country
            // Therefore, the getBorderCountries function is used to display the actual name of each border country instead of the alpha3Code (better user experience)
            const borderCountries = await getBorderCountries(country.borders);
            res.render('countryDetails', { country, currencies, languages, borderCountries });
        })
        .catch(() => next());
});

module.exports = router;