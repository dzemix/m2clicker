var main = {
  mob: {
    left: 525,
    top: 300,
    width: 150,
    height: 200
  },
  interface: {
    lowPanel: {
      left: 0,
      top: 550,
      width: 1200,
      height: 50
    }
  },
  draw: function (ctx) {
    var img = new Image()
    img.src = 'static/back.jpg'
    var drawimage = () => {
      ctx.drawImage(img, 0, 0)
      this.drawMob(ctx)
      this.drawInterface(ctx)
    }
    img.onload = drawimage
  },
  drawMob: function (ctx) {
    ctx.fillStyle = '#FF0000'
    ctx.fillRect(this.mob.left, this.mob.top, this.mob.width, this.mob.height)
  },
  drawInterface: function (ctx) {
    ctx.fillStyle = '#000000'
    ctx.fillRect(this.interface.lowPanel.left,
      this.interface.lowPanel.top,
      this.interface.lowPanel.width,
      this.interface.lowPanel.height)
  },
  event: function (mouse) {
    if (mouse.isOn(this.mob)) {
      console.log('mob')
    }
    if (mouse.isOn(this.interface.lowPanel)) {
      console.log('interface')
    }
  }
}
export default main
