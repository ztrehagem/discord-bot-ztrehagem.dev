import { Message } from "discord.js";

export default (message: Message, options: { payload: string }) => {
  message.channel.send(options.payload)
}
