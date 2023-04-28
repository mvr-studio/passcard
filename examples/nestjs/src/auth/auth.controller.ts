import { Body, Controller, Post, HttpCode, HttpStatus, UseGuards, Get, Request } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthGuard } from './auth.guard'
import { User, UsersService } from 'src/users/users.service'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private usersService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.message, signInDto.signature)
  }

  @UseGuards(AuthGuard)
  @Get('me')
  async getMe(@Request() req) {
    return this.usersService.findOne(req.user.address)
  }
}
