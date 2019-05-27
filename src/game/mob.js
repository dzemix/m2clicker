import draw from './draw'
import data from './data'
var mob = {}
mob.mob = {
  left: 525,
  top: 350,
  width: 150,
  height: 170,
  color: 'blue'
}
mob.mobUnderHp = {
  left: mob.mob.left,
  top: mob.mob.top - 20,
  width: mob.mob.width,
  height: 10,
  color: 'blue'
}
mob.mobHp = {
  left: mob.mob.left,
  top: mob.mob.top - 20,
  width: mob.mob.width,
  height: 10,
  color: 'red'
}
mob.drawMob = function (ctx) {
  // draw mob and mob underHp
  draw.image(ctx, '/static/dog.png', mob.mob.left, mob.mob.top)
  draw.square(ctx, mob.mobUnderHp)
  // draw mob hp
  mob.mobHp.width = mob.mob.width * data.mob.percent()
  draw.square(ctx, mob.mobHp)
}
export default mob
