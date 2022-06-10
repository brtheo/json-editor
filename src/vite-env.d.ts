/// <reference types="vite/client" />

interface IData {
  [k:string]: Object | DataValue;
}
type DataValue = String | Number | Boolean | BigInteger | any

type InputType = 'text' | 'checkbox' | 'number'