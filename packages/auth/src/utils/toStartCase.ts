export const toStartCase = (value: string) => value.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())
