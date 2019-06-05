import inventory from './inventory'
import data from './data'
import item from './item'

var equipment = {}
equipment.main = function () {
  // add dmg
  if (inventory.weapon.itemId) {
    data.dmg = data.stats.BaseDmg + item[inventory.weapon.itemId].dmg
  } else {
    data.dmg = data.stats.BaseDmg
  }
  // add armor
  if (inventory.armor.itemId || inventory.helmet.itemId) {
    data.armor = data.baseArmor
    if (inventory.armor.itemId) {
      data.armor += item[inventory.armor.itemId].armor
    }
    if (inventory.helmet.itemId) {
      data.armor += item[inventory.helmet.itemId].armor
    }
  } else {
    data.armor = data.baseArmor
  }
  console.log(data.dmg, data.armor)
}
export default equipment