const mongoose = require('mongoose')
const axios = require('axios')
const db = require('../index.js')

let savedFunds = 0

require('dotenv').config();

console.log(process.env.PANDAPAY_SECRET_KEY);

console.log("Charity nav app id", process.env.CHARITY_NAV_APP_ID)

for (let idx = 1; idx <= 11; idx++) {
  axios.get(`http://api.data.charitynavigator.org/v2/Organizations?app_id=${process.env.CHARITY_NAV_APP_ID}&app_key=${process.env.CHARITY_NAV_APP_KEY}&pageSize=3&categoryID=${idx}&sort=RATING%3ADESC`)
    .then((response) => {
      let charities = response.data
      let charitiesInfo = charities.map((charity) => {
        return {
          name: charity.charityName,
          percent_donation: 1.0/3.0,
          id: charity.ein
        }
      })
      db.saveFund(charities[0].category.categoryName, charitiesInfo, (err, data) => {
        if (err) {
          console.log(err)
        } else {
          savedFunds++
          console.log(`Information saved for category ${charities[0].category.categoryName}`)
          if (savedFunds === 11) {
            mongoose.disconnect()
          }
        }
      })
    })
    .catch((error) => {
      console.log(error.data)
    })
}