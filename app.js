const express = require('express');
const bodyParser = require('body-parser');



const articlesRoutes = require('./routes/articles-routes');

const app = express();

app.use(bodyParser.json());

app.use('/api/articles', articlesRoutes);

app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error)
    }
    res.status(error.code || 500)
    res.json({message: error.message || 'An unknown error occurred!'});
});

app.listen(5000);