const mongoose = require('mongoose');
const { Fund, User, Donation } = require('./models.js');
const { assignCharityPercentages } = require('./lib/helpers.js');

mongoose.connect('mongodb://localhost/causefolio');

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
    fund_id: new mongoose.Types.ObjectId,
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

saveFund('Generic Category', [{
  name: 'CauseOne',
}, { name: 'Better Cause' } ], 'trololololololololo', (err) => {
  if (err) {
    console.log(err)
  } else {
    console.log('cat saved')
  }
});

const saveDonation = () => {

}
