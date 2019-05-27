import panel from './panel'
import data from './data'
import keyboard from './keyboard'
import maps from './maps'
import mob from './mob'
var game = {}
game.main = function (ctx, mouse) {
  // draw
  setInterval(() => {
    maps.map(ctx)
    mob.drawMob(ctx)
    panel.draw(ctx)
    mouse.move(ctx)
  }, 20)
  // mob hits
  setInterval(() => {
    if (!data.status.over) {
      if (data.stats.hp > 0) {
        data.stats.hp -= 1
      }
    }
    if (data.stats.hp <= 0) {
      data.status.over = true
      data.status.overText = 'You Lose'
    }
  }, 100)
  // key listener
  keyboard.keyListener()
}
export default game
