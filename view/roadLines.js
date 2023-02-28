class RoadLinesView {

  constructor (speed) {
    this.updateSpeed(speed)
    this.elements = document.querySelectorAll('.road_lines')
    this.offset = -1 * window.screen.height
    this.elements[0].style.height = `${window.screen.height}px`
    this.elements[1].style.height = `${window.screen.height}px`
    this.updatePosition()
    this.draw()
  }

  updatePosition() {
    this.elements[0].style.top = `${this.offset}px`
    this.elements[1].style.top = `${this.offset + window.screen.height}px`
  }

  updateSpeed (speed) {
    this.step = window.screen.height / speed
  }

  draw() {
    this.offset += this.step
    this.offset >= 0 && (this.offset = -1 * window.screen.height)
    this.updatePosition()
    this.timeout = setTimeout(() => this.draw(), 1000)
  }

  destroy() {
    this.speed = null
    this.elements = null
    this.offset = null
    this.timeout && clearTimeout(this.timeout)
  }
}
