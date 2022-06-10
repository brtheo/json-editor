import {unsafeCSS, css, CSSResult} from 'lit'
export const styles = css`
  @import url("https://cdn.jsdelivr.net/npm/@xz/fonts@1/serve/cascadia-code.min.css");
  :host {
    font-family: 'Cascadia Code';
    display: block;
    width: clamp(500px, 75%, 600px);
    min-height: 900px;
    border-radius: 5px;
    border: 2px solid #325cff;
  }
  :host h4 {
    margin-block: .1rem;
  }
  :host input {
    margin: 0;
  }
  details {
    padding: 5px;
    margin: 5px;
  }
  details > details {
    padding-left: 15px;
    border-radius: 5px;
    border: solid 2px;
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
  summary ~ .inputContainer {
    padding-left: 38px;
    padding-top: 4px;
  }
  details > summary::-webkit-details-marker {
    display: none;
  }
  input {
    font-family: 'Cascadia Code';
  }
  textarea {
    resize: vertical;
  }
`