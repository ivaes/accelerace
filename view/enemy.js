class EnemyView {

  constructor (speed, id) {
    this.speed = speed || 1
    this.id = id
    this.element = document.querySelector(`#car_${id}`)
    this.element.style.display = 'block'
    const rect = this.element.querySelector('svg').getBoundingClientRect()
    this.roadRect = document.querySelector('.road_sides').getBoundingClientRect()
    const left = this.roadRect.left + Math.random() * (this.roadRect.right - rect.width - this.roadRect.left)
    this.carRect = {
      height: rect.height,
      width: rect.width,
      left: left,
      top: -rect.height
    }
    this.moveVertical()
  }

  display() {
    this.element.style.left = `${this.carRect.left}px`
    this.element.style.top = `${this.carRect.top}px`
  }

  move(top, left) {
    let movedHorizontally = left !== undefined && left !== null && left !== 0
    let movedVertically = top !== undefined && top !== null && top !== 0

    if (movedVertically) {
      this.carRect.top = this.carRect.top + top

      if (this.carRect.top >= window.innerHeight) {
        movedVertically = false
      }
    }

    this.display()
    return movedHorizontally || movedVertically
  }

  moveVertical() {
    const moved = this.move(this.speed, 0)
    if (moved) {
      this.timeout = setTimeout(() => this.moveVertical(), 40)
    } else {
      asafonov.messageBus.send(asafonov.events.ENEMY_DESTROYED, {id: this.id})
      this.destroy()
    }
  }

  stop() {
    this.timeout && clearTimeout(this.timeout)
  }

  destroy() {
    this.stop()
    this.timeout = null
    this.element = null
    this.carSize = null
    this.roadSize = null
  }
}
