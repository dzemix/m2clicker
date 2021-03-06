import mobProto from './mobProto'
import lvl from './lvl'
var data = {}
data.lvl = 0
data.mobResp = true
data.maxlvl = mobProto.length - 1
data.moveItem = null
data.beforeSlot = null
data.beforeInventory = null
data.beforeEquip = null
data.atak = false
data.dropItem = []
data.status = {
  over: false,
  overText: '',
  lvlup: false
}
data.types = ['weapon', 'armor', 'helmet', 'shield', 'shoes', 'earrings', 'bracelets', 'necklaces']
data.stats = {}
data.stats.lvl = 0
data.stats.maxlvl = lvl.length - 1
data.stats.baseHp = 100
data.stats.maxHp = data.stats.baseHp
data.stats.hp = data.stats.maxHp
data.stats.regHp = 0
data.stats.exp = 0
data.stats.BaseDmg = 10
data.dmg = data.stats.BaseDmg
data.baseArmor = 0
data.armor = data.baseArmor
data.mob = {}
data.mob.maxHp = mobProto[data.lvl].hp
data.mob.hp = data.mob.maxHp
// champion stats
data.champion = {}
data.champion.points = 0
data.champion.health = 0
data.champion.strength = 0
// npc
data.npc = {}
data.npc.kowal = false
data.percent = function (max, current) {
  let percent = current / max
  if (percent < 0) {
    percent = 0
  }
  percent = percent.toFixed(2)
  return percent
}
export default data
