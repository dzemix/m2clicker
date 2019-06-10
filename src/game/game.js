import panel from './panel'
import keyboard from './keyboard'
import maps from './maps'
import mob from './mob'
import data from './data'
import mobProto from './mobProto'
import equipment from './equipment'
var game = {}
game.main = function (ctx, mouse) {
  // draw
  setInterval(() => {
    maps.map(ctx)
    panel.draw(ctx)
    mouse.move(ctx)
    equipment.regeneration()
  }, 20)
  // mob hits
  setInterval(() => {
    if (data.atak) {
      mob.hits()
    }
  }, 1000 * mobProto[0].ataks)
  equipment.main()
  // key listener
  keyboard.keyListener()
}
export default game
