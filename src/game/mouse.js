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
      if (inventory[first][second]) {
        data.moveItem = inventory[first][second].itemId
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
      let i = Math.floor(left / 29)
      let e = Math.floor(top / 29)
      let validation = false
      if (!inventory[i][e]) {
        for (let o = 0; o < item[data.moveItem].slots; o++) {
          if (!inventory[i][e + o] && o + 1 === item[data.moveItem].slots) {
            validation = true
          }
        }
      }
      if (validation) {
        if (e + item[data.moveItem].slots - 1 < 9) {
          for (let t = 0; t < item[data.moveItem].slots; t++) {
            inventory[i][e + t] = {itemId: data.moveItem, slot: t + 1}
            inventory[data.beforeInventory.first][data.beforeInventory.second + t] = null
          }
        }
      }
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
      for (let e = 0; e < inventory[i].length; e++) {
        let validation = false
        if (!inventory[i][e]) {
          for (let o = 0; o < item[data.dropItem].slots; o++) {
            if (!inventory[i][e + o] && o + 1 === item[data.dropItem].slots) {
              validation = true
            }
          }
        }
        if (validation) {
          if (e + item[data.dropItem].slots < 10) {
            for (let w = 0; w < item[data.dropItem].slots; w++) {
              inventory[i][e + w] = {itemId: data.dropItem, slot: w + 1}
            }
            data.drop = false
            data.dropItem = null
            return
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
