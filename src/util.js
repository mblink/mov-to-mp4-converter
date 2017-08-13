const timeFns = [
  seconds => seconds,
  minutes => minutes * 60,
  hours => hours * 60 * 60
];

module.exports = {
  timeStrToSec: time => time.split(':').reverse().reduce((acc, s, i) => acc + timeFns[i](parseFloat(s)), 0)
};
