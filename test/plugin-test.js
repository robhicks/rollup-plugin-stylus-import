const stylus = require('../lib/rollup-plugin-stylus.cjs.js');
const rollup = require('rollup').rollup;
const vm = require('vm');
const runInNewContext = vm.runInNewContext;

describe('rollup-plugin-stylus-import', () => {
  it('should generate a bundle with includes css compiled by stylus', () => {
    return rollup({
      entry: 'test/entry.js',
      plugins: [stylus({include: 'test/**/*.styl'})]
    })
    .then((bundle) => {
      // console.log("bundle", bundle)
      // let result = bundle.generate({format: 'cjs'});
      // const exports = {};
      // const module  = { exports };
      // runInNewContext(result.code, {module, exports});

      // expect(module.exports).to.be.equal('foo');
    })
    .catch((err) => {
      expect(err).to.not.exist;
    })
  });
});
