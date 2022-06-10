export const countKeysOf = (data: IData): number => Object.keys(data).length
export const randomColor = (x: number=0,y:number=3): string => `
  #${
    (Math.random()+(x*2)+y)
    .toString(16)
    .substring(2,8)
  }
`