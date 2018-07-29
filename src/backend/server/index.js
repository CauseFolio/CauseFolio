const express = require('express')
const app = express()
const bodyParser = require('body-parser')

require('dotenv').config()

const options = {
  root: __dirname + '/dist/'
}

app.use(express.static('dist'))
app.use(bodyParser.json());

app.get('*', (req, res) => res.sendFile('index.html', options))

app.listen(2000, () => {
  console.log('listening on port 2000')
})

module.exports = app;
