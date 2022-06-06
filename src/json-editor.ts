import { html, css, LitElement, TemplateResult, unsafeCSS } from 'lit'
import { countKeysOf} from './utils'
import { ICON_CHEVRON } from './const'
import { customElement, property } from 'lit/decorators.js'

@customElement('json-editor')
export class JsonEditor extends LitElement {
  static override styles = css`
    @import url("https://cdn.jsdelivr.net/npm/@xz/fonts@1/serve/cascadia-code.min.css");
    :host {
      font-family: 'Cascadia Code';
      display: block;
      min-width: 500px;
      min-height: 900px;
      border-radius: 5px;
      border: 2px solid #325cff;
    }
    details > details {
      padding-left: 15px;
    }
    details > summary::before {
      content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' id='mdi-chevron-down' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z'/%3E%3C/svg%3E");
      transform: rotate(-90deg);
      display: block;
      width: 24px;
      height: 24px;
      transition: transform .2s;
    }
    details[open] > summary::before {
      transform: rotate(0deg);
      transition: transform .2s;
    }
    summary {
      display: flex;
    }
    details > summary::-webkit-details-marker {
      display: none;
    }
    input {
      font-family: 'Cascadia Code';
    }
  `

  @property({
    type: Object,
    attribute: true
  })
  private data: IData = {}

  private makeTree(data: IData): TemplateResult {
    return html`
      ${Object.keys(data).map((key) => 
        html`
          <details>
            ${ typeof data[key] === 'object'
              ? html`
                  <summary><input type="text" value=${key} /> object of ${countKeysOf(data[key])} keys </summary>
                  ${this.makeTree(data[key])}
                `
              : html`
                  <summary><input type="text" value=${key} /></summary>
                  ${this.makeValue(data[key])}
                `
              
            }
          </details>
        `
      )}
    `
  }
  private makeValue(value: DataValue): TemplateResult {
    switch(typeof value) {
      case 'string':
        return html`<input type="text" value=${value} />`
      break;
      case 'number': 
        return html`<input type="number" value=${value} />`
      break;
      case 'boolean': 
        return html`<input type="checkbox" value=${value} ?checked=${value} />`
      break;
      default:
        return html`<input type="text" value=${value} />`
      break;
    }
  }

  protected render(): TemplateResult{
    return html`
     <details>
      <summary>Root object of ${countKeysOf(this.data)} keys</summary>
       ${this.makeTree(this.data)}
     </details>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'json-editor': JsonEditor
  }
}
