class GameView {

  constructor() {
    this.speed = window.innerHeight / 80
    this.score = 0
    this.roadView = new RoadView(32, 2)
    this.carView = new CarView(16)
    this.enemyListView = new EnemyListView(this.speed)
    this.addEventListeners()
  }

  addEventListeners() {
    asafonov.messageBus.subscribe(asafonov.events.ENEMY_DESTROYED, this, 'onEnemyDestroyed')
    asafonov.messageBus.subscribe(asafonov.events.GAME_OVER, this, 'onGameOver')
  }

  removeEventListeners() {
    asafonov.messageBus.unsubscribe(asafonov.events.ENEMY_DESTROYED, this, 'onEnemyDestroyed')
    asafonov.messageBus.unsubscribe(asafonov.events.GAME_OVER, this, 'onGameOver')
  }

  onEnemyDestroyed() {
    this.score++

    if (this.score % 5 === 0) {
      this.speed *= 1.1
      this.enemyListView.setSpeed(this.speed)
    }

    if (this.score === 10) this.enemyListView.setDoubleEnemy(true)
  }

  onGameOver() {
    this.roadView.stop()
    this.carView.stop()
    this.destroy()
    alert('Game Over')
  }

  destroy() {
    this.removeEventListeners()
    this.enemyListView.destroy()
    this.enemyListView = null
    this.roadView.destroy()
    this.roadView = null
    this.carView.destroy()
    this.carView = null
    this.speed = null
  }

}
