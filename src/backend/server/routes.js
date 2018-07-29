const express = require('express')
const app = require('./index.js')
const db = require('../db/index.js')

app.post('/donations', (req, res) => {

});

app.get('/funds', (req, res) => {

  db.fetchFunds((err, data) => {
    if (err) {
      res.status(500).send('error fetching funds')
    } else {
      res.send(data)
    }
  })

})

//populate:
// db.saveFund('equality', [{name: 'AwesomeCharity'}, {name: 'EvenMoreAwesomeCharity'}], 'be free', (err) => {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log('fine')
//   }
// })

// db.saveFund('dancing', [{name: 'DancerCharity'}, {name: 'HardcoreDanceCharity'}], 'rhythm', (err) => {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log('dancer')
//   }
// })


