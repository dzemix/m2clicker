import data from './data'
import draw from './draw'
import assets from './panel/assets'
import mobProto from './mobProto'
import inventory from './inventory'
import lvl from './lvl'
var panel = {}
panel.interaction = {
  inventory: false,
  statsPanel: false
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
  assets.exp.width = 105 * data.percent(lvl[data.stats.lvl].exp, data.stats.exp)
  draw.square(ctx, assets.exp)
  // draw interface
  draw.image(ctx, '/static/panel2.png', 0, 540)
  // draw hp
  assets.hp.width = 95 * data.percent(data.stats.maxHp, data.stats.hp)
  draw.square(ctx, assets.hp)
  // draw slots

  draw.slots(ctx)

  // draw inv button
  draw.square(ctx, assets.interface.invButton)
  // if stats draw statsPanel

  if (this.interaction.statsPanel) {
    draw.square(ctx, assets.statsPanel)
    ctx.font = '15px Georgia'
    ctx.fillStyle = 'yellow'
    ctx.fillText(`lvl: ${lvl[data.stats.lvl].lvl}`, 50, 120)
    let expvalue = `exp ${data.stats.exp}/${lvl[data.stats.lvl].exp}`
    ctx.fillText(expvalue, 50, 135)
  }

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
  // if lvlup draw lvlup
  if (data.status.lvlup) {
    ctx.font = '40px Georgia'
    ctx.fillStyle = 'yellow'
    ctx.fillText(data.status.overText, 540, 200)
    setTimeout(() => {
      data.status.lvlup = false
    }, 2000)
  }
}
// draw equipment
panel.inventory = function (ctx) {
  let left = assets.slot.left
  let top = assets.slot.top
  for (let i in inventory) {
    for (let e in inventory[i]) {
      if (inventory[i][e]) {
        if (inventory[i][e].slot === 1) {
          draw.item(ctx, {itemId: inventory[i][e].itemId, left, top})
        }
      }
      top += 29
    }
    top = assets.slot.top
    left += 29
  }
  // draw weapon
  if (inventory.weapon.itemId) {
    draw.item(ctx, {itemId: inventory.weapon.itemId, left: assets.weapon.left, top: assets.weapon.top})
  }
  // draw armor
  if (inventory.armor.itemId) {
    draw.item(ctx, {itemId: inventory.armor.itemId, left: assets.armor.left, top: assets.armor.top})
  }
  // draw helmet
  if (inventory.helmet.itemId) {
    draw.item(ctx, {itemId: inventory.helmet.itemId, left: assets.helmet.left, top: assets.helmet.top})
  }
  // draw shield
  if (inventory.shield.itemId) {
    draw.item(ctx, {itemId: inventory.shield.itemId, left: assets.shield.left, top: assets.shield.top})
  }
  // draw shoes
  if (inventory.shoes.itemId) {
    draw.item(ctx, {itemId: inventory.shoes.itemId, left: assets.shoes.left, top: assets.shoes.top})
  }
}
export default panel
