const axios = require('axios')
const db = require('../index.js')

const app_id = '6461f9d0'
const app_key = 'c1388425161488db513afca1a532db68'

// axios.get(`https://api.data.charitynavigator.org/v2/Categories/?app_id=${app_id}&app_key=${app_key}`)
//   .then((response) => {
//     response.forEach((category) => {
//       let categoryName = category.categoryName;
//       let charities = []


//     })
//   })
//   .catch((error) => {
//     console.log(error)
//   })

for (let idx = 1; idx <= 11; idx++) {
  axios.get(`http://api.data.charitynavigator.org/v2/Organizations?app_id=${app_id}&app_key=${app_key}&pageSize=3&categoryID=${idx}&sort=RATING%3ADESC`)
    .then((response) => {
      let charities = response.data
      let charitiesInfo = charities.map((charity) => {
        return {
          name: charity.charityName,
          percent_donation: 1.0/3.0
        }
      })
      db.saveFund(charities[0].category.categoryName, charitiesInfo, charities[0].cause.causeName, (err, data) => {
        if (err) {
          console.log(err)
        } else {
          console.log(`Information saved for category ${charities[0].category.categoryName}`)
        }
      })
    })
    .catch((error) => {
      console.log(error)
    })
}