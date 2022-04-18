const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Where in the world?');
});

app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));