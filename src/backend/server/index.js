const path = require('path');
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const db = require('../db/index.js')
const axios = require('axios')

const app = express();

require('dotenv').config();

app.use(express.static('dist'));
app.use(bodyParser.json());

app.get('*', (req, res) => res.sendFile(path.resolve('./../dist/index.html')));

app.post('/donations', (req, res) => {
  //post a donation
  axios.post('https://api.pandapay.io/v1/donations', {
    amount: req.amount,
    currency: 'usd',
    source: req.source,
    receipt_email: req.email,
    platform_fee: req.platformFee,
  }).then((response) => {
    res.send(response)
  }).catch((err) => {
    console.log(err)
    res.status(500).send('could not post')
  })
});

app.get('/funds/charities', (req, res) => {
  //get information for all causes and all charities

  db.fetchFunds((err, data) => {
    if (err) {
      res.status(500).send('error fetching funds')
    } else {
      res.send(data)
    }
  })

})

app.get('/causes/:category', (req, res) => {

  axios.get(`http://api.data.charitynavigator.org/v2/Categories?app_id=${process.env.CHARITY_NAV_APP_ID}&app_key=${process.env.CHARITY_NAV_APP_KEY}`)
    .then((response) => {
      response.data.forEach((category) => {
        if (category.categoryName === req.params.category) {
          let causes = category.causes.map((cause => {
            return cause.causeName
          }))
          res.send(causes)
        }
      })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send('Error fetching causes')
    })
})

app.listen(2000, () => {
  console.log('listening on port 2000');
});

module.exports = app;
