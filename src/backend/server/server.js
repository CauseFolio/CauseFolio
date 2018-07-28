const express = require('express')
const app = require('./index.js')
const db = require('../db/index.js')

app.post('/donations', (req, res) => {

  db.fetchFundId(req.fund, (err, fundId) => {
    if (err) {
      res.status(500).send('Error fetching fund id')
    } else {
      db.saveDonation(req.source, req.amount, req.email, req.platformFee,
        req.timestamp, fundId, (err) => {
          if (err) {
            res.status(500).send('Error saving donation')
          } else {
            res.status(201).send('Donation saved to database!')
          }
        });
    }
  });

  db.saveDonation(req.source, req.amount, req.email, req.platformFee,
    req.timestamp);
});

db.saveFund('HiFund', [{name: 'AwesomeCharity'}, {name: 'EvenMoreAwesomeCharity'}], 'equality', (err) => {
  if (err) {
    console.log(err)
  } else {
    console.log('fine')
  }
})
