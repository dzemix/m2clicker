import draw from './draw'
import slots from './panel/slots'
import item from './item'
import mob from './mob'
import assets from './panel/assets'
import data from './data'
import panel from './panel'
import mobProto from './mobProto'
import inventory from './inventory'
var mouse = {
  pageX: null,
  pageY: null,
  otop: null,
  oleft: null,
  top: function () {
    return this.pageY - this.otop
  },
  left: function () {
    return this.pageX - this.oleft
  },
  isOn: function (obj) {
    if (
      mouse.top() > obj.top &&
      mouse.left() > obj.left &&
      mouse.top() < obj.top + obj.height &&
      mouse.left() < obj.left + obj.width) {
      return true
    }
  }
}

mouse.move = function (ctx) {
  if (data.moveItem !== null && data.moveItem !== false) {
    let src = item[data.moveItem].src
    draw.image(ctx, src, mouse.left() - 10, mouse.top() - 10)
  }
}
mouse.stickyItem = function () {
  if (mouse.isOn(assets.slotsBar)) {
    for (let e in slots) {
      if (mouse.isOn(slots[e])) {
        if (slots[e].itemId !== null) {
          data.moveItem = slots[e].itemId
          data.beforeSlot = e
        }
      }
    }
  }
  if (panel.interaction.inventory) {
    if (mouse.isOn(assets.inventory)) {
      let left = mouse.left() - assets.inventory.left
      let top = mouse.top() - assets.inventory.top
      let first = Math.floor(left / 29)
      let second = Math.floor(top / 29)
      if (inventory[first][second] === null) {
        if (item[inventory[first][second - 1]]) {
          if (item[inventory[first][second - 1]].slots > 1) {
            data.moveItem = inventory[first][second - 1]
            data.beforeInventory = {first: first, second: second - 1}
          }
        } else if (item[inventory[first][second - 2]]) {
          if (item[inventory[first][second - 2]].slots === 3) {
            data.moveItem = inventory[first][second - 2]
            data.beforeInventory = {first: first, second: second - 2}
          }
        }
      } else {
        data.moveItem = inventory[first][second]
        data.beforeInventory = {first: first, second: second}
      }
    }
  }
}
mouse.dropItem = function () {
  if (data.beforeSlot) {
    if (data.moveItem !== null) {
      if (mouse.isOn(assets.slotsBar)) {
        for (let i in slots) {
          if (mouse.isOn(slots[i])) {
            if (slots[i].itemId !== null) {
              slots[data.beforeSlot].itemId = slots[i].itemId
            } else {
              slots[data.beforeSlot].itemId = null
            }
            slots[i].itemId = data.moveItem
          }
        }
      } else {
        slots[data.beforeSlot].itemId = null
      }
      data.moveItem = null
      data.beforeSlot = null
    }
  }
  // inventory system
  if (data.beforeInventory) {
    if (mouse.isOn(assets.slotsBar)) {
      for (let i in slots) {
        if (mouse.isOn(slots[i])) {
          slots[i].itemId = data.moveItem
        }
      }
    } else if (mouse.isOn(assets.inventory)) {
      let left = mouse.left() - assets.inventory.left
      let top = mouse.top() - assets.inventory.top
      let first = Math.floor(left / 29)
      let second = Math.floor(top / 29)

      if (!inventory[first][second]) {
        if (inventory[first][second - 2]) {
          if (item[inventory[first][second - 2]].slots !== 3) {
            if (item[data.moveItem].slots === 2) {
              if (!(inventory[first][second + 1])) {
                inventory[first][second] = data.moveItem
                inventory[data.beforeInventory.first][data.beforeInventory.second] = null
              }
            } else if (item[data.moveItem].slots === 3) {
              if (!inventory[first][second + 2]) {
                inventory[first][second] = data.moveItem
                inventory[data.beforeInventory.first][data.beforeInventory.second] = null
              }
            } else {
              inventory[first][second] = data.moveItem
              inventory[data.beforeInventory.first][data.beforeInventory.second] = null
            }
          }
        } else if (inventory[first][second - 1]) {
          if (!(item[inventory[first][second - 1]].slots > 1)) {
            if (item[data.moveItem].slots === 2) {
              if (!(inventory[first][second + 1])) {
                inventory[first][second] = data.moveItem
                inventory[data.beforeInventory.first][data.beforeInventory.second] = null
              }
            } else if (item[data.moveItem].slots === 3) {
              if (!inventory[first][second + 2]) {
                inventory[first][second] = data.moveItem
                inventory[data.beforeInventory.first][data.beforeInventory.second] = null
              }
            } else {
              inventory[first][second] = data.moveItem
              inventory[data.beforeInventory.first][data.beforeInventory.second] = null
            }
          }
        } else {
          if (item[data.moveItem].slots === 2) {
            if (!(inventory[first][second + 1])) {
              inventory[first][second] = data.moveItem
              inventory[data.beforeInventory.first][data.beforeInventory.second] = null
            }
          } else if (item[data.moveItem].slots === 3) {
            if (!inventory[first][second + 2]) {
              inventory[first][second] = data.moveItem
              inventory[data.beforeInventory.first][data.beforeInventory.second] = null
            }
          } else {
            inventory[first][second] = data.moveItem
            inventory[data.beforeInventory.first][data.beforeInventory.second] = null
          }
        }
      }
      // end of inventory move system
    } else {
      inventory[data.beforeInventory.first][data.beforeInventory.second] = null
    }
    data.moveItem = null
    data.beforeInventory = null
  }
}
mouse.event = function () {
  // mob atak
  mob.atak(mouse)
  // take drop
  if (mouse.isOn(mob.drop)) {
    for (let i in inventory) {
      for (let e in inventory[i]) {
        if (!inventory[i][e]) {
          if (inventory[i][e - 2]) {
            if (item[inventory[i][e - 2]].slots !== 3) {
              if (item[data.dropItem].slots === 2) {
                if (!(inventory[i][e + 1])) {
                  inventory[i][e] = data.dropItem
                  data.drop = false
                  data.dropItem = null
                  return
                }
              } else if (item[data.dropItem].slots === 3) {
                if (!inventory[i][e + 2]) {
                  inventory[i][e] = data.dropItem
                  data.drop = false
                  data.dropItem = null
                  return
                }
              } else {
                inventory[i][e] = data.dropItem
                data.drop = false
                data.dropItem = null
                return
              }
            }
          } else if (inventory[i][e - 1]) {
            if (!(item[inventory[i][e - 1]].slots > 1)) {
              if (item[data.dropItem].slots === 2) {
                if (!(inventory[i][e + 1])) {
                  inventory[i][e] = data.dropItem
                  data.drop = false
                  data.dropItem = null
                  return
                }
              } else if (item[data.dropItem].slots === 3) {
                if (!inventory[i][e + 2]) {
                  inventory[i][e] = data.dropItem
                  data.drop = false
                  data.dropItem = null
                  return
                }
              } else {
                inventory[i][e] = data.dropItem
                data.drop = false
                data.dropItem = null
                return
              }
            }
          } else {
            if (item[data.dropItem].slots === 2) {
              if (!(inventory[i][e + 1])) {
                inventory[i][e] = data.dropItem
                data.drop = false
                data.dropItem = null
                return
              }
            } else if (item[data.dropItem].slots === 3) {
              if (!inventory[i][e + 2]) {
                inventory[i][e] = data.dropItem
                data.drop = false
                data.dropItem = null
                return
              }
            } else {
              inventory[i][e] = data.dropItem
              data.drop = false
              data.dropItem = null
              return
            }
          }
        }
      }
    }
  }
  // open inventory
  if (mouse.isOn(assets.interface.invButton)) {
    if (panel.interaction.inventory) {
      panel.interaction.inventory = false
    } else {
      panel.interaction.inventory = true
    }
  }
  if (mouse.isOn(assets.interface.inventory.closeButton)) {
    panel.interaction.inventory = false
  }
  // restart
  if (mouse.isOn(assets.interface.restart) && data.status.over) {
    console.log('restart')
    data.status.over = false
    data.stats.hp = data.stats.maxHp
    data.mob.hp = data.mob.maxHp
  }
  // title buttons
  if (mouse.isOn(panel.leftButton)) {
    if (data.lvl > 0) {
      data.lvl--
      data.atak = false
      data.mob.maxHp = mobProto[data.lvl].hp
      data.mob.hp = data.mob.maxHp
    }
  }
  if (mouse.isOn(panel.rightButton)) {
    if (data.lvl < data.maxlvl) {
      data.lvl++
      data.mob.maxHp = mobProto[data.lvl].hp
      data.mob.hp = data.mob.maxHp
      data.atak = false
    }
  }
}
export default mouse
