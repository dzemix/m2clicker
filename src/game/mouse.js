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
  let e = 0
  for (e; e < slots.length; e++) {
    if (mouse.isOn(slots[e])) {
      if (slots[e].itemId !== null) {
        data.moveItem = slots[e].itemId
        data.beforeSlot = e
      }
    }
  }
}
mouse.dropItem = function () {
  if (data.moveItem !== null) {
    let i = 0
    let validation = false
    for (i; i < slots.length; i++) {
      if (mouse.isOn(slots[i])) {
        if (slots[i].itemId !== null) {
          slots[data.beforeSlot].itemId = slots[i].itemId
        } else {
          slots[data.beforeSlot].itemId = null
        }
        slots[i].itemId = data.moveItem
        validation = true
      }
      if (validation === false && i === 7) {
        slots[data.beforeSlot].itemId = null
      }
    }
    data.moveItem = null
    data.beforeSlot = null
  }
}
mouse.event = function () {
  // mob atak
  if (mouse.isOn(mob.mob)) {
    if (!data.status.over) {
      if (data.mob.hp > 0) {
        data.atak = true
        data.mob.hp -= data.dmg
      }
    }
    if (data.mob.hp <= 0) {
      if (data.stats.exp < 100) {
        data.stats.exp += mobProto[data.lvl].exp
        data.mob.hp = data.mob.maxHp
      } else {
        data.status.over = true
        data.atak = false
        data.status.overText = 'You Win'
        data.stats.exp = 0
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
    data.stats.hp = 95
    data.stats.exp = 0
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
  // inventory event
  if (panel.interaction.inventory) {
    if (mouse.isOn(assets.inventory)) {
      let left = mouse.left() - assets.inventory.left
      let top = mouse.top() - assets.inventory.top
      let first = Math.floor(left / 29)
      let second = Math.floor(top / 29)
      if (inventory[first][second] === null) {
        if (item[inventory[first][second - 1]]) {
          if (item[inventory[first][second - 1]].slots == 2) {
            console.log(inventory[first][second - 1])
          }          
        }
      } else {
        console.log(inventory[first][second])
      }
    }
  }
}
export default mouse
