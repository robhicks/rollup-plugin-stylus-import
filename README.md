# rollup-plugin-stylus-import

A Rollup.js plugin to compile Stylus files to css for importing into web components.  

## Installation

```bash
npm install --save-dev robhicks/rollup-plugin-stylus-import
```

## Usage

Add the following code to your project's `rollup.config.js`:

```js
import stylus from 'rollup-plugin-stylus';

export default {
  entry: 'index.js',
  plugins: [
    stylus(),
  ]
};
```

### in Stylus

```stylus
.container
  height 100%
```

### in JS

```js
import css from './component.styl';

class MyComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `<style>${css}</style><div></div>`;
  }

  static get observedAttributes() {
    return [];
  }
}

customElements.define('my-component', MyComponent);

export { IdxFindBatches };
```

## License

MIT
