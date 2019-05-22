var game = {
  interaction: {
    inventory: false
  },
  mob: {
    left: 525,
    top: 300,
    width: 150,
    height: 200
  },
  interface: {
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
  },
  main: function (ctx) {
    let img = new Image()
    img.src = '/static/back.jpg'
    setInterval(() => {
      ctx.drawImage(img, 0, 0)
      this.drawMob(ctx)
      this.drawInterface(ctx)
    }, 40)
  },
  drawMob: function (ctx) {
    ctx.fillStyle = '#FF0000'
    ctx.fillRect(this.mob.left, this.mob.top, this.mob.width, this.mob.height)
  },
  drawInterface: function (ctx) {
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
  },
  event: function (mouse, ctx) {
    if (mouse.isOn(this.mob)) {
      console.log('mob')
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
}
export default game
