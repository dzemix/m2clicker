import data from '../data'
var assets = {}
assets.interface = {
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
    width: 150,
    height: 520,
    closeButton: {
      left: 1170,
      top: 37,
      width: 30,
      height: 30
    }
  }
}
assets.hp = {
  left: 74,
  top: assets.interface.lowPanel.top + 20,
  width: data.stats.hp,
  height: 8,
  color: 'red'
}
assets.underExp = {
  left: 175,
  top: 570,
  width: 200,
  height: 30,
  color: 'black'
}
assets.exp = {
  left: 177,
  top: assets.interface.lowPanel.top + 22,
  width: data.stats.exp,
  height: 23,
  color: 'yellow'
}
assets.inventory = {
  left: assets.interface.inventory.left + 3,
  top: assets.interface.inventory.top + 235,
  width: 145,
  height: 265
}
assets.slot = {
  left: assets.interface.inventory.left + 3,
  top: assets.interface.inventory.top + 235,
  width: 25,
  height: 25,
  color: 'blue'
}
assets.slotsBar = {
  left: 490,
  top: 565,
  width: 300,
  height: 40,
  color: 'red'}
assets.statsPanel = {
  left: 30,
  top: 100,
  width: 220,
  height: 250,
  color: 'black'}
assets.weapon = {
  left: assets.slot.left + 8,
  top: assets.slot.top - 200,
  width: 26,
  height: 85,
  color: 'red'}
assets.armor = {
  left: assets.slot.left + 41,
  top: assets.slot.top - 172,
  width: 26,
  height: 63
}
assets.helmet = {
  left: assets.slot.left + 40,
  top: assets.slot.top - 200,
  width: 26,
  height: 26
}
export default assets
