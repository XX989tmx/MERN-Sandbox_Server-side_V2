const express = require('express');
const bodyParser = require('body-parser');

const articlesRoutes = require('./routes/articles-routes');

const app = express();

app.use('/api/articles', articlesRoutes);

app.listen(5000);