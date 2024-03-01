class LightsView {

  constructor (speed, ligthsPerLine = 1) {
    this.updateSpeed(speed)
    this.elements = document.querySelectorAll('.lights_section')
    this.offset = -1 * window.screen.height
    this.elements[0].style.height = `${window.screen.height}px`
    this.elements[1].style.height = `${window.screen.height}px`
    this.createLights(lightsPerLine)
    this.updatePosition()
    //this.draw()

    for (let i = 0; i < 6; ++i) {
      this.elements[0].appendChild(this.getLight())
      this.elements[1].appendChild(this.getLight())
    }

    alert(this.elements[1].innerHTML)
  }

  createLights (lightsPerLine) {
    this.lights = []

    for (let i = 0; i < lightsPerLine * 2; ++i) {
      this.ligths.push(this.getLight())
    }
  }

  getLight() {
    const div = document.createElement('div')
    div.classList.add('svg_pic')
    div.classList.add('light')
    div.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15"><path d="M7.5,0A7.5,7.5,0,1,1,0,7.5,7.5,7.5,0,0,1,7.5,0Z"/></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15"><path d="M7.5,0A7.5,7.5,0,1,1,0,7.5,7.5,7.5,0,0,1,7.5,0Z"/></svg>'
    return div
  }

  updatePosition() {
    this.elements[0].style.top = `${this.offset}px`
    this.elements[1].style.top = `${this.offset}px`
  }

  updateSpeed (speed) {
    this.step = window.screen.height / speed
  }

  draw() {
    this.offset += this.step
    this.offset >= 0 && (this.offset = -1 * window.screen.height)
    this.updatePosition()
    this.timeout = setTimeout(() => this.draw(), 40)
  }

  destroy() {
    this.lights = null
    this.speed = null
    this.elements = null
    this.offset = null
    this.timeout && clearTimeout(this.timeout)
    this.timeout = null
  }
}
