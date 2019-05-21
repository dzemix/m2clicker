exports.init = function (ctx) {
  var img = new Image()
  img.src = 'static/back.jpg'
  img.onload = drawimage
  function drawimage () {
    ctx.drawImage(this, 0, 0)
  }
}
