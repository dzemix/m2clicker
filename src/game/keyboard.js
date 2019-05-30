import data from './data'
import slots from './panel/slots'
import panel from './panel'
var keyboard = {}
keyboard.keyListener = function () {
  document.addEventListener('keyup', function (evt) {
    var keys = ['1', '2', '3', '4', '5', '6', '7', '8']
    let i = 0
    for (i; i < keys.length; i++) {
      if (evt.key === keys[i]) {
        if (slots[evt.key - 1].itemId === 0) {
          if (!data.status.over) {
            if (data.stats.hp < data.stats.maxHp - 5) {
              data.stats.hp += 10
            } else {
              data.stats.hp = data.stats.maxHp
            }
          }
        }
      }
    }
    if (evt.key === 'i') {
      if (panel.interaction.inventory === false) {
        panel.interaction.inventory = true
      } else {
        panel.interaction.inventory = false
      }
    }
    if (evt.key === 'c') {
      if (panel.interaction.statsPanel === false) {
        panel.interaction.statsPanel = true
      } else {
        panel.interaction.statsPanel = false
      }
    }
  })
}
export default keyboard
