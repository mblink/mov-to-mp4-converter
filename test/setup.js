const chai = require('chai');
const sinon = require('sinon');

global.expect = chai.expect;
chai.use(require('dirty-chai'));
chai.use(require('sinon-chai'));

const utils = { match: sinon.match };
const testFns = ['spy', 'stub', 'mock'];

beforeEach(() => {
  utils.sandbox = sinon.createSandbox();
  Object.assign(utils, ...testFns.map(fn => ({ [fn]: utils.sandbox[fn].bind(utils.sandbox) })));
});

afterEach(() => {
  utils.sandbox.restore();
  testFns.forEach(fn => delete utils[fn]);
});

module.exports = utils;
