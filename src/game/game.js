var panel = require('./panel')
var data = require('./data')
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
      console.log('u lose')
      clearInterval(mobInterval)
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
      data.status.over = true
      console.log('u defet mob')
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
}

export default game
