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
mob.drop = [
  {
    left: 700,
    top: 350,
    width: 34,
    height: 60
  },
  {
    left: 740,
    top: 350,
    width: 34,
    height: 60
  },
  {
    left: 780,
    top: 350,
    width: 34,
    height: 60
  },
  {
    left: 820,
    top: 350,
    width: 34,
    height: 60
  },
  {
    left: 860,
    top: 350,
    width: 34,
    height: 60
  }
]
mob.drawMob = function (ctx) {
  // draw mob and mob underHp
  if (data.mobResp) {
    let src = mobProto[data.lvl].src
    draw.image(ctx, src, mob.mob.left, mob.mob.top)
    draw.square(ctx, mob.mobUnderHp)
    // draw mob hp

    mob.mobHp.width = mob.mob.width * data.percent(data.mob.maxHp, data.mob.hp)
    draw.square(ctx, mob.mobHp)
  }
  // drop resp
  if (data.drop) {
    ctx.strokeStyle = 'white'
    for (let i in mob.drop) {
      if (data.dropItem[i]) {
        ctx.strokeRect(mob.drop[i].left, mob.drop[i].top, mob.drop[i].width, mob.drop[i].height)
        draw.item(ctx, {left: mob.drop[i].left, top: mob.drop[i].top, itemId: data.dropItem[i]})
      }
    }
  }
}
mob.hits = function () {
  if (!data.status.over) {
    if (data.stats.hp > 0) {
      let dmg = mobProto[data.lvl].dmg - data.armor
      if (dmg < 0) {
        dmg = 0
      }
      data.stats.hp -= dmg
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
    if (!data.status.over && data.mobResp) {
      if (data.mob.hp > 0) {
        data.atak = true
        data.mob.hp -= data.dmg
      }
    }
    if (data.mob.hp <= 0) {
      // data resp delay
      data.mobResp = false
      setTimeout(() => {
        data.mobResp = true
      }, 1000)
      // drop items
      mob.dropFunction(data.lvl)
      // exp module
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
mob.dropFunction = function (moblvl) {
  if (mobProto[moblvl].drops) {
    data.dropItem = []
    for (let i in mobProto[moblvl].drops) {
      let random = Math.random(0, 100)
      random = random * 100
      random = Math.floor(random)
      if (mobProto[moblvl].drops[i].chance > random) {
        data.drop = true
        data.dropItem[i] = mobProto[moblvl].drops[i].itemId
      }
    }
    console.log(data.dropItem)
  }
}
export default mob
