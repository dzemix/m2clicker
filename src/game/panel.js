import data from './data'
import draw from './draw'
import assets from './assets'
var panel = {}
panel.interaction = {
  inventory: false
}
panel.hp = {
  left: 74,
  top: assets.interface.lowPanel.top + 20,
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
  top: assets.interface.lowPanel.top + 22,
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
  draw.square(ctx, assets.interface.invButton)
  // if inventory true draw inventory
  let img = new Image()
  img.src = '/static/inventory.png'
  if (this.interaction.inventory) {
    ctx.drawImage(
      img,
      assets.interface.inventory.left,
      assets.interface.inventory.top)
  }
  // if game is over draw restart button and text
  if (data.status.over) {
    ctx.font = '40px Georgia'
    ctx.fillStyle = 'yellow'
    ctx.fillText(data.status.overText, 500, 200)
    draw.square(ctx, assets.interface.restart)
    ctx.font = '20px Georgia'
    ctx.fillStyle = 'black'
    ctx.fillText('restart', assets.interface.restart.left + 20,
      assets.interface.restart.top + 30)
  }
}
export default panel
