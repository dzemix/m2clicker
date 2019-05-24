import data from './data'
import draw from './draw'
var panel = {}
panel.interaction = {
  inventory: false
}
panel.interface = {
  restart: {
    left: 550,
    top: 210,
    width: 100,
    height: 50,
    color: 'yellow'
  },
  lowPanel: {
    left: 0,
    top: 550,
    width: 1200,
    height: 50,
    color: 'black'
  },
  invButton: {
    left: 1150,
    top: 567,
    width: 1200,
    height: 31,
    color: 'red'
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
  height: 8,
  color: 'red'
}
panel.underExp = {
  left: 175,
  top: 570,
  width: 200,
  height: 30,
  color: 'black'
}
panel.exp = {
  left: 177,
  top: panel.interface.lowPanel.top + 22,
  width: data.stats.exp,
  height: 23,
  color: 'yellow'
}
panel.slot1 = {
  itemId: 0,
  left: 495,
  top: 568,
  width: 25,
  height: 25
}
panel.slot2 = {
  itemId: 1,
  left: 526,
  top: 568,
  width: 25,
  height: 25
}
panel.draw = function (ctx) {
  // draw low panel
  // draw black square under interface
  draw.square(ctx, this.underExp)
  // draw exp
  this.exp.width = data.stats.exp
  draw.square(ctx, this.exp)
  // draw interface
  let lowPanel = new Image()
  lowPanel.src = '/static/panel2.png'
  ctx.drawImage(lowPanel, 0, 540)
  // draw hp
  this.hp.width = data.stats.hp
  draw.square(ctx, this.hp)
  // draw red potion
  draw.image(ctx, panel.slot1)
  // draw blue potion
  draw.image(ctx, panel.slot2)
  // draw inv button
  draw.square(ctx, this.interface.invButton)
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
    draw.square(ctx, this.interface.restart)
    ctx.font = '20px Georgia'
    ctx.fillStyle = 'black'
    ctx.fillText('restart', this.interface.restart.left + 20,
      this.interface.restart.top + 30)
  }
}
export default panel
