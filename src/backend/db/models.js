const mongoose = require('mongoose');

const fundSchema = mongoose.Schema({
  fund_id: mongoose.Schema.Types.ObjectId,
  name: String,
  charities: [{
    name: String,
    percent_donation: Number,
  }],
});

const userSchema = mongoose.Schema({
  email: String,
  name: String,
});

const donationSchema = mongoose.Schema({
  pandapay_id: mongoose.Schema.Types.ObjectId,
  source: String,
  amount: Number,
  email: String,
  platformFee: Number,
  timestamp: Date,
  fund: { type: mongoose.Schema.Types.ObjectId, ref: 'Fund' },
});

const Fund = mongoose.model('Category', fundSchema);
const User = mongoose.model('User', userSchema);
const Donation = mongoose.model('Donation', donationSchema);

module.exports.User = User;
module.exports.Fund = Fund;
module.exports.Donation = Donation;
