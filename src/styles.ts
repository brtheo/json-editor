import {unsafeCSS, css, CSSResult} from 'lit'
export const styles = css`
  @import url("https://cdn.jsdelivr.net/npm/@xz/fonts@1/serve/cascadia-code.min.css");
  :host {
    font-family: 'Cascadia Code';
    display: block;
    width: 100%;
    min-height: 900px;
  }
  :host input {
    margin: 0;
    font-family: 'Cascadia Code';
    padding: 0;
  }
  .treeContainer {
    display: flex;
  }
  .tree {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }
  bkj-dropdown {
    width: -webkit-fill-available;
    padding: 5px;
    margin: 5px;
    border-radius: 2px;
    border: 1px solid;
    border-color: #282b31bb;
    background-color: #44d19670;
  }
  bkj-dropdown > bkj-dropdown {
    padding-left: 15px;
  }
  .inputContainer {
    padding-left: 36px;
    padding-top: 4px;
  }
  input[type=text], input[type=number] {
    width: 10rem;
    background-color: unset;
    border: unset;
  }
  textarea {
    resize: vertical;
  }
`