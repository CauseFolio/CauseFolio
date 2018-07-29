const mongoose = require('mongoose');
const { Fund, User, Donation, Userfund } = require('./models.js');
const { assignCharityPercentages } = require('./lib/helpers.js');

console.log(process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI);

const fetchFunds = callback => {
  Fund.find({}, (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  });
};

const saveUser = (name, email, callback) => {
  const newUser = new User({
    name,
    email
  });

  newUser.save(err => {
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
    charities
  });

  newFund.save(err => {
    if (err) {
      callback(err);
    } else {
      callback(null);
    }
  });
};

const saveUserfund = (fundIds, callback) => {
  const fundInfo = fundIds.map(id => {
    return {
      fund: id,
      percent_donation: 1.0 / fundIds.length
    };
  });

  const newUserfund = new Userfund({
    funds: fundInfo
  });

  newUserfund.save((err, data) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  });
};


const getUserfund = (id, callback) => {
  Userfund.findOne({
    _id: id}
  ).populate({path: 'funds', populate: {path: 'fund', model: 'Fund'}}).exec(callback);
}


const findFundById = (id, userFund, callback) => {
  console.log('id', id);

  if (userFund) {
    Userfund.find({ _id: id }).then(data => {
      callback(data);
    });
  } else {
    Fund.find({ _id: id }).then(data => {
      callback(data);
    });
  }
};

module.exports.saveFund = saveFund;
module.exports.saveUserfund = saveUserfund;
module.exports.saveUser = saveUser;
module.exports.fetchFunds = fetchFunds;
module.exports.User = User;
module.exports.Donation = Donation;
module.exports.Fund = Fund;
module.exports.findFundById = findFundById;
module.exports.populateUserfund = populateUserfund
module.exports.getUserfund = getUserfund
