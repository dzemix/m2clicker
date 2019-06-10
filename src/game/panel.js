import data from './data'
import draw from './draw'
import assets from './panel/assets'
import mobProto from './mobProto'
import inventory from './inventory'
import lvl from './lvl'
import mouse from './mouse'
import item from './item'
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
  let hpregen = 95 * data.percent(data.stats.maxHp, data.stats.hp + data.stats.regHp)
  draw.square(ctx, {left: assets.hp.left, top: assets.hp.top, width: hpregen, height: assets.hp.height, color: 'blue'})
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
    ctx.fillText(`punkty do rozdania: (${data.champion.points})`, 50, 150)
    ctx.fillText(`health: (${data.champion.health})`, 50, 165)
    ctx.fillText(`strength: (${data.champion.strength})`, 50, 180)
    if (data.champion.points) {
      draw.square(ctx, assets.statsPanel.health)
      draw.square(ctx, assets.statsPanel.strength)
    }
  }

  // if inventory true draw inventory
  if (this.interaction.inventory) {
    draw.image(ctx,
      '/static/inventory.png',
      assets.interface.inventory.left,
      assets.interface.inventory.top)
    panel.inventory(ctx)
    panel.popout(ctx)
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
  // draw equipment
  for (let i in data.types) {
    if (inventory[data.types[i]].itemId) {
      draw.item(ctx, {itemId: inventory[data.types[i]].itemId, left: assets[data.types[i]].left, top: assets[data.types[i]].top})
    }
  }
}
panel.popout = function (ctx) {
  // popout on inventory
  if (mouse.isOn(assets.inventory)) {
    let left = mouse.left() - assets.inventory.left
    let top = mouse.top() - assets.inventory.top
    let i = Math.floor(left / 29)
    let e = Math.floor(top / 29)
    if (inventory[i][e]) {
      let value = item[inventory[i][e].itemId]
      let leftt = (assets.inventory.left + i * 29) - 150
      let topp = assets.inventory.top + e * 29
      panel.drawPopOut(ctx, value, leftt, topp)
    }
  }
  // popout on equipment
  for (let i in data.types) {
    if (mouse.isOn(assets[data.types[i]])) {
      if (item[inventory[data.types[i]].itemId]) {
        let value = item[inventory[data.types[i]].itemId]
        let leftt = (assets[data.types[i]].left) - 150
        let topp = assets[data.types[i]].top
        panel.drawPopOut(ctx, value, leftt, topp)
      }
    }
  }
  panel.drawPopOut = function (ctx, value, leftt, topp) {
    draw.square(ctx, {left: leftt, top: topp, width: 150, height: 200, color: 'black'})
    ctx.font = '15px Georgia'
    ctx.fillStyle = 'yellow'
    ctx.fillText(`${value.title}`, leftt + 4, topp + 17)
    ctx.fillText(`lvl: ${value.lvl}`, leftt + 4, topp + 17 + 17)
    if (value.bon) {
      for (let i = 0; i < value.bon.length; i++) {
        let inc = 17 * (i + 2)
        ctx.fillText(`${value.bon[i].type}: ${value.bon[i].value}`, leftt + 4, topp + 17 + inc)
      }
    }
  }
}
export default panel
