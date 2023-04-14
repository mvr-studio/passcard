import { toStartCase } from './toStartCase'

describe('toStartCase', () => {
  it('deals with camelCase', () => {
    const camelCaseValue = 'someRandomCamelCaseWords'
    expect(toStartCase(camelCaseValue)).toEqual('Some Random Camel Case Words')
  })
  it('deals with PascalCase', () => {
    const pascalCaseValue = 'someRandomPascalCaseWords'
    expect(toStartCase(pascalCaseValue)).toEqual('Some Random Pascal Case Words')
  })
})
