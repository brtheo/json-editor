import { html, css, LitElement, TemplateResult, CSSResult} from 'lit'
import { customElement, property, query } from 'lit/decorators.js'

@customElement('bkj-dropdown')
export class BkjDropdown extends LitElement {
  static override styles: CSSResult = css`
    :host {
      display: flex;
      width: -webkit-fill-available;
      cursor: pointer;
    }
    :host h4 {
      margin-block: .1rem;
    }
    details {
      display: flex;
      width: -webkit-fill-available;
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
    details > summary::-webkit-details-marker {
      display: none;
    }
    summary {
      display: flex;
    }
  `
  @property({type: Boolean,reflect:true})
  isOpen: boolean = false
  @property({type: Boolean})
  isClosing: boolean = false
  @property({type: Boolean})
  isExpanding: boolean = false
  @property({type: Object})
  animation: any | null = null

  @query('details')
  $details: HTMLDetailsElement
  @query('summary')
  $summary: HTMLElement
  @query('main')
  $main: HTMLElement
  handleToggle(e: Event) {
    const details: HTMLDetailsElement = e.currentTarget as HTMLDetailsElement
    this.isOpen = details.open
  }

  handleClick(e: Event) {
    e.preventDefault()
    this.$details.style.overflow = 'hidden'
    if(this.isClosing || !this.isOpen) this.open()
    else if (this.isExpanding || this.$details.open) this.shrink()
  }

  shrink() {
    this.isClosing = true
    const startHeight = `${this.$details.offsetHeight}px`
    const endHeight = `${this.$summary.offsetHeight}px`
    if(this.animation) this.animation.cancel()
    this.animation = this.$details.animate({
      height: [startHeight,endHeight]
    }, {
      duration: 200,
      easing: 'ease-in'
    })
    this.animation.onfinish = () => this.handleAnimationFinish(false)
    this.animation.oncancel= () => this.isClosing = false
  }

  open() {
    this.$details.style.height = `${this.$details.offsetHeight}px`
    this.$details.open = true
    this.isOpen = true
    window.requestAnimationFrame(() => this.expand())

  }

  expand() {
    this.isExpanding = true
    const startHeight = `${this.$details.offsetHeight}px`
    const endHeight = `${this.$details.offsetHeight + this.$main.offsetHeight}px`
    if(this.animation) this.animation.cancel()
    this.animation = this.$details.animate({
      height: [startHeight,endHeight]
    },{
      duration: 200,
      easing: 'ease-in'
    })
    this.animation.onfinish = () => this.handleAnimationFinish(true)
    this.animation.oncancel= () => this.isClosing = false
  }

  handleAnimationFinish(open: boolean) {
    this.$details.open = open
    this.isOpen = open
    this.animation = null
    this.isClosing = false
    this.isExpanding = false
    this.$details.style.height = this.$details.style.overflow = ''
  }


  protected render(): TemplateResult {
    return html`
      <details  @toggle=${this.handleToggle} ?open=${this.isOpen}>
        <summary @click=${this.handleClick} >
            <h4>
              <slot name="title"></slot>
            </h4>
        </summary>
        ${
          this.isOpen 
            ? html`
              <main>
                <slot name="content"></slot>
              </main>
            `
            : html``
        }
      </details>
    `
  }
}


declare global {
  interface HTMLElementTagNameMap {
    'bkj-dropdown': BkjDropdown
  }
}