require('dotenv').config()

import * as discord from 'discord.js'
import commandEcho from './commands/echo'
import commandRegister from './commands/register'
import commandStatus from './commands/status'
import commandBattle from './commands/battle'

const entryPoint = process.env.COMMAND || '.z'

const client = new discord.Client()

client.on('ready', () => {
  console.log('ready')
})

client.on('message', (message) => {
  if (message.channel.type !== 'text') return

  if (!message.content.startsWith(`${entryPoint} `)) return

  console.log(message.guild?.name, message.channel.name, message.member?.nickname ?? message.member?.displayName, message.content)

  let payload = message.content.slice(entryPoint.length + 1).trim()

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

client.login(process.env.DISCORD_BOT_TOKEN).then((value) => {
  console.log('logged in')
}).catch((reason) => {
  console.log('failed to login')
  console.error(reason)
})
