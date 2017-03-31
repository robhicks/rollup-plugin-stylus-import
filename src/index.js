const path = require('path');
import compileStylus from 'stylus';
import { createFilter } from 'rollup-pluginutils';

/**
 * rollup-plugin-stylus
 * @param {Object} options
 *   @param {Array || String} include, exclude - A minimatch pattern, or an array of minimatch patterns of including ID, or excluding ID (optional)
 *   @param {Function} fn - A function invoked with the Stylus renderer (it will be passed to use() function of the Stylus)
 *   @param {Function} identName - names of css classes
 * @return {Object} rollup plugin with transform function
 */
export default function rollupPluginStylusImport(options = {}) {
  const filter = createFilter(options.include, options.exclude);
  const sourceMap = false; // options.sourceMap !== false;
  /* ident */

  return {
    name: 'rollup-plugin-stylus-import',
    transform(code, id) {
      return new Promise((resolve, reject) => {
        // console.log("id", id)
        // console.log("filter(id)", filter(id))
        if (filter(id)) {
          /* compile stylus syntax to css */
          const style = compileStylus(code);
          // console.log("style", style);

          style.render((err, css) => {
            if (err) reject(err);
            else {
              let cssString = css.toString();
              let stringifiedCss = JSON.stringify(cssString);
              console.log("stringifiedCss", stringifiedCss)
              let retObj = {
                code: `export default ${stringifiedCss}`,
                map: { mappings: '' },
              };
              console.log("retObj", retObj)
              resolve(retObj);
            }
          });
        }
      });
    }
  };
}
