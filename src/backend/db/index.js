const mongoose = require('mongoose');
const { Fund, User, Donation, Userfund } = require('./models.js');
const { assignCharityPercentages } = require('./lib/helpers.js');

mongoose.connect('mongodb://localhost/causefolio');

const fetchFunds = (callback) => {
  Fund.find({}, (err, data) => {
    if (err) {
      callback(err, null)
    } else {
      callback(null, data)
    }
  })
}

const saveUser = (name, email, callback) => {
  const newUser = new User({
    name,
    email,
  });

  newUser.save((err) => {
    if (err) {
      callback(err);
    } else {
      callback(null);
    }
  });
};

const saveFund = (name, charities, callback) => {

  const newFund = new Fund({
    name,
    charities,
  });

  newFund.save((err) => {
    if (err) {
      callback(err)
    } else {
      callback(null)
    }
  });
};

const findFundById = (id, userFund, callback) => {

  console.log("id", id)

  if (userFund) {
    Userfund.find({_id: id}).then((data) => {
      callback(data)
    })
  } else {
    Fund.find({_id: id}).then((data) => {
      callback(data)
    })
  }
}

const fetchFundId = (fundName, callback) => {

  Fund.find({name: fundName}).then((err, data) => {
    if (err) {
      callback(err, null)
    } else {
      callback(null, data[0].fund_id)
    }
  })

}

module.exports.saveFund = saveFund;
module.exports.saveUser = saveUser;
module.exports.fetchFunds = fetchFunds;
module.exports.User = User;
module.exports.Donation = Donation;
module.exports.Fund = Fund;
module.exports.findFundById = findFundById;

