require('dotenv').config()

import * as discord from 'discord.js'
import commandEcho from './commands/echo'
import commandRegister from './commands/register'
import commandStatus from './commands/status'
import commandBattle from './commands/battle'

const client = new discord.Client()

client.on('ready', () => {
  console.log('ready')
})

client.on('message', (message) => {
  if (message.channel.type !== 'text') return

  if (!message.content.startsWith('.z ')) return

  console.log(message.guild?.name, message.channel.name, message.member?.nickname ?? message.member?.displayName, message.content)

  let payload = message.content.slice(2).trim()

  const [command] = payload.split(' ')

  switch (command) {
    case 'echo':
      commandEcho(message, {
        payload: payload.slice(4).trim()
      })
      break

    case 'register':
      commandRegister(message)
      break

    case 'status':
      commandStatus(message)
      break

    case 'battle':
      commandBattle(message)
      break
  }
})

client.login(process.env.DISCORD_BOT_TOKEN)
