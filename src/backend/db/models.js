const mongoose = require('mongoose');

const fundSchema = mongoose.Schema({
  name: String,
  charities: [{
    name: String,
    percent_donation: Number,
  }],
});

const userfundSchema = mongoose.Schema({
  user: String,
  funds: [{
    fund: {type: mongoose.Schema.Types.ObjectId, ref: 'Fund'},
    percent_donation: Number
  }]
})

const userSchema = mongoose.Schema({
  email: String,
  name: String,
});

const donationSchema = mongoose.Schema({
  pandapay_id: String,
  timestamp: Date,
  userfund: { type: mongoose.Schema.Types.ObjectId, ref: 'Userfund'},
  fund: { type: mongoose.Schema.Types.ObjectId, ref: 'Fund' },
});

const Fund = mongoose.model('Category', fundSchema);
const User = mongoose.model('User', userSchema);
const Donation = mongoose.model('Donation', donationSchema);
const Userfund = mongoose.model('Userfund', userfundSchema);

module.exports.User = User;
module.exports.Fund = Fund;
module.exports.Donation = Donation;
module.exports.Userfund = Userfund;
