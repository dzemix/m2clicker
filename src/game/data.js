import mobProto from './mobProto'
var data = {}
data.lvl = 0
data.maxlvl = 1
data.moveItem = null
data.beforeSlot = null
data.beforeInventory = null
data.atak = false
data.status = {
  over: false,
  overText: ''
}
data.stats = {}
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
