import panel from './panel'
import data from './data'
import draw from './draw'
var game = {}
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
game.main = function (ctx) {
  let img = new Image()
  img.src = '/static/back.jpg'
  // draw
  setInterval(() => {
    ctx.drawImage(img, 0, 0)
    this.drawMob(ctx)
    panel.draw(ctx)
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
  var dog = new Image()
  dog.src = '/static/dog.png'
  ctx.drawImage(dog, this.mob.left, this.mob.top)
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
  if (mouse.isOn(panel.interface.invButton)) {
    console.log('invbutton')
    if (panel.interaction.inventory) {
      panel.interaction.inventory = false
    } else {
      panel.interaction.inventory = true
    }
  }
  if (mouse.isOn(panel.interface.inventory.closeButton)) {
    panel.interaction.inventory = false
  }
  if (mouse.isOn(panel.interface.restart) && data.status.over) {
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
export default game
