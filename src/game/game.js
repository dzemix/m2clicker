import panel from './panel'
import keyboard from './keyboard'
import maps from './maps'
import mob from './mob'
import data from './data'
import mobProto from './mobProto'
import inventory from './inventory'
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
    if (data.atak) {
      mob.hits()
    }
  }, 1000 * mobProto[0].ataks)

  // key listener
  keyboard.keyListener()

  // inventory first step
  inventory[0][0] = 3
}
export default game
