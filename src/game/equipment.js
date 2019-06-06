import inventory from './inventory'
import data from './data'
import item from './item'

var equipment = {}
equipment.main = function () {
  // base value
  data.dmg = data.stats.BaseDmg
  data.armor = data.baseArmor
  data.stats.maxHp = data.stats.baseHp
  // add statistics
  data.stats.maxHp += 10 * data.champion.health
  data.dmg += 2 * data.champion.strength
  // add bonuses
  for (let i in data.types) {
    if (inventory[data.types[i]].itemId) {
      for (let e in item[inventory[data.types[i]].itemId].bon) {
        let value = item[inventory[data.types[i]].itemId].bon
        if (value[e].type === 'dmg') {
          data.dmg += value[e].value
        }
        if (value[e].type === 'armor') {
          data.armor += value[e].value
        }
        if (value[e].type === 'hp') {
          data.stats.maxHp += value[e].value
        }
      }
    }
  }
  console.log(data.dmg, data.armor, data.stats.maxHp)
}
export default equipment
