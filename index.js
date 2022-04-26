const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const ejsMate = require('ejs-mate');
const countriesRoutes = require('./routes/countries');

// EJS Setup
app.set('view engine', 'ejs');
app.set(express.static(path.join(__dirname, 'views')));
app.engine('ejs', ejsMate);

// Body parsing middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static assets middleware
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', countriesRoutes);

app.use((req, res) => {
    res.status(404).render('notFound');
});

app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));