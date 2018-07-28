const mongoose = require('mongoose');
const { Fund, User, Donation } = require('./models.js');
const { assignCharityPercentages } = require('./lib/helpers.js');

mongoose.connect('mongodb://localhost/causefolio');

const saveUser = (name, email, callback) => {
  const newUser = new User({
    name: name,
    email: email,
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

  const updatedCharities = assignCharityPercentages(charities)

  const newCategory = new Category({
    name: name,
    cause: cause,
    charities: updatedCharities,
  });

  newCategory.save((err) => {
    if (err) {
      callback(err)
    } else {
      callback(null)
    }
  });

}

saveFund('Generic Category', [{
  name: 'CauseOne',
}, { name: 'Better Cause' } ], 'trololololololololo', (err) => {
  if (err) {
    console.log(err)
  } else {
    console.log('cat saved')
  }
})
