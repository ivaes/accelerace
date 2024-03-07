class CarView {

  constructor (speed) {
    this.element = document.querySelector('#main_car')
    const rect = this.element.querySelector('svg').getBoundingClientRect()
    this.carSize = {
      height: rect.height + rect.top,
      width: rect.width + rect.left
    }
    this.roadSize = document.querySelector('.road_sides').getBoundingClientRect()
    this.element.style.left = `${this.roadSize.left}px`
    this.element.style.top = `${window.innerHeight - this.carSize.height}px`
  }

  destroy() {
    this.element = null
    this.carSize = null
    this.roadSize = null
  }
}
