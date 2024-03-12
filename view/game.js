class GameView {

  constructor() {
    this.speed = 8
    this.roadView = new RoadView(this.speed * 4, 2)
    this.carView = new CarView(this.speed * 2)
    this.enemyListView = new EnemyListView(this.speed)
    this.enemyListView.setDoubleEnemy(true)
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
    this.enemyListView.setSpeed(++this.speed)
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
