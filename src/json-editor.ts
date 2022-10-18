import { html, LitElement, TemplateResult} from 'lit'
import { countKeysOf, randomColor, shadesGenerator} from './utils'
import { customElement, property } from 'lit/decorators.js'
import { styleMap } from 'lit/directives/style-map.js';
import { styles } from './styles'
import { LENGTH_20 } from './const'
import  './bkj-dropdown';

/**
 * TODO:
 * 1. save the data in memory/state
 *  1.1 make tree based on open => get corresponding object in memory/state
 * 2. make own accordion component
 *  2.2 animate opening
 * 3. make toggable edit for fields and keys (only num and text ?)
 * 4. better style
 */

@customElement('json-editor')
export class JsonEditor extends LitElement {
  static override styles = styles

  @property({ type: Object, attribute: true})
  private data: IData = {}

  private makeTree(data: IData): TemplateResult {
    const iterator = shadesGenerator('#44d196',10,20)
    return html`
      ${Object.keys(data).map((key) => {
        const borderColorStyle = {
          backgroundColor: (iterator.next().value as string)
        }
        return html`
          <bkj-dropdown  
            color='blue'
            style=${styleMap(borderColorStyle)}
            ?isOpen=${typeof data[key] !== 'object'}>
            ${ typeof data[key] === 'object'
              ? html`
                  <span slot="title">
                    [${countKeysOf(data[key])}] <i>${typeof data[key]}</i>
                  </span> 
                  <div class="treeContainer" slot="content">
                    <input type="text" value=${key} />
                    <div class="tree">${this.makeTree(data[key])}</div>
                  </div>
                `
              : html`
                  <span slot="title">[1] <i>${typeof data[key]} </i>
                    
                  </span>
                  <div class="inputContainer" slot="content">
                    <input input type="text" value=${key} />
                    ${this.makeValue(data[key])}
                  </div>
                `
            }
          </bkj-dropdown>
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

  connectedCallback(): void {
    const makeBranch = (d: DataValue): string => 
      Object.keys(d).map((key) => 
        typeof d[key] === 'object' 
          ? `<${key}>
            ${makeBranch(d[key])}
          </${key}>`
          : `<${key}>
          ${d[key]}
        </${key}>`
      ).join('')

    console.log(makeBranch(this.data))
  }

  protected render(): TemplateResult{
    return html`
     <bkj-dropdown ?isOpen=${true}>
        <span slot="title">
          [${countKeysOf(this.data)}] <i>${typeof this.data}</i>
        </span>
       <div slot="content">
        ${this.makeTree(this.data)}
       </div>
     </bkj-dropdown>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'json-editor': JsonEditor
  }
}
