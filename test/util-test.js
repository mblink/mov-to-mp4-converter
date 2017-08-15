require('./setup');
const util = require('../src/util');

const mkRand = (min, max) => Math.floor((Math.random() * (max - min)) + min);
const zeroPad = num => (`00${num}`).substring(`${num}`.length);

describe('util', () => {
  describe('timeStrToSec', () => {
    Array.from(Array(1000)).map((_, i) => {
      const [hours, mins, secs] = [mkRand(0, 100), mkRand(0, 60), mkRand(0, 60)];
      const expected = (hours * 60 * 60) + (mins * 60) + secs;
      const timeStr = `${zeroPad(hours)}:${zeroPad(mins)}:${zeroPad(secs)}`;
      return it(`returns ${expected} seconds for ${timeStr} (case #${i})`, () =>
        expect(util.timeStrToSec(timeStr)).to.equal(expected));
    });
  });

  describe('fitToMaxDimensions', () => {
    Array.from(Array(1000)).map((_, i) => {
      const [width, height] = [mkRand(10, 500000000), mkRand(10, 500000000)];
      const [maxWidth, maxHeight] = [mkRand(10, 200000), mkRand(10, 200000)];
      return it(`scales ${width}x${height} to fit within ${maxWidth}x${maxHeight} (case #${i})`, () => {
        const [scaledWidth, scaledHeight] = util.fitToMaxDimensions(width, height, maxWidth, maxHeight);
        expect(scaledWidth).to.be.at.most(width);
        expect(scaledWidth).to.be.at.most(maxWidth);
        expect(scaledHeight).to.be.at.most(height);
        expect(scaledHeight).to.be.at.most(maxHeight);
      });
    });
  });
});
