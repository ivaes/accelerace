class CarView {

  constructor (speed) {
    this.speed = speed || 1
    this.element = document.querySelector('#main_car')
    const rect = this.element.querySelector('svg').getBoundingClientRect()
    this.roadRect = document.querySelector('.road_sides').getBoundingClientRect()
    this.carRect = {
      height: rect.height + rect.top,
      width: rect.width + rect.left,
      left: this.roadRect.left,
      top: window.innerHeight - rect.height - rect.top
    }
    asafonov.player = this.carRect
    this.display()
    this.onTouchProxy = this.onTouch.bind(this)
    this.addEventListeners()
  }

  addEventListeners() {
    document.body.addEventListener('click', this.onTouchProxy)
  }

  removeEventListeners() {
    document.body.removeEventListener('click', this.onTouchProxy)
  }

  onTouch(event) {
    this.stop()

    if (event.clientX > window.innerWidth / 2) {
      this.moveRight()
    } else {
      this.moveLeft()
    }
  }

  display() {
    this.element.style.left = `${this.carRect.left}px`
    this.element.style.top = `${this.carRect.top}px`
  }

  move(top, left) {
    let movedHorizontally = left !== undefined && left !== null && left !== 0
    let movedVertically = top !== undefined && top !== null && top !== 0

    if (movedHorizontally) {
      this.carRect.left = this.carRect.left + left

      if (this.carRect.left <= this.roadRect.left) {
        this.carRect.left = this.roadRect.left
        movedHorizontally = false
      }

      if (this.carRect.left >= this.roadRect.right - this.carRect.width) {
        this.carRect.left = this.roadRect.right - this.carRect.width
        movedHorizontally = false
      }
    }

    this.display()
    return movedHorizontally || movedVertically
  }

  moveLeft() {
    const moved = this.move(0, -this.speed)
    moved && (this.timeout = setTimeout(() => this.moveLeft(), 40))
  }

  moveRight() {
    const moved = this.move(0, this.speed)
    moved && (this.timeout = setTimeout(() => this.moveRight(), 40))
  }

  stop() {
    this.timeout && clearTimeout(this.timeout)
  }

  destroy() {
    this.removeEventListeners()
    this.stop()
    this.timeout = null
    this.element = null
    this.carSize = null
    this.roadSize = null
  }
}
