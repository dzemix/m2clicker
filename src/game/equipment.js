import inventory from './inventory'
import data from './data'
import item from './item'

var equipment = {}
equipment.main = function () {
  if (inventory.weapon.itemId) {
    data.dmg = data.stats.BaseDmg + item[inventory.weapon.itemId].dmg
  } else {
    data.dmg = data.stats.BaseDmg
  }
  if (inventory.armor.itemId) {
    data.armor = data.baseArmor + item[inventory.armor.itemId].armor
  } else {
    data.armor = data.baseArmor
  }
  console.log(data.dmg, data.armor)
}
export default equipment
