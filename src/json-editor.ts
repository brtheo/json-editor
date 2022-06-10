import { html, LitElement, TemplateResult} from 'lit'
import { countKeysOf, randomColor} from './utils'
import { customElement, property } from 'lit/decorators.js'
import { styleMap } from 'lit/directives/style-map.js';
import { styles } from './styles'
import { LENGTH_20 } from './const'

@customElement('json-editor')
export class JsonEditor extends LitElement {
  static override styles = styles

  @property({ type: Object, attribute: true})
  private data: IData = {}

  private makeTree(data: IData, depth: number=2): TemplateResult {
    return html`
      ${Object.keys(data).map((key,idx) => {
        const uniqueColorStyle = {backgroundColor: randomColor(depth, idx)}
        return html`
          <details data-depth=${depth} data-child=${idx+2} style=${styleMap(uniqueColorStyle)}>
            ${ typeof data[key] === 'object'
              ? html`
                  <summary >
                    <h4><input type="text" value=${key} /> object of ${countKeysOf(data[key])} keys </h4>
                  </summary>
                  ${this.makeTree(data[key],depth++)}
                `
              : html`
                  <summary >
                    <h4><input type="text" value=${key} /></h4>
                  </summary>
                  <div class="inputContainer">${this.makeValue(data[key])}</div>
                `
              
            }
          </details>
        `}
      )}
    `
  }

  private makeValue(value: DataValue): TemplateResult {
    switch(typeof value) {
      case 'string':
        return html`
          ${
            LENGTH_20(value) 
              ? html`<input type="text" value=${value} />`
              : html`<textarea rows="6">${value}</textarea>`
          }
        `
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
     <details >
      <summary>
        <h4>
          Root object of ${countKeysOf(this.data)} keys
        </h4>
      </summary>
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
