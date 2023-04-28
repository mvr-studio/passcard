import Dexie, { Table } from 'dexie'

export interface Post {
  id?: string
  address: string
  content: string
  createdAt: Date
}

export class MySubClassedDexie extends Dexie {
  posts!: Table<Post>

  constructor() {
    super('cardfeed')
    this.version(1).stores({
      posts: '++id, address, content, createdAt'
    })
  }
}

export const db = new MySubClassedDexie()
