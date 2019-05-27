import panel from './panel'
import data from './data'
import draw from './draw'
import assets from './panel/assets'
import slots from './panel/slots'
import item from './item'
var game = {}
game.interval = ''
game.moveItem = null
game.beforeSlot = null
game.mob = {
  left: 525,
  top: 350,
  width: 150,
  height: 170,
  color: 'blue'
}
game.mobUnderHp = {
  left: game.mob.left,
  top: game.mob.top - 20,
  width: game.mob.width,
  height: 10,
  color: 'blue'
}
game.mobHp = {
  left: game.mob.left,
  top: game.mob.top - 20,
  width: game.mob.width,
  height: 10,
  color: 'red'
}
game.main = function (ctx, mouse) {
  // draw
  setInterval(() => {
    draw.image(ctx, '/static/back.jpg', 0, 0)
    this.drawMob(ctx)
    panel.draw(ctx)
    this.move(mouse, ctx)
  }, 20)
  // mob hits
  setInterval(() => {
    if (!data.status.over) {
      if (data.stats.hp > 0) {
        data.stats.hp -= 1
      }
    }
    if (data.stats.hp <= 0) {
      data.status.over = true
      data.status.overText = 'You Lose'
    }
  }, 100)
  this.keyListener()
}
game.drawMob = function (ctx) {
  // draw mob and mob underHp
  // draw.square(ctx, this.mob)
  draw.image(ctx, '/static/dog.png', this.mob.left, this.mob.top)
  draw.square(ctx, this.mobUnderHp)
  // draw mob hp
  this.mobHp.width = this.mob.width * data.mob.percent()
  draw.square(ctx, this.mobHp)
}
game.event = function (mouse, ctx) {
  if (mouse.isOn(this.mob)) {
    if (!data.status.over) {
      if (data.mob.hp > 0) {
        data.mob.hp -= 10
      }
    }
    if (data.mob.hp <= 0) {
      if (data.stats.exp < 100) {
        data.stats.exp += 20
        data.mob.hp = data.mob.maxHp
      } else {
        data.status.over = true
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
// key listener
game.keyListener = function () {
  document.addEventListener('keyup', function (evt) {
    var keys = ['1', '2', '3', '4', '5', '6', '7', '8',]
    let i = 0
    for (i; i < keys.length; i++) {
      if (evt.key === keys[i]) {
        if (slots[evt.key - 1].itemId === 0) {
          if (!data.status.over) {
            if (data.stats.hp <= 90) {
              data.stats.hp += 10
              console.log(data.stats.hp)
            } else {
              data.stats.hp = 95
            }
          }
        }
      }
    }
    if (evt.key === 'i') {
      if (panel.interaction.inventory === false) {
        panel.interaction.inventory = true
      } else {
        panel.interaction.inventory = false
      }
    }
  })
}

// mouse move event

game.move = function (mouse, ctx) {
  if (this.moveItem !== null && this.moveItem !== false) {
    let src = item[this.moveItem].src
    draw.image(ctx, src, mouse.left() - 10, mouse.top() - 10)
  }
}
game.stickyItem = function (mouse) {
  let e = 0
  for (e; e < slots.length; e++) {
    if (mouse.isOn(slots[e])) {
      if (slots[e].itemId !== null) {
        this.moveItem = slots[e].itemId
        this.beforeSlot = e
      }
    }
  }
}
game.dropItem = function (mouse) {
  if (this.moveItem !== null) {
    let i = 0
    let validation = false
    for (i; i < slots.length; i++) {
      if (mouse.isOn(slots[i])) {
        if (slots[i].itemId !== null) {
          slots[this.beforeSlot].itemId = slots[i].itemId
        } else {
          slots[this.beforeSlot].itemId = null
        }
        slots[i].itemId = this.moveItem
        validation = true
      }
      if (validation === false && i === 7) {
        slots[this.beforeSlot].itemId = null
      }
    }
    this.moveItem = null
    this.beforeSlot = null
  }
}
export default game
