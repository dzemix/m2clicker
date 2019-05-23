var data = {}
data.status = {
  over: false,
  overText: 'a'
}
data.stats = {
  hp: 100
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
