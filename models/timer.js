class Timer {

  constructor (interval) {
    this.setInterval(interval)
    this.inc = 0
    this.ticks = []
    this.isPause = false
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

  pause() {
    this.timeout && clearTimeout(this.timeout)
    this.isPause = true
  }

  play() {
    this.isPause = false
    this.timeout = setTimeout(() => this.tick(), this.interval)
  }

  add (tick) {
    if (this.isPause) return
    this.inc++
    this.ticks.push({id: this.inc, tick: tick})

    if (! this.timeout) {
      this.timeout = setTimeout(() => this.tick(), this.interval)
    }

    return this.inc
  }

  remove (id) {
    this.ticks = this.ticks.filter(i => i.id !== id)
  }

  tick() {
    if (this.ticks.length === 0) return

    const length = this.ticks.length

    for (let i = 0; i < length; ++i) {
      if (this.ticks.length > 0) {
        const tick = this.ticks.shift().tick
        tick()
      }
    }

    this.timeout = setTimeout(() => this.tick(), this.interval)
  }

  destroy() {
    this.timeout && clearTimeout(this.timeout)
    this.timeout = null
    this.inc = null
  }

}
