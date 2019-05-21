var main = {
  mob: {
    top: 350,
    left: 525,
    width: 150,
    height: 200
  },
  draw: function (ctx) {
    var img = new Image()
    img.src = 'static/back.jpg'
    var drawimage = () => {
      ctx.drawImage(img, 0, 0)
      this.drawMob(ctx)
    }
    img.onload = drawimage
  },
  drawMob: function (ctx) {
    ctx.fillStyle = '#FF0000'
    ctx.fillRect(this.mob.left, this.mob.top, this.mob.width, this.mob.height)
  },
  event: function (mouse) {
    if (
      mouse.top() > this.mob.top &&
      mouse.left() > this.mob.left &&
      mouse.top() < this.mob.top + this.mob.height &&
      mouse.left() < this.mob.left + this.mob.width) {
      console.log('true')
    }
  }
}
export default main
