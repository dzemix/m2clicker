import draw from './draw'
import mob from './mob'
var maps = {}
maps.map = function (ctx) {
  draw.image(ctx, '/static/back.jpg', 0, 0)
  mob.drawMob(ctx)
}
export default maps
