import { Message } from 'discord.js'
import { User } from '../store/schemas/user'
import { store } from '../store/main'
import commandRegister from './register'

export default (message: Message) => {
  const guild = message.guild
  const member = message.member

  if (!guild || !member) return

  const id = User.generateId(guild, member)

  if (!store.users.has(id)) {
    commandRegister(message)
  }

  const user = store.users.get(id)

  if (!user) return

  const prevLevel = user.level
  const { levelUp, earnedExp } = user.earnExp()

  if (levelUp) {
    message.channel.send(`<@${member.user.id}> You earned Exp. ${earnedExp}\nLv. ${prevLevel} -> ${user.level} Level UP!\nExp. ${user.expPercentage}%`)
  } else {
    message.channel.send(`<@${member.user.id}> You earned Exp. ${earnedExp}\nLv. ${user.level}\nExp. ${user.expPercentage}%`)
  }
}
