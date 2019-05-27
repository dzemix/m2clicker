import game from './game'
import draw from './draw'
import slots from './panel/slots'
import item from './item'
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
  if (game.moveItem !== null && game.moveItem !== false) {
    let src = item[game.moveItem].src
    draw.image(ctx, src, mouse.left() - 10, mouse.top() - 10)
  }
}
mouse.stickyItem = function () {
  let e = 0
  for (e; e < slots.length; e++) {
    if (mouse.isOn(slots[e])) {
      if (slots[e].itemId !== null) {
        game.moveItem = slots[e].itemId
        game.beforeSlot = e
      }
    }
  }
}
mouse.dropItem = function () {
  if (game.moveItem !== null) {
    let i = 0
    let validation = false
    for (i; i < slots.length; i++) {
      if (mouse.isOn(slots[i])) {
        if (slots[i].itemId !== null) {
          slots[game.beforeSlot].itemId = slots[i].itemId
        } else {
          slots[game.beforeSlot].itemId = null
        }
        slots[i].itemId = game.moveItem
        validation = true
      }
      if (validation === false && i === 7) {
        slots[game.beforeSlot].itemId = null
      }
    }
    game.moveItem = null
    game.beforeSlot = null
  }
}
export default mouse
