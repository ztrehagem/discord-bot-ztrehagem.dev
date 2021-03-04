import { Message } from 'discord.js'
import { User } from '../store/schemas/user'
import { store } from '../store/main'

export default (message: Message) => {
  const guild = message.guild
  const member = message.member

  if (!guild || !member) return

  const id = User.generateId(guild, member)

  if (store.users.has(id)) {
    message.channel.send(`<@${member.user.id}> You are already registered.`)
    return
  }

  store.users.set(id, new User(id))

  message.channel.send(`<@${member.user.id}> Registration succeeded!`)
}
