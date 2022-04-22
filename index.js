const { default: axios } = require('axios');
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

// EJS Setup
app.set('view engine', 'ejs');
app.set(express.static(path.join(__dirname, 'views')));

// Body parsing middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static assets middleware
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
    axios.get('https://restcountries.com/v3.1/all')
        .then(response => {
            const countries = response.data;
            res.render('countries', { countries });
        })
        .catch(() => next());
});

app.get('/region', (req, res, next) => {
    const { filter } = req.query;
    axios.get(`https://restcountries.com/v3.1/region/${filter}`)
        .then(response => {
            const countries = response.data;
            res.render('countries', { countries});
        })
        .catch(() => next());
});

app.get('/search', (req, res, next) => {
    const { query } = req.query;
    axios.get(`https://restcountries.com/v3.1/name/${query.trim()}`)
        .then(response => {
            const countries = response.data;
            res.render('countries', { countries});
        })
        .catch(() => next());
});

app.get('/:countryCode', (req, res, next) => {
    const { countryCode } = req.params;
    axios.get(`https://restcountries.com/v3.1/alpha/${countryCode}`)
        .then(response => {
            res.send(response.data);
        })
        .catch(() => next());
});

app.use((req, res) => {
    res.status(404).render('notFound');
});

app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));