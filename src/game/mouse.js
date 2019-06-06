import draw from './draw'
import slots from './panel/slots'
import item from './item'
import mob from './mob'
import assets from './panel/assets'
import data from './data'
import panel from './panel'
import mobProto from './mobProto'
import inventory from './inventory'
import equipment from './equipment'
import lvl from './lvl'
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
mouse.catch = function () {
  // catch slotsbar
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
  // catch equipment
  if (panel.interaction.inventory) {
    for (let i in data.types) {
      if (mouse.isOn(assets[data.types[i]])) {
        if (inventory[data.types[i]].itemId) {
          data.moveItem = inventory[data.types[i]].itemId
          data.beforeEquip = [data.types[i]]
        }
      }
    }
    // catch inventory
    if (mouse.isOn(assets.inventory)) {
      let left = mouse.left() - assets.inventory.left
      let top = mouse.top() - assets.inventory.top
      let first = Math.floor(left / 29)
      let second = Math.floor(top / 29)
      if (inventory[first][second]) {
        data.moveItem = inventory[first][second].itemId
        let decrement = 0
        for (let i = inventory[first][second].slot; i > 1; i--) {
          decrement++
        }
        data.beforeInventory = {first: first, second: second - decrement}
      }
    }
  }
}
mouse.dropItem = function () {
  // drop item from equipment
  if (data.beforeEquip) {
    if (mouse.isOn(assets.inventory)) {
      let left = mouse.left() - assets.inventory.left
      let top = mouse.top() - assets.inventory.top
      let i = Math.floor(left / 29)
      let e = Math.floor(top / 29)
      if (!inventory[i][e]) {
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
            }
            inventory[data.beforeEquip].itemId = null
            data.beforeEquip = null
            equipment.main()
          }
        }
        data.moveItem = null
      }
    } else {
      data.moveItem = null
      console.log('u cant drop equiped item')
    }
  }
  // drop from slots to slots
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
  // drop inventory
  if (data.beforeInventory) {
    // drop inventory to equipment
    let toEquipment = false
    for (let i in data.types) {
      if (mouse.isOn(assets[data.types[i]])) {
        if (!inventory[data.types[i]].itemId) {
          if (item[data.moveItem].type === data.types[i]) {
            if (item[data.moveItem].lvl <= lvl[data.stats.lvl].lvl) {
              inventory[data.types[i]].itemId = data.moveItem
              equipment.main()
              for (let t = 0; t < item[data.moveItem].slots; t++) {
                inventory[data.beforeInventory.first][data.beforeInventory.second + t] = null
              }
            }
          }
        }
        toEquipment = true
      }
    }
    if (!toEquipment) {
      // drop to slots
      if (mouse.isOn(assets.slotsBar)) {
        for (let i in slots) {
          if (mouse.isOn(slots[i])) {
            slots[i].itemId = data.moveItem
          }
        }
      // drop to inventory
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
        for (let i = 0; i < item[data.moveItem].slots; i++) {
          inventory[data.beforeInventory.first][data.beforeInventory.second + i] = null
        }
      }
    }
    data.moveItem = null
    data.beforeInventory = null
  }
}
mouse.event = function () {
  // mob atak
  mob.atak(mouse)
  // take drop

  if (data.dropItem) {
    for (let q in mob.drop) {
      if (mouse.isOn(mob.drop[q])) {
        if (data.dropItem[q]) {
          for (let i in inventory) {
            for (let e = 0; e < inventory[i].length; e++) {
              let validation = false
              if (!inventory[i][e]) {
                for (let o = 0; o < item[data.dropItem[q]].slots; o++) {
                  if (!inventory[i][e + o] && o + 1 === item[data.dropItem[q]].slots) {
                    validation = true
                  }
                }
              }
              if (validation) {
                if (e + item[data.dropItem[q]].slots < 10) {
                  for (let w = 0; w < item[data.dropItem[q]].slots; w++) {
                    inventory[i][e + w] = {itemId: data.dropItem[q], slot: w + 1}
                  }
                  data.dropItem[q] = null
                  return
                }
              }
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
