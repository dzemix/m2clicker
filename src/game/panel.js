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
panel.hpBorder = {
  left: 20,
  top: panel.interface.lowPanel.top + 10,
  width: 102,
  height:30
}
panel.hp = {
  left: panel.hpBorder.left + 1,
  top: panel.hpBorder.top + 1,
  width: 100,
  height: panel.hpBorder.height - 2
}
panel.draw = function (ctx) {
  // draw low panel
  ctx.fillStyle = '#000000'
  ctx.fillRect(this.interface.lowPanel.left,
    this.interface.lowPanel.top,
    this.interface.lowPanel.width,
    this.interface.lowPanel.height)
  // draw hp border
  ctx.strokeStyle = 'yellow'
  ctx.strokeRect(this.hpBorder.left,
    this.hpBorder.top,
    this.hpBorder.width,
    this.hpBorder.height)
  // draw hp
  ctx.fillStyle = 'red'
  ctx.fillRect(this.hp.left,this.hp.top,this.hp.width,this.hp.height)
  // draw inventory button
  ctx.fillStyle = 'red'
  ctx.fillRect(this.interface.invButton.left,
    this.interface.invButton.top,
    this.interface.invButton.width,
    this.interface.invButton.height)
  // if inventory true draw inventory
  let img = new Image()
  img.src = '/static/inventory.png'
  if (this.interaction.inventory) {
    ctx.drawImage(
      img,
      this.interface.inventory.left,
      this.interface.inventory.top)
  }
}
