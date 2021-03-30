import { Message } from 'discord.js'
import { User } from '../store/schemas/user'
import { store } from '../store/main'
import commandRegister from './register'

const REQUIRED_STAMINA = 3

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
  if (!user.stamina.consume(REQUIRED_STAMINA)) {
    message.channel.send(`<@${member.user.id}> has no enough stamina.`)
    return
  }

  const prevLevel = user.level
  const { levelUp, earnedExp } = user.earnExp()

  const buf = []

  buf.push(`<@${member.user.id}> earned Exp. ${earnedExp}`)

  if (levelUp) {
    buf.push(`Level UP! Lv. ${prevLevel} -> ${user.level}`)
  }

  buf.push('')
  buf.push(user.toString())

  message.channel.send(buf.join('\n'))
}
