const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const axios = require('axios');

const { Fund, User, Donation, Userfund } = require('./../db/models.js');
var ObjectID = require('mongodb').ObjectID;

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}

// require('../db/lib/seedfunds.js');

const db = require('../db/index.js');

app.use(express.static('dist'));
app.use(bodyParser.json());

//more than one fund can go to this endpoint

app.post('/donations', (req, res) => {
  //post a donation
  let grantsCompleted = 0;

  db.findFundById(req.body.fundId, true, data => {
    if (data.length === 0) {
      res.status(500).send('error finding fund information');
    } else {
      axios
        .post(`https://${process.env.PANDAPAY_SECRET_KEY}:@api.pandapay.io/v1/donations`, {
          amount: req.body.amount,
          currency: 'usd',
          source: req.body.source,
          receipt_email: req.body.email,
          platform_fee: 0.02 * req.body.amount
        })
        .then(result => {
          console.log(data);
          data[0].funds.forEach(fund => {
            db.findFundById(fund.fund, false, fundsResult => {
              fundsResult[0].charities.forEach(charity => {
                console.log(charity.name);
                console.log(req.body.amount);
                console.log(req.body.amount * fund.percent_donation * charity.percent_donation);
                axios
                  .post(
                    `https://${process.env.PANDAPAY_SECRET_KEY}:@api.pandapay.io/v1/donations/${result.data.id}/grants`,
                    {
                      amount: req.body.amount * fund.percent_donation * charity.percent_donation,
                      destination: charity.id.toString().slice(0, 2) + '-' + charity.id.toString().slice(2)
                    }
                  )
                  .then(response => {
                    console.log(
                      'THIS URL WORKED',
                      `https://${process.env.PANDAPAY_SECRET_KEY}:@api.pandapay.io/v1/donations/${
                        result.data.id
                      }/grants`
                    );
                    console.log(charity);
                    grantsCompleted++;
                    if (grantsCompleted === data[0].charities.length) {
                      res.send('success on creating grants');
                    }
                  })
                  .catch(error => {
                    console.log(
                      'THIS URL DID NOT',
                      `https://${process.env.PANDAPAY_SECRET_KEY}:@api.pandapay.io/v1/donations/${
                        result.data.id
                      }/grants`
                    );
                    console.log(charity);
                    res.status(500).send('Error posting a grant');
                  });
              });
            });
          });
        })
        .catch(err => {
          console.log(err);
          res.status(500).send('could not post');
        });
    }
  });
});

app.post('/userfunds', (req, res) => {
  db.saveUserfund(req.body.fundIds, (err, data) => {
    if (err) {
      res.status(500).send('error saving user fund');
    } else {
      db.getUserfund(data.id, (err, result) => {
        if (err) {
          res.status(500).send('error populating user fund');
        } else {
          res.send(result);
        }
      });
    }
  });
});

app.get('/funds/:id', (req, res) => {
  if (req.body.userFund) {
    db.findFundById(req.params.id, true, (err, data) => {
      res.send(data);
    });
  } else {
    db.findFundById(req.params.id, false, (err, data) => {
      res.send(data);
    });
  }
});

app.get('/funds/:id', (req, res) => {
  if (req.body.userFund) {
    db.findFundById(req.params.id, true, (err, data) => {
      res.send(data);
    });
  } else {
    db.findFundById(req.params.id, false, (err, data) => {
      res.send(data);
    });
  }
});

app.get('/funds', (req, res) => {
  //get information for all categories

  db.fetchFunds((err, data) => {
    if (err) {
      res.status(500).send('error fetching funds');
    } else {
      res.send(data);
    }
  });
});

app.get('/:category', (req, res) => {
  axios
    .get(
      `http://api.data.charitynavigator.org/v2/Categories?app_id=${process.env.CHARITY_NAV_APP_ID}&app_key=${
        process.env.CHARITY_NAV_APP_KEY
      }`
    )
    .then(response => {
      response.data.forEach(category => {
        if (category.categoryName === req.params.category) {
          let causes = category.causes.map(cause => {
            return cause.causeName;
          });
          res.send(causes);
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).send('Error fetching causes');
    });
});

app.get('/local', (req, res) => {
  axios
    .get(
      `http://api.data.charitynavigator.org/v2/Organizations?app_id=${process.env.CHARITY_NAV_APP_ID}&app_key=${
        process.env.CHARITY_NAV_APP_KEY
      }&pageSize=3&city=San%20Francisco&sort=RATING%3ADESC`
    )
    .then(response => {
      res.send(response.data);
    })
    .catch(err => {
      res.status(500).send('error fetching local information');
    });
});

app.get('*', (req, res) => res.sendFile(path.resolve('./../dist/index.html')));

const port = process.env.PORT;
app.listen(port, () => {
  console.log('listening on port ' + process.env.PORT);
});

module.exports = app;
