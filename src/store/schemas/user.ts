import { Guild, GuildMember } from "discord.js"

export class User {
  readonly id: string
  protected exp = 0
  protected level = 1

  constructor(id: string) {
    this.id = id
  }

  static generateId(guild: Guild, member: GuildMember) {
    return `${guild.id}/${member.id}`
  }

  getExpRate() {
    return this.exp / this.level
  }

  getExpPercentage() {
    return Math.floor(this.getExpRate() * 100).toPrecision(3)
  }

  getLevel() {
    return this.level
  }

  earnExp() {
    this.exp += 1

    const overflow = this.exp - this.level

    if (overflow >= 0) {
      this.level += 1
      this.exp = overflow

      return true
    }

    return false
  }
}
