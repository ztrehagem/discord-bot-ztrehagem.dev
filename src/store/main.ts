import { User } from './schemas/user'

class Store {
  users = new Map<string, User>()
}

export const store = new Store()
