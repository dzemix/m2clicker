import draw from './draw'
import mob from './mob'
import data from './data'
import npc from './npc'
var maps = {}
maps.map = function (ctx) {
  draw.image(ctx, '/static/back.jpg', 0, 0)
  if (data.npc.kowal) {
    npc.kowal(ctx)
  } else {
    mob.drawMob(ctx)
  }
}
export default maps
