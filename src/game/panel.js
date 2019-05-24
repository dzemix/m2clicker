import data from './data'
var panel = {}
panel.interaction = {
  inventory: false
}
panel.interface = {
  restart: {
    left: 550,
    top: 210,
    width: 100,
    height: 50
  },
  lowPanel: {
    left: 0,
    top: 550,
    width: 1200,
    height: 50
  },
  invButton: {
    left: 1150,
    top: 567,
    width: 1200,
    height: 31
  },
  inventory: {
    left: 1050,
    top: 37,
    closeButton: {
      left: 1170,
      top: 37,
      width: 30,
      height: 30
    }
  }
}
panel.hp = {
  left: 74,
  top: panel.interface.lowPanel.top + 20,
  width: data.stats.hp,
  height: 8
}
panel.exp = {
  left: 177,
  top: panel.interface.lowPanel.top + 22,
  width: data.stats.exp,
  height: 23
}
panel.draw = function (ctx) {
  // draw low panel
  // draw black square under interface
  ctx.fillStyle = 'black'
  ctx.fillRect(175, 570, 200, 30)
  // draw exp
  this.exp.width = data.stats.exp
  ctx.fillStyle = 'yellow'
  ctx.fillRect(this.exp.left, this.exp.top, this.exp.width, this.exp.height)
  // draw interface
  let lowPanel = new Image()
  lowPanel.src = '/static/panel2.png'
  ctx.drawImage(lowPanel, 0, 540)
  // draw hp
  this.hp.width = data.stats.hp
  ctx.fillStyle = 'red'
  ctx.fillRect(this.hp.left, this.hp.top, this.hp.width, this.hp.height)
  // draw inv button
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
  // if game is over draw restart button and text
  if (data.status.over) {
    ctx.font = '40px Georgia'
    ctx.fillStyle = 'yellow'
    ctx.fillText(data.status.overText, 500, 200)
    ctx.fillRect(this.interface.restart.left,
      this.interface.restart.top,
      this.interface.restart.width,
      this.interface.restart.height)
    ctx.font = '20px Georgia'
    ctx.fillStyle = 'black'
    ctx.fillText('restart', this.interface.restart.left + 20,
      this.interface.restart.top + 30)
  }
}
export default panel
