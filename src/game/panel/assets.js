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
  width: 25,
  height: 25,
  color: 'blue'
}
export default assets
