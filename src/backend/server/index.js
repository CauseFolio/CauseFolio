const path = require('path');
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const db = require('../db/index.js')
const axios = require('axios')

require('dotenv').config();

app.use(express.static('dist'));
app.use(bodyParser.json());

//more than one fund can go to this endpoint

app.post('/donations', (req, res) => {
  //post a donation

  if (req.body.userFund) {
    //deal with the case where multiple funds to donate to
  } else {
    db.findFundById(req.body.fundId, false, (data) => {
      if (data.length === 0) {
        res.status(500).send('error finding fund information')
      } else {
        axios.post(`https://${process.env.PANDAPAY_SECRET_KEY}:@api.pandapay.io/v1/donations`, {
          amount: req.body.amount,
          currency: 'usd',
          source: req.body.source,
          receipt_email: req.body.email,
          platform_fee: 0.02 * req.body.amount
        }).then((response) => {
          res.send(data[0].charities)
          
        //but we will actually 
        }).catch((err) => {
          console.log(err)
          res.status(500).send('could not post')
      })
  }
})}
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

app.get('*', (req, res) => res.sendFile(path.resolve('./../dist/index.html')));

app.listen(2000, () => {
  console.log('listening on port 2000');
});

module.exports = app;
