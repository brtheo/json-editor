
export const countKeysOf = (data: IData): number => Object.keys(data).length

export const randomColor = (base: string,...args: number[]): string => 
  `#${base}${args.map((n:number,i:number) => ((Math.log10(n))).toString(16).substring(i+2,i+6).replace('.','0')).join('')}`


// export const randomColor = (x: number=0,y:number=3): string => `
//   #${
//     (Math.random()+(x*2)+y)
//     .toString(16)
//     .substring(2,8)
//   }
// `

function makeShades(color: string, modifier: number) {
    color = color.replace(/^#/, '')
    if (color.length === 3) 
      color = color[0] + color[0] + color[1] + color[1] + color[2] + color[2]
  
    const [_r, _g, _b] = color.match(/.{2}/g) as RegExpMatchArray
    let [r, g, b]: Array<number|string> = [parseInt(_r, 16) + modifier, parseInt(_g, 16) + modifier, parseInt(_b, 16) + modifier]
  
    r = Math.max(Math.min(255, r), 0).toString(16)
    g = Math.max(Math.min(255, g), 0).toString(16)
    b = Math.max(Math.min(255, b), 0).toString(16)
  
    const rr = (r.length < 2 ? '0' : '') + r
    const gg = (g.length < 2 ? '0' : '') + g
    const bb = (b.length < 2 ? '0' : '') + b
  
    return `#${rr}${gg}${bb}70`
}

export function* shadesGenerator(startingColor: string,shades: number, modifier: number =-5) {
  for (let i = 1; i<= shades; i++) {
    yield makeShades(startingColor,modifier*i)
    i = i===shades?1:i
  }
}

