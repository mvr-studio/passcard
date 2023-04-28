import { Injectable } from '@nestjs/common'
import { UsersService } from 'src/users/users.service'
import { JwtService } from '@nestjs/jwt'
import { parseSignature, fromSanitizedMessage } from '@passcard/auth'
import { jwtConstants } from './constants'

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async signIn(message: string, signature: string): Promise<any> {
    const passcardSignature = parseSignature(signature)
    const passcardMessage = fromSanitizedMessage(message)
    const isValid = await passcardMessage.verify({
      signature: passcardSignature
    })
    if (!isValid) throw new Error('Invalid signature')
    const address = passcardMessage.getAddress()
    const user = await this.usersService.upsert(address)
    const token = await this.jwtService.signAsync(
      {
        address: user.address
      },
      { secret: jwtConstants.secret }
    )
    return {
      user,
      token
    }
  }
}
