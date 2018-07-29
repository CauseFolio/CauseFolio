const assignCharityPercentages = charities => {
  updatedCharities = charities.slice('');

  const numberOfCharities = charities.length;
  const percentEach = 100.0 / numberOfCharities;

  updatedCharities.forEach(charity => {
    charity.percent = percentEach;
  });

  return updatedCharities;
};

module.exports.assignCharityPercentages = assignCharityPercentages;
