class CarView {

  constructor (speed) {
    this.isMoving = false
    this.element = document.querySelector('#main_car')
    const rect = this.element.querySelector('svg path').getBoundingClientRect()
    this.roadRect = document.querySelector('.road_sides').getBoundingClientRect()
    this.carRect = {
      height: rect.height + rect.top,
      width: rect.width + rect.left,
      left: this.roadRect.left + this.roadRect.width / 2 - rect.width / 2,
      top: window.innerHeight - rect.height * 1.5 - rect.top
    }
    this.speed = this.roadRect.width / (speed || asafonov.timer.getFPS())
    asafonov.player = this.carRect
    this.display()
    this.addEventListeners()
  }

  addEventListeners() {
    asafonov.messageBus.subscribe(asafonov.events.CAR_MOVE_RIGHT, this, 'onMoveRight')
    asafonov.messageBus.subscribe(asafonov.events.CAR_MOVE_LEFT, this, 'onMoveLeft')
  }

  removeEventListeners() {
    asafonov.messageBus.unsubscribe(asafonov.events.CAR_MOVE_RIGHT, this, 'onMoveRight')
    asafonov.messageBus.unsubscribe(asafonov.events.CAR_MOVE_LEFT, this, 'onMoveLeft')
  }

  display() {
    this.element.style.left = `${this.carRect.left}px`
    this.element.style.top = `${this.carRect.top}px`
  }

  onMoveRight() {
    if (! this.isMoving) this.moveRight()
  }

  onMoveLeft() {
    if (! this.isMoving) this.moveLeft()
  }

  move(top, left) {
    this.isMoving = true
    let movedHorizontally = left !== undefined && left !== null && left !== 0
    let movedVertically = top !== undefined && top !== null && top !== 0

    if (movedHorizontally) {
      const before = this.carRect.left
      this.carRect.left = this.carRect.left + left
      const middle = this.roadRect.left + this.roadRect.width / 2 - this.carRect.width / 2

      if ((before < middle && this.carRect.left >= middle) || (before > middle && this.carRect.left <=middle)) {
        this.carRect.left = middle
        movedHorizontally = false
      }

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
    this.isMoving = movedHorizontally || movedVertically
  }

  moveLeft() {
    this.move(0, -this.speed)
    this.isMoving && (this.timeout = asafonov.timer.add(() => this.moveLeft()))
  }

  moveRight() {
    this.move(0, this.speed)
    this.isMoving && (this.timeout = asafonov.timer.add(() => this.moveRight()))
  }

  stop() {
    this.timeout && asafonov.timer.remove(this.timeout)
    this.timeout = null
  }

  destroy() {
    this.removeEventListeners()
    this.stop()
    this.timeout = null
    this.element = null
    this.carSize = null
    this.roadSize = null
    this.isMoving = null
  }
}
