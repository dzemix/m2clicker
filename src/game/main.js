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
    img.onload = drawimage
    function drawimage () {
      ctx.drawImage(this, 0, 0)
      ctx.fillStyle = '#FF0000'
      ctx.fillRect(this.mob.left, this.mob.top, this.mob.with, this.mob.height)
    }
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
