const timeFns = [
  seconds => seconds,
  minutes => minutes * 60,
  hours => hours * 60 * 60
];

const ensureDivisibleBy2 = num => (num % 2 === 0 ? num : num - 1);

module.exports = {
  timeStrToSec: time => time.split(':').reverse().reduce((acc, s, i) => acc + timeFns[i](parseFloat(s)), 0),

  fitToMaxDimensions: (width, height, maxWidth, maxHeight) => {
    if (width > maxWidth || height > maxHeight) {
      const ratio = Math.min(maxWidth / width, maxHeight / height);
      return [ensureDivisibleBy2(Math.round(width * ratio)), ensureDivisibleBy2(Math.round(height * ratio))];
    }

    return [width, height];
  }
};
