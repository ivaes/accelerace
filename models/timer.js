class Timer {

  constructor (interval) {
    this.setInterval(interval)
    this.inc = 0
    this.ticks = []
  }

  getInterval() {
    return this.interval
  }

  getFPS() {
    return 1000 / this.interval
  }

  setInterval (interval) {
    this.interval = interval
  }

  add (tick) {
    this.inc++
    this.ticks.push({id: this.inc, tick: tick})

    if (! this.timeout) {
      this.timeout = setTimeout(() => this.tick(), this.interval)
    }
  }

  remove (id) {
    this.ticks = this.ticks.filter(i => i.id !== id)
  }

  tick() {
    if (this.ticks.length === 0) return

    const length = this.ticks.length

    for (let i = 0; i < length; ++i) {
      const tick = this.ticks.shift().tick
      tick()
    }

    this.timeout = setTimeout(() => this.tick(), this.interval)
  }

  destroy() {
    this.timeout && clearTimeout(this.timeout)
    this.timeout = null
    this.inc = null
  }

}
