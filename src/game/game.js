var game = {}
game.interaction = {
  inventory: false
}
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
game.interface = {
  lowPanel: {
    left: 0,
    top: 550,
    width: 1200,
    height: 50
  },
  invButton: {
    left: 1150,
    top: 550,
    width: 1200,
    height: 50
  },
  inventory: {
    left: 1050,
    top: 25,
    closeButton: {
      left: 1170,
      top: 25,
      width: 30,
      height: 30
    }
  }
}
game.main = function (ctx) {
  let img = new Image()
  img.src = '/static/back.jpg'
  setInterval(() => {
    ctx.drawImage(img, 0, 0)
    this.drawMob(ctx)
    this.drawInterface(ctx)
  }, 40)
}
game.drawMob = function (ctx) {
  ctx.fillStyle = 'blue'
  ctx.fillRect(this.mob.left, this.mob.top, this.mob.width, this.mob.height)
  ctx.fillRect(this.mobHp.left, this.mobHp.top, this.mobHp.width, this.mobHp.height)
  ctx.fillStyle = 'red'
  ctx.fillRect(this.mobHp.left, this.mobHp.top, this.mobHp.hp, this.mobHp.height)
}
game.drawInterface = function (ctx) {
  ctx.fillStyle = '#000000'
  ctx.fillRect(this.interface.lowPanel.left,
    this.interface.lowPanel.top,
    this.interface.lowPanel.width,
    this.interface.lowPanel.height)
  ctx.fillStyle = 'red'
  ctx.fillRect(this.interface.invButton.left,
    this.interface.invButton.top,
    this.interface.invButton.width,
    this.interface.invButton.height)
  let img = new Image()
  img.src = '/static/inventory.png'
  if (this.interaction.inventory) {
    ctx.drawImage(
      img,
      this.interface.inventory.left,
      this.interface.inventory.top)
  }
}
game.event = function (mouse, ctx) {
  if (mouse.isOn(this.mob)) {
    if (this.mobHp.hp > 0) {
      this.mobHp.hp -= 10
    }
    if (this.mobHp.hp <= 0) {
      console.log('u defet mob')
    }
  }
  if (mouse.isOn(this.interface.invButton)) {
    console.log('invbutton')
    if (this.interaction.inventory) {
      this.interaction.inventory = false
    } else {
      this.interaction.inventory = true
    }
  }
  if (mouse.isOn(this.interface.inventory.closeButton)) {
    this.interaction.inventory = false
  }
}

export default game
