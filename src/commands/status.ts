import { Message } from 'discord.js'
import { User } from '../store/schemas/user'
import { store } from '../store/main'

export default (message: Message) => {
  const guild = message.guild
  const member = message.member

  if (!guild || !member) return

  const id = User.generateId(guild, member)

  const user = store.users.get(id)

  if (!user) {
    message.channel.send(`<@${member.user.id}> are not registered.`)
    return
  }

  message.channel.send(`<@${member.user.id}>\n${user.toString()}`)
}
