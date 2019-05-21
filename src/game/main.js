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
    },
    invButton: {
      left: 1150,
      top: 550,
      width: 1200,
      height: 50
    },
    inventory: {
      left: 950,
      top: 100,
      width: 250,
      height: 450,
      closeButton: {
        left: 1170,
        top: 100,
        width: 30,
        height: 30
      }
    }
  },
  draw: function (ctx) {
    var img = new Image()
    img.src = 'static/back.jpg'
    var drawimage = () => {
      console.log('drawimage')
      ctx.drawImage(img, 0, 0)
      this.drawMob(ctx)
      this.drawInterface(ctx)
      this.drawinvButton(ctx)
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
  drawinvButton: function (ctx) {
    ctx.fillStyle = 'red'
    ctx.fillRect(this.interface.invButton.left,
      this.interface.invButton.top,
      this.interface.invButton.width,
      this.interface.invButton.height)
  },
  event: function (mouse, ctx) {
    if (mouse.isOn(this.mob)) {
      console.log('mob')
    }
    if (mouse.isOn(this.interface.invButton)) {
      console.log('invbutton')
      ctx.fillStyle = 'yellow'
      ctx.fillRect(this.interface.inventory.left,
        this.interface.inventory.top,
        this.interface.inventory.width,
        this.interface.inventory.height)
      ctx.fillStyle = 'blue'
      ctx.fillRect(this.interface.inventory.closeButton.left,
        this.interface.inventory.closeButton.top,
        this.interface.inventory.closeButton.width,
        this.interface.inventory.closeButton.height)
    }
    if(mouse.isOn(this.interface.inventory.closeButton)) {
      this.draw(ctx)
    }
  }
}
export default main
