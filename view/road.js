class RoadView {

  constructor (speed, lightsPerLine, options) {
    this.options = options || {roadLines: true, lights: true, trees: true, houses: true}
    this.parallaxRatio = 2 / 3
    this.updateSpeed(speed)
    this.options.roadLines && this.initRoadLines()
    this.options.lights && this.initLights(lightsPerLine)
    this.options.trees && this.initTrees()
    this.options.houses && this.initHouses()
    this.draw()
  }

  initRoadLines() {
    this.roadLine = document.querySelectorAll('.road_lines')
    this.roadLineOffset = -1 * window.screen.height
    this.roadLine[0].style.height = `${window.screen.height}px`
    this.roadLine[1].style.height = `${window.screen.height}px`
  }

  initLights (lightsPerLine) {
    this.lightsPerLine = lightsPerLine || 1
    this.lightLine = document.querySelectorAll('.lights_section')
    this.lightLine[0].style.height = `${window.screen.height}px`
    this.lightLine[1].style.height = `${window.screen.height}px`
    this.createLights()
    this.lightOffset = -this.lightHeight
  }

  initTrees() {
    this.treeLineHeight = 0
    this.treeLine = document.querySelectorAll('.tree_line')
    this.treeLine[0].style.height = `${window.screen.height}px`
    this.treeLine[1].style.height = `${window.screen.height}px`
    this.createTreeLines()
    this.treeOffset = -this.treeLineHeight
  }

  initHouses() {
    this.houseLeftLineHeight = 0
    this.houseRightLineHeight = 0
    this.houseLine = document.querySelectorAll('.house_line')
    this.houseLine[0].style.height = `${window.screen.height}px`
    this.houseLine[1].style.height = `${window.screen.height}px`
    this.createHouseLines()
    this.houseLeftOffset = -this.houseLeftLineHeight
    this.houseRightOffset = -this.houseRightLineHeight
    this.updatePosition()
  }

  createLights() {
    this.lights = []

    for (let i = 0; i < this.lightsPerLine * 2; ++i) {
      const light = this.getLight()
      this.lights.push(light)
      this.lightLine[i % 2].appendChild(light)

      if (i === 0) {
        const rect = light.getBoundingClientRect()
        this.lightHeight = rect.height + rect.top
      }
    }
  }

  createTreeLines() {
    for (let i = 0; i < this.treeLine.length; ++i) {
      for (let j = 0; j < 6; ++j) {
        const treeLine = this.getTreeLine()
        this.treeLine[i].appendChild(treeLine)

        if (i === 0 && j === 0) {
          const rect = treeLine.getBoundingClientRect()
          const height = rect.height + rect.top
          this.treeLineHeight = (parseInt(height / this.step) + 1) * this.step
        }
      }
    }
  }

  createHouseLines() {
    for (let j = 0; j < 4; ++j) {
      const leftLine = this.getLeftHouseLine()
      const rightLine = this.getRightHouseLine()
      this.houseLine[0].appendChild(leftLine)
      this.houseLine[1].appendChild(rightLine)

      if (j === 0) {
        const lrect = leftLine.getBoundingClientRect()
        const rrect = rightLine.getBoundingClientRect()
        const leftLineHeight = lrect.height + lrect.top
        const rightLineHeight = rrect.height + rrect.top
        const step = this.step * this.parallaxRatio
        this.houseLeftLineHeight = (parseInt(leftLineHeight / step) + 1) * step
        this.houseRightLineHeight = (parseInt(rightLineHeight / step) + 1) * step
      }
    }
  }

  getLeftHouseLine() {
    const div = document.createElement('div')
    div.className = 'house_line_element'
    div.innerHTML = this.getHouse() + this.getPalmTree() + this.getSmallHouse()
    return div
  }

  getTreeLine() {
    const div = document.createElement('div')
    div.className = 'tree_line_element'
    div.innerHTML = this.getTree() + this.getTree()
    return div
  }

  getRightHouseLine() {
    const div = document.createElement('div')
    div.className = 'house_line_element'
    div.classList.add('type_2')
    div.innerHTML = this.getSmallHouse() + this.getSmallHouse() + this.getSmallHouse() + this.getSmallHouse() + this.getPalmTree() + this.getPalmTree() + this.getPalmTree()
    return div
  }

  getLight() {
    const div = document.createElement('div')
    div.classList.add('svg_pic')
    div.classList.add('light')
    return div
  }

  getHouse() {
    return '<div class="svg_pic decor house"><img src="./images/house.png"></div>'
  }

  getSmallHouse() {
    return '<div class="svg_pic decor small_house"><img src="./images/small_house.png"></div>'
  }

  getPalmTree() {
    return '<div class="svg_pic decor palm_tree"><img src="./images/palm_tree.png"></div>'
  }

  getTree() {
    return '<div class="svg_pic decor tree"><img src="./images/tree.png"></div>'
  }

  updatePosition() {
    this.options.roadLines && this.updateRoadLines()
    this.options.trees && this.updateTrees()
    this.options.houses && this.updateHouses()
    this.options.lights && this.updateLights()
  }

  updateRoadLines() {
    this.roadLineOffset += this.step
    this.roadLineOffset >= 0 && (this.roadLineOffset = -1 * window.screen.height)
    this.roadLine[0].style.top = `${this.roadLineOffset}px`
    this.roadLine[1].style.top = `${this.roadLineOffset + window.screen.height}px`
  }

  updateLights() {
    this.lightOffset += this.step / this.parallaxRatio
    this.lightOffset >= window.screen.height / this.lightsPerLine && (this.lightOffset = -this.lightHeight)
    const pixelsBetween2Lights = window.screen.height / this.lightsPerLine

    for (let i = 0; i < this.lightsPerLine; ++i) {
      const top = i * pixelsBetween2Lights + this.lightOffset
      this.lights[2 * i].style.top = top + 'px'
      this.lights[2 * i + 1].style.top = top + 'px'
    }
  }

  updateTrees() {
    this.treeOffset += this.step
    this.treeOffset >= 0 && (this.treeOffset = -this.treeLineHeight)

    for (let i = 0; i < this.treeLine.length; ++i) {
      this.treeLine[i].style.top = this.treeOffset + 'px'
    }
  }

  updateHouses() {
    this.houseLeftOffset += this.step * this.parallaxRatio
    this.houseLeftOffset >= 0 && (this.houseLeftOffset = -this.houseLeftLineHeight)
    this.houseRightOffset += this.step * this.parallaxRatio
    this.houseRightOffset >= 0 && (this.houseRightOffset = -this.houseRightLineHeight)
    this.houseLine[0].style.top = this.houseLeftOffset + 'px'
    this.houseLine[1].style.top = this.houseRightOffset + 'px'
  }

  updateSpeed (speed) {
    this.step = window.screen.height / speed
  }

  draw() {
    this.updatePosition()
    this.timeout = asafonov.timer.add(() => this.draw())
  }

  stop() {
    this.timeout && asafonov.timer.remove(this.timeout)
    this.timeout = null
  }

  destroy() {
    this.lightsPerLine = null
    this.speed = null
    this.treeOffset = null
    this.houseLeftOffset = null
    this.houseRightOffset = null
    this.stop()
  }
}
