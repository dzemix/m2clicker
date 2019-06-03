import inventory from './inventory'
import data from './data'
import item from './item'

var equipment = {}
equipment.main = function () {
  if (inventory.weapon.itemId) {
    console.log(item[inventory.weapon.itemId].dmg)
    data.dmg = data.dmg + item[inventory.weapon.itemId].dmg
  }
}
export default equipment
