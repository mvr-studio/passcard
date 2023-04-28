import jwt, { JwtPayload } from 'jsonwebtoken'

export const context = async ({ req }) => {
  const authHeader = req.headers.authorization
  if (!authHeader) return {}
  const [tokenType, token] = authHeader.split(' ')
  if (tokenType !== 'Bearer') throw new Error('Invalid token type.')
  if (!token) throw new Error('No token provided.')
  const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as JwtPayload
  return {
    address: decoded.address
  }
}
