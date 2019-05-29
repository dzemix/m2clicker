import panel from './panel'
import keyboard from './keyboard'
import maps from './maps'
import mob from './mob'
import data from './data'
import mobProto from './mobProto'
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
}
export default game
