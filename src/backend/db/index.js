const mongoose = require('mongoose');
const { Fund, User, Donation } = require('./models.js');
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

const saveFund = (name, charities, cause, callback) => {

  const newFund = new Fund({
    name,
    charities,
    cause
  });

  newFund.save((err) => {
    if (err) {
      callback(err)
    } else {
      callback(null)
    }
  });
};

const saveDonation = (source, amount, email, platformFee, timestamp, fundId, callback) => {

  const newDonation = new Donation({
    pandapay_id: new mongoose.Types.ObjectId,
    source,
    amount,
    email,
    platformFee,
    timestamp,
    fund: fundId,
  })

  newDonation.save((err) => {
    if (err) {
      callback(err);
    } else {
      callback(null);
    }
  });

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
module.exports.saveDonation = saveDonation;
module.exports.saveUser = saveUser;
module.exports.fetchFunds = fetchFunds;
