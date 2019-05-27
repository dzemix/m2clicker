import draw from './draw'
import slots from './panel/slots'
import item from './item'
import mob from './mob'
import assets from './panel/assets'
import data from './data'
import panel from './panel'
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
  if (mouse.isOn(mob.mob)) {
    if (!data.status.over) {
      if (data.mob.hp > 0) {
        data.atak = true
        data.mob.hp -= data.dmg
      }
    }
    if (data.mob.hp <= 0) {
      if (data.stats.exp < 100) {
        data.stats.exp += 20
        data.mob.hp = data.mob.maxHp
      } else {
        data.status.over = true
        data.atak = false
        data.status.overText = 'You Win'
        data.stats.exp = 0
      }
    }
  }
  if (mouse.isOn(assets.interface.invButton)) {
    console.log('invbutton')
    if (panel.interaction.inventory) {
      panel.interaction.inventory = false
    } else {
      panel.interaction.inventory = true
    }
  }
  if (mouse.isOn(assets.interface.inventory.closeButton)) {
    panel.interaction.inventory = false
  }
  if (mouse.isOn(assets.interface.restart) && data.status.over) {
    console.log('restart')
    data.status.over = false
    data.stats.hp = 95
    data.stats.exp = 0
    data.mob.hp = 150
  }
}
export default mouse
