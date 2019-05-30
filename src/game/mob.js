import draw from './draw'
import data from './data'
import mobProto from './mobProto'
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
  let src = mobProto[data.lvl].src
  draw.image(ctx, src, mob.mob.left, mob.mob.top)
  draw.square(ctx, mob.mobUnderHp)
  // draw mob hp

  mob.mobHp.width = mob.mob.width * data.percent(data.mob.maxHp, data.mob.hp)
  draw.square(ctx, mob.mobHp)
}
mob.hits = function () {
  if (!data.status.over) {
    if (data.stats.hp > 0) {
      data.stats.hp -= mobProto[data.lvl].dmg
    }
  }
  if (data.stats.hp <= 0) {
    data.status.over = true
    data.atak = false
    data.status.overText = 'You Lose'
  }
}

export default mob
