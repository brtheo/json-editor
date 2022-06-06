interface IData {
  [k:string]: Object | String | Number | Boolean | BigInteger| any;
}
type DataValue = String | Number | Boolean | BigInteger | any

type InputType = 'text' | 'checkbox' | 'number'