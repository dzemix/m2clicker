import panel from './panel'
import data from './data'
import draw from './draw'
import assets from './panel/assets'
var game = {}
game.interval = ''
game.moveItem = ''
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
  }, 40)
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
game.keyListener = function () {
  document.addEventListener('keyup', function (evt) {
    if (evt.keyCode === 49) {
      if (data.stats.hp <= 90) {
        data.stats.hp += 10
        console.log(data.stats.hp)
      } else {
        data.stats.hp = 95
      }
    }
  })
}
game.move = function (mouse, ctx) {
  var potion = new Image()
  potion.src = '/static/redPotion.png'
  var potion2 = new Image()
  potion2.src = '/static/bluePotion.png'
  if (this.moveItem === 1) {
    ctx.drawImage(potion, mouse.left() - 10, mouse.top() - 10)
  }
  if (this.moveItem === 2) {
    ctx.drawImage(potion2, mouse.left() - 10, mouse.top() - 10)
  }
}
game.stickyItem = function (mouse) {
  if (mouse.isOn(panel.slot1)) {
    this.moveItem = 1
  }
  if (mouse.isOn(panel.slot2)) {
    this.moveItem = 2
  }
}
export default game
