import path from 'path';
import compileStylus from 'stylus';
import { createFilter } from 'rollup-pluginutils';

/**
 * rollup-plugin-stylus
 * @param {Object} options
 *   @param {Array || String} include, exclude - A minimatch pattern, or an array of minimatch patterns of including ID, or excluding ID (optional)
 *   @param {Boolean} sourceMap - If true is specified, source map to be embedded in the output CSS (default is true)
 *   @param {Function} fn - A function invoked with the Stylus renderer (it will be passed to use() function of the Stylus)
 *   @param {Function} identName - names of css classes
 * @return {Object} rollup plugin with transform function
 */
function rollupPluginStylus(options) {
  if ( options === void 0 ) options = {};

  var filter = createFilter(options.include, options.exclude);
  var fn = options.fn;
  var sourceMap = options.sourceMap !== false;

  /* output */
  var outputFile     = typeof options.output === 'string';
  var outputFunction = typeof options.output === 'function';

  /* ident */
  var identFunction = typeof options.identName === 'function';

  var customObject = {};
  var allCss = new Set();

  return {
    transform: function transform(code, id) {
      if (!filter(id) || path.extname(id) !== '.styl') { return null; }

      var localIdentName =
        !sourceMap && identFunction
        ? options.identName(process.cwd(), id, customObject)
        : path.relative(process.cwd(), id);

      /* compile stylus syntax to css */
      var style = compileStylus(code);

      style.set('filename', localIdentName);

      if (sourceMap) { style.set('sourcemap', { inline: true }); }

      if (fn) { style.use(fn); }

      style.render(function (err, css) {
        return {
          code: ("export default " + (JSON.stringify(css.toString()))),
          map: { mappings: '' },
        };
      });
    }
    // transform: async (code, id) => {
    //   if (!filter(id) || path.extname(id) !== '.styl')
    //     return null
    //
    //   const localIdentName =
    //     !sourceMap && identFunction
    //     ? options.identName(process.cwd(), id, customObject)
    //     : path.relative(process.cwd(), id)
    //
    //   /* compile stylus syntax to css */
    //   const style = compileStylus(code)
    //
    //   style.set('filename', localIdentName)
    //
    //   if (sourceMap)
    //     style.set('sourcemap', { inline: true })
    //
    //   if (fn)
    //     style.use(fn)
    //
    //   const css = await style.render();
    //
    //   return {
    //     code: `export default ${JSON.stringify(css.toString())}`,
    //     map: { mappings: '' },
    //   }
    // },
  }
}

export default rollupPluginStylus;
