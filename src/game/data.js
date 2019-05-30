import mobProto from './mobProto'
import lvl from './lvl'
var data = {}
data.lvl = 0
data.maxlvl = mobProto.length - 1
data.moveItem = null
data.beforeSlot = null
data.beforeInventory = null
data.atak = false
data.drop = false
data.dropItem = null
data.status = {
  over: false,
  overText: '',
  lvlup: false
}
data.stats = {}
data.stats.lvl = 0
data.stats.maxlvl = lvl.length - 1
data.stats.maxHp = 100
data.stats.hp = data.stats.maxHp
data.stats.exp = 0
data.stats.BaseDmg = 10
data.dmg = data.stats.BaseDmg + 5
data.mob = {}
data.mob.maxHp = mobProto[data.lvl].hp
data.mob.hp = data.mob.maxHp

data.percent = function (max, current) {
  let percent = current / max
  if (percent < 0) {
    percent = 0
  }
  percent = percent.toFixed(2)
  return percent
}
export default data
