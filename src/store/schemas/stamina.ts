interface Options {
  limit: number
}

export class Stamina {
  #value: number
  #limit: number
  #consumedAt = Date.now()

  // 1 minute
  static readonly interval = 1000 * 60

  constructor(options: Options) {
    this.#limit = options.limit
    this.#value = options.limit
  }

  get limit() {
    return this.#limit
  }

  getCurrent() {
    const elapsed = Date.now() - this.#consumedAt
    const healed = Math.floor(elapsed / Stamina.interval)
    return Math.min(this.#limit, this.#value + healed)
  }

  consume(value: number): boolean {
    const now = Date.now()
    const elapsed = now - this.#consumedAt
    const healed = Math.floor(elapsed / Stamina.interval)
    const current = Math.min(this.#limit, this.#value + healed)

    if (current < value) {
      return false
    }

    if (current === this.#limit) {
      this.#consumedAt = now
    } else {
      this.#consumedAt += healed * Stamina.interval
    }

    this.#value = current - value

    return true
  }
}
