//如果数字小于10，那么前面就加一个0
export function toNumber(number){
  if(number<10){
    number="0"+number
  }
  return number
}