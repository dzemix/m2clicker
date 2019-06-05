import inventory from './inventory'
import data from './data'
import item from './item'

var equipment = {}
equipment.main = function () {
  // base value
  data.dmg = data.stats.BaseDmg
  data.armor = data.baseArmor
  // add dmg
  let equipment = ['weapon', 'armor', 'helmet', 'shield', 'shoes']
  for (let i in equipment) {
    if (inventory[equipment[i]].itemId) {
      for (let e in item[inventory[equipment[i]].itemId].bon) {
        let value = item[inventory[equipment[i]].itemId].bon
        if (value[e].type === 'dmg') {
          data.dmg += value[e].value
        }
        if (value[e].type === 'armor') {
          data.armor += value[e].value
        }
      }
    }
  }
  console.log(data.dmg, data.armor)
}
export default equipment
