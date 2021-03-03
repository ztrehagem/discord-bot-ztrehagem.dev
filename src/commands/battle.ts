import { Message } from 'discord.js'
import { User } from '../store/schemas/user'
import { store } from '../store/main'

export default (message: Message) => {
  const guild = message.guild
  const member = message.member

  if (!guild || !member) return

  const memberName = member.nickname ?? member.displayName

  const id = User.generateId(guild, member)

  const user = store.users.get(id)

  if (!user) {
    message.channel.send(`${memberName}, you are not registered.`)
    return
  }

  const prevLevel = user.getLevel()
  const isLevelUpped = user.earnExp()

  if (isLevelUpped) {
    message.channel.send(`${memberName}, level UP!\nLv. ${prevLevel} -> ${user.getLevel()}\nExp.${user.getExpPercentage()}%`)
  } else {
    message.channel.send(`${memberName}, earned Exp.\nLv. ${user.getLevel()}\nExp. ${user.getExpPercentage()}%`)
  }
}
