window.asafonov = {}
window.asafonov.version = '0.1'
window.asafonov.messageBus = new MessageBus()
window.asafonov.events = {
  GAME_OVER: 'GAME_OVER',
  ENEMY_DESTROYED: 'ENEMY_DESTROYED'
}
window.asafonov.settings = {
}
window.onerror = (msg, url, line) => {
  alert(`${msg} on line ${line}`)
}
