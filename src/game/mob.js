import draw from './draw'
import data from './data'
import mobProto from './mobProto'
import lvl from './lvl'
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
mob.atak = function (mouse) {
  if (mouse.isOn(mob.mob)) {
    if (!data.status.over) {
      if (data.mob.hp > 0) {
        data.atak = true
        data.mob.hp -= data.dmg
      }
    }
    if (data.mob.hp <= 0) {
      if (data.stats.exp < lvl[data.stats.lvl].exp) {
        data.stats.exp += mobProto[data.lvl].exp
        data.mob.hp = data.mob.maxHp
        data.atak = false
        if (data.stats.exp >= lvl[data.stats.lvl].exp) {
          if (data.stats.lvl < data.stats.maxlvl) {
            data.stats.lvl++
            data.stats.exp = 0
            data.status.lvlup = true
            data.status.overText = 'lvl up'
          }
        }
      } else {
        data.mob.hp = data.mob.maxHp
        data.atak = false
        data.status.overText = 'lvl up'
        if (data.stats.lvl < data.stats.maxlvl) {
          data.stats.lvl++
          data.stats.exp = 0
          data.status.lvlup = true
        }
      }
    }
  }
}
export default mob
