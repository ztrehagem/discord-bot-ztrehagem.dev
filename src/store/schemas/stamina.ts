interface Options {
  limit: number
}

export class Stamina {
  #consumed = 0
  #limit: number
  #time = Date.now()

  // 1 minute
  static readonly healingInterval = 1000 * 60

  constructor(options: Options) {
    this.#limit = options.limit
  }

  get limit() {
    return this.#limit
  }

  getCurrent() {
    const timeDiff = Date.now() - this.#time
    const healed = Math.floor(timeDiff / Stamina.healingInterval)
    return Math.min(this.#limit - this.#consumed + healed)
  }

  consume(value: number): boolean {
    const current = this.getCurrent()

    if (current < value) {
      return false
    }

    if (current === this.limit) {
      this.#time = Date.now()
      this.#consumed = 0
    }

    this.#consumed += value

    return true
  }
}
