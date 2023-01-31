document.addEventListener("DOMContentLoaded", function (event) {
  window.asafonov.deck = new Deck()
  const board = new GameBoardView()
  const c = new DurakController(window.asafonov.deck)
  const updaterView = new UpdaterView('https://raw.githubusercontent.com/asafonov/accelerace/master/VERSION.txt', 'https://github.com/asafonov/accelerace.apk/releases/download/{VERSION}/app-release.apk')
  updaterView.showUpdateDialogIfNeeded()
})
