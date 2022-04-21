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

app.get('/', (req, res) => {
    axios.get('https://restcountries.com/v3.1/all')
        .then(response => {
            const countries = response.data;
            res.render('home', { countries });
        })
        .catch(err => console.log(err));
});

app.get('/region', (req, res) => {
    const { filter } = req.query;
    axios.get(`https://restcountries.com/v3.1/region/${filter}`)
        .then(response => {
            const countries = response.data;
            res.render('home', { countries});
        })
        .catch(err => console.log(err));
});

app.get('/search', (req, res) => {
    const { query } = req.query;
    axios.get(`https://restcountries.com/v3.1/name/${query}`)
        .then(response => {
            const countries = response.data;
            res.render('home', { countries});
        })
        .catch(err => console.log(err));
})

app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));