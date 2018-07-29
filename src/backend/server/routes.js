// const express = require('express')
// const app = require('./index.js')
// const db = require('../db/index.js')
// const axios = require('axios')

// app.post('/donations', (req, res) => {
//   axios.post('https://api.pandapay.io/v1/donations', {
//     amount: req.amount,
//     currency: 'usd',
//     source: req.source,
//     receipt_email: req.email,
//     platform_fee: req.platformFee,
//   }, {
//     headers: {
//       Content-Type: 'application/json',
//       Authorization: 'sk_test_VqeLRlTF9__rpiMIHuXu2g'
//     }
//   }).then((response) => {
//     res.send(response)
//   }).catch((err) => {
//     console.log(err)
//     res.status(500).send('could not post')
//   })
// });

// app.get('/funds', (req, res) => {

//   db.fetchFunds((err, data) => {
//     if (err) {
//       res.status(500).send('error fetching funds')
//     } else {
//       res.send(data)
//     }
//   })

// })



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


