class GameView {

  constructor() {
    this.speed = window.innerHeight / asafonov.timer.getFPS() / 3 // 3 secs for screen ride
    this.score = 0
    this.roadView = new RoadView(asafonov.timer.getFPS(), 2, {roadLines: true, lights: true, trees: true})
    this.carView = new CarView(asafonov.timer.getFPS() / 2)
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

    if (confirm('Game over. Start again?')) {
      location.reload()
    }
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
