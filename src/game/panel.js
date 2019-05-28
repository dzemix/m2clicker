import data from './data'
import draw from './draw'
import assets from './panel/assets'
import mobProto from './mobProto'
var panel = {}
panel.interaction = {
  inventory: false
}
panel.titleBar = {
  left: 500,
  top: 40,
  width: 200,
  height: 50,
  color: 'grey'
}
panel.leftButton = {
  left: panel.titleBar.left - 60,
  top: panel.titleBar.top,
  width: 50,
  height: 50,
  color: 'red'
}
panel.rightButton = {
  left: panel.titleBar.left + 210,
  top: panel.titleBar.top,
  width: 50,
  height: 50,
  color: 'yellow'
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
  // draw slots

  draw.slots(ctx)

  // draw inv button
  draw.square(ctx, assets.interface.invButton)
  // if inventory true draw inventory
  if (this.interaction.inventory) {
    draw.image(ctx,
      '/static/inventory.png',
      assets.interface.inventory.left,
      assets.interface.inventory.top)
    panel.inventory(ctx)
  }
  // draw title bar !!!
  draw.square(ctx, panel.titleBar)
  // draw left and right button
  draw.square(ctx, panel.leftButton)
  draw.square(ctx, panel.rightButton)

  ctx.font = '20px Georgia'
  ctx.fillStyle = 'yellow'
  let text = mobProto[data.lvl].name
  ctx.fillText(text, 530, 70)

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
panel.inventory = function (ctx) {
  let left = assets.inventory.left
  let top = assets.inventory.top
  let width = assets.inventory.width
  let height = assets.inventory.height
  let i = 0
  for (i; i < 9; i++) {
    let e = 0
    for (e; e < 5; e++) {
      draw.square(ctx, {left, top, width, height})
      left += 29
    }
    left = assets.inventory.left
    top += 29
  }
}
export default panel
