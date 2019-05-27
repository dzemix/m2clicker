var data = {}
data.moveItem = null
data.beforeSlot = null
data.status = {
  over: false,
  overText: ''
}
data.stats = {
  hp: 60,
  exp: 0
}
data.mob = {}
data.mob.maxHp = 150
data.mob.hp = data.mob.maxHp
data.mob.percent = function () {
  var percent = data.mob.hp / data.mob.maxHp
  var final = percent.toFixed(2)
  return final
}
export default data
