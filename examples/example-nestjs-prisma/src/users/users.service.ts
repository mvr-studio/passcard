import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'

export type User = any

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(address: string): Promise<User | undefined> {
    return this.prisma.user.findUniqueOrThrow({ where: { address } })
  }

  async upsert(address: string): Promise<User | undefined> {
    return this.prisma.user.upsert({ where: { address }, update: { address }, create: { address } })
  }
}
