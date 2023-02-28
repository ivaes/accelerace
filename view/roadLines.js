class RoadLinesView {

  constructor (speed) {
    this.speed = speed
    this.element = document.querySelector('.road_lines')
    this.draw()
  }

  updateSpeed (speed) {
    speed !== null && speed !== undefined && (this.speed = speed)
    this.timeout && clearTimeout(this.timeout)
    this.draw()
  }

  draw() {
    const currentOffset = parseInt(this.element.style.marginTop, 10)
    const neededOffset = currentOffset > 0 ? 0 : 20
    this.element.style.marginTop = `${neededOffset}px`
    this.timeout = setTimeout(() => this.draw, this.speed)
  }

  destroy() {
    this.speed = null
    this.element = null
    this.timeout && clearTimeout(this.timeout)
  }
}
