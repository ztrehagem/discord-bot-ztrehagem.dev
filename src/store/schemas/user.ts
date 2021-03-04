import { Guild, GuildMember } from "discord.js"

export class User {
  readonly id: string
  #exp = 0
  #level = 1

  constructor(id: string) {
    this.id = id
  }

  static generateId(guild: Guild, member: GuildMember) {
    return `${guild.id}/${member.id}`
  }

  get requiredExp() {
    return this.#level * 5
  }

  get expRate() {
    return this.#exp / this.requiredExp
  }

  get expPercentage() {
    return Math.floor(this.expRate * 100).toFixed(1)
  }

  get level() {
    return this.#level
  }

  earnExp() {
    const earnedExp = Math.ceil(Math.random() * 3)
    let levelUp = false

    this.#exp += earnedExp
    const overflow = this.#exp - this.requiredExp

    if (overflow >= 0) {
      this.#level += 1
      this.#exp = overflow
      levelUp = true
    }

    return {
      levelUp,
      earnedExp,
    }
  }
}
