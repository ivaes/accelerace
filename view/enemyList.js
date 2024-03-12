class EnemyListView {

  constructor (speed) {
    this.enemiesOnScreen = []
    this.speed = speed
    this.createEnemy()
    this.addEventListeners()
  }

  addEventListeners() {
    asafonov.messageBus.subscribe(asafonov.events.ENEMY_DESTROYED, this, 'onEnemyDestroyed')
  }

  removeEventListeners() {
    asafonov.messageBus.unsubscribe(asafonov.events.ENEMY_DESTROYED, this, 'onEnemyDestroyed')
  }

  createEnemy() {
    if (this.enemiesOnScreen.length === 2) return

    const id = this.enemiesOnScreen.length === 0 ? Math.round(Math.random()) + 1 : 3 - this.enemiesOnScreen[0]
    this.enemiesOnScreen.push(id)
    const view = new EnemyView(this.speed, id)
  }

  onEnemyDestroyed (data) {
    this.enemiesOnScreen.shift()
    this.createEnemy()
  }

  setSpeed (speed) {
    this.speed = speed
  }

  destroy() {
    this.removeEventListeners()
    this.enemiesOnScreen = null
    this.speed = null
  }

}
