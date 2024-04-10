document.addEventListener("DOMContentLoaded", function (event) {
  const updaterView = new UpdaterView('https://raw.githubusercontent.com/asafonov/accelerace/master/VERSION.txt', 'https://github.com/asafonov/accelerace.apk/releases/download/{VERSION}/app-release.apk')
  updaterView.showUpdateDialogIfNeeded()
  asafonov.timer.setInterval(80)
  const gameView = new GameView(5500)
})
