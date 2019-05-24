import data from './data'
import draw from './draw'
import assets from './assets'
var panel = {}
panel.interaction = {
  inventory: false
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
  draw.square(ctx, assets.underExp)
  // draw exp
  assets.exp.width = data.stats.exp
  draw.square(ctx, assets.exp)
  // draw interface
  draw.image(ctx, '/static/panel2.png', 0, 540)
  // draw hp
  assets.hp.width = data.stats.hp
  draw.square(ctx, assets.hp)
  // draw red potion
  draw.item(ctx, panel.slot1)
  // draw blue potion
  draw.item(ctx, panel.slot2)
  // draw inv button
  draw.square(ctx, assets.interface.invButton)
  // if inventory true draw inventory
  if (this.interaction.inventory) {
    draw.image(ctx,
      '/static/inventory.png',
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
