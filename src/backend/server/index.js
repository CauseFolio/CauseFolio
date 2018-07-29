const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

require('dotenv').config();

app.use(express.static('dist'));
app.use(bodyParser.json());

app.get('*', (req, res) => res.sendFile(path.resolve('./../dist/index.html')));

app.listen(2000, () => {
  console.log('listening on port 2000');
});

module.exports = app;
