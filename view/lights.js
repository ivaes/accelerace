class LightsView {

  constructor (speed, lightsPerLine) {
    this.lightHeight = 100
    this.updateSpeed(speed)
    this.lightsPerLine = lightsPerLine || 1
    this.elements = document.querySelectorAll('.lights_section')
    this.offset = -this.lightHeight
    this.elements[0].style.height = `${window.screen.height}px`
    this.elements[1].style.height = `${window.screen.height}px`
    this.createLights()
    this.updatePosition()
    this.draw()
  }

  createLights() {
    this.lights = []

    for (let i = 0; i < this.lightsPerLine * 2; ++i) {
      const light = this.getLight()
      this.lights.push(light)
      this.elements[i % 2].appendChild(light)
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
    const pixelsBetween2Lights = window.screen.height / this.lightsPerLine

    for (let i = 0; i < this.lightsPerLine; ++i) {
      console.log(i)
      const top = i * pixelsBetween2Lights + this.offset
      this.lights[2 * i].style.top = top + 'px'
      this.lights[2 * i + 1].style.top = top + 'px'
    }
  }

  updateSpeed (speed) {
    this.step = window.screen.height / speed
  }

  draw() {
    this.offset += this.step
    this.offset >= window.screen.height && (this.offset = -this.lightHeight)
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
