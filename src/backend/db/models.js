const mongoose = require('mongoose');

const fundSchema = mongoose.Schema({
  name: String,
  charities: [
    {
      name: String,
      id: String,
      percent_donation: Number
    }
  ]
});

const userfundSchema = mongoose.Schema({
  funds: [
    {
      fund: { type: mongoose.Schema.Types.ObjectId, ref: 'Fund' },
      percent_donation: Number
    }
  ]
});

const userSchema = mongoose.Schema({
  email: String,
  name: String
});

const Fund = mongoose.model('Fund', fundSchema);
const User = mongoose.model('User', userSchema);
const Userfund = mongoose.model('Userfund', userfundSchema);

module.exports.User = User;
module.exports.Fund = Fund;
module.exports.Userfund = Userfund;
