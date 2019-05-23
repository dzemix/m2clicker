var panel = module.exports = {}
panel.interaction = {
  inventory: false
}
panel.interface = {
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
panel.draw = function (ctx) {
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
