import compileStylus from 'stylus';
import { createFilter } from 'rollup-pluginutils';

var path = require('path');
/**
 * rollup-plugin-stylus
 * @param {Object} options
 *   @param {Array || String} include, exclude - A minimatch pattern, or an array of minimatch patterns of including ID, or excluding ID (optional)
 *   @param {Function} fn - A function invoked with the Stylus renderer (it will be passed to use() function of the Stylus)
 *   @param {Function} identName - names of css classes
 * @return {Object} rollup plugin with transform function
 */
function rollupPluginStylusImport() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var filter = createFilter(options.include, options.exclude);
  var sourceMap = false; // options.sourceMap !== false;
  /* ident */

  return {
    name: 'rollup-plugin-stylus-import',
    transform: function transform(code, id) {
      // console.log("id", id)
      // console.log("filter(id)", filter(id))
      if (filter(id)) {
        return {
          code: 'export default ' + JSON.stringify(code) + ';',
          map: { mappings: '' }
        };
        /* compile stylus syntax to css */
        var style = compileStylus(code);
        // console.log("style", style);

        style.render(function (err, css) {
          var cssString = css.toString();
          var stringifiedCss = JSON.stringify(cssString);
          console.log("stringifiedCss", stringifiedCss);
          var retObj = {
            code: 'export default ' + stringifiedCss,
            map: { mappings: '' }
          };
          console.log("retObj", retObj);
          return retObj;
        });
      }
    }
  };
}

export default rollupPluginStylusImport;
