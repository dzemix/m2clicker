import panel from './panel'
import data from './data'
var game = {}
game.mob = {
  left: 525,
  top: 300,
  width: 150,
  height: 200
}
game.mobHp = {
  left: game.mob.left,
  top: game.mob.top - 20,
  width: game.mob.width,
  height: 10,
  hp: game.mob.width
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
  var mobInterval = setInterval(() => {
    if (!data.status.over) {
      if (data.stats.hp > 0 ) {
        data.stats.hp -= 1
      }
    }
    if (data.stats.hp <= 0 ) {
      data.status.over = true
      data.status.overText = 'You Lose'
    }
  }, 100)
}
game.drawMob = function (ctx) {
  ctx.fillStyle = 'blue'
  ctx.fillRect(this.mob.left, this.mob.top, this.mob.width, this.mob.height)
  ctx.fillRect(this.mobHp.left, this.mobHp.top, this.mobHp.width, this.mobHp.height)
  // draw mob hp
  this.mobHp.hp = this.mob.width * data.mob.percent()
  ctx.fillStyle = 'red'
  ctx.fillRect(this.mobHp.left, this.mobHp.top, this.mobHp.hp, this.mobHp.height)
}
game.event = function (mouse, ctx) {
  if (mouse.isOn(this.mob)) {
    if(!data.status.over) {
      if (data.mob.hp > 0) {
        data.mob.hp -= 10
      }      
    }
    if (data.mob.hp <= 0) {
      data.status.overText = 'You Defeat'
      data.status.over = true
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
    data.stats.hp = 100
    data.mob.hp = 150
  }
}

export default game
