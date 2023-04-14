import is from '@sindresorhus/is'

export const parseInteger = (number: string): number => {
  const parsedValue = parseInt(number)
  const isNumber = is.number(parsedValue)
  if (!isNumber) throw new Error('Invalid number')
  return parsedValue
}
