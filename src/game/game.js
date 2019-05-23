var panel = require('./panel')
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
  setInterval(() => {
    ctx.drawImage(img, 0, 0)
    this.drawMob(ctx)
    panel.draw(ctx)
  }, 40)
}
game.drawMob = function (ctx) {
  ctx.fillStyle = 'blue'
  ctx.fillRect(this.mob.left, this.mob.top, this.mob.width, this.mob.height)
  ctx.fillRect(this.mobHp.left, this.mobHp.top, this.mobHp.width, this.mobHp.height)
  ctx.fillStyle = 'red'
  ctx.fillRect(this.mobHp.left, this.mobHp.top, this.mobHp.hp, this.mobHp.height)
}
game.event = function (mouse, ctx) {
  if (mouse.isOn(this.mob)) {
    console.log(panel.interface)
    if (this.mobHp.hp > 0) {
      this.mobHp.hp -= 10
    }
    if (this.mobHp.hp <= 0) {
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
