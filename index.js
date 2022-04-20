const { default: axios } = require('axios');
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

// EJS Setup
app.set('view engine', 'ejs');
app.set(express.static(path.join(__dirname, 'views')));

// Static assets middleware
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    axios.get('https://restcountries.com/v2/all')
        .then(response => {
            const countries = response.data;
            res.render('home', { countries });
        })
        .catch(err => console.log(err));
});

app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));