var mouse = {
  pageX: null,
  pageY: null,
  otop: null,
  oleft: null,
  top: function () {
    return this.pageY - this.otop
  },
  left: function () {
    return this.pageX - this.oleft
  },
  isOn: function (obj) {
    if (
      mouse.top() > obj.top &&
      mouse.left() > obj.left &&
      mouse.top() < obj.top + obj.height &&
      mouse.left() < obj.left + obj.width) {
      return true
    }
  }
}

export default mouse
