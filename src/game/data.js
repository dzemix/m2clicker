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
data.stats = {
  hp: 90,
  exp: 0,
  BaseDmg: 10
}
data.dmg = data.stats.BaseDmg + 5
data.mob = {}
data.mob.maxHp = mobProto[data.lvl].hp
data.mob.hp = data.mob.maxHp
data.mob.percent = function () {
  var percent = data.mob.hp / data.mob.maxHp
  var final = percent.toFixed(2)
  return final
}
export default data
