import { Guild, GuildMember } from "discord.js"
import { Stamina } from "./stamina"

export class User {
  readonly id: string
  #exp = 0
  #level = 1
  readonly stamina = new Stamina({ limit: 10 })

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

  toString(): string {
    const buf = []
    buf.push(`Lv. ${this.level}`)
    buf.push(`Exp. ${this.#exp} / ${this.requiredExp} (${this.expPercentage}%)`)
    buf.push(`Stamina ${this.stamina.getCurrent()} / ${this.stamina.limit}`)
    return buf.join('\n')
  }
}
