type TrimOptions = {
  startLength: number
  endLength: number
}

export const trimAddress = (address: string, options?: TrimOptions) => {
  const addrLength = address?.length
  if (!addrLength) return
  const addrStart = address?.substring(0, options?.startLength || 9)
  const addrEnd = address?.substring(addrLength - (options?.endLength || 4))
  return `${addrStart}...${addrEnd}`
}
