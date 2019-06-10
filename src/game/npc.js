import draw from './draw'
import mob from './mob'
var npc = {}
npc.kowal = function (ctx) {
  let src = './static/kowal.png'
  draw.image(ctx, src, mob.mob.left, mob.mob.top)
}
export default npc
