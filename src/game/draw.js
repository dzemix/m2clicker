import item from './item'
var draw = {}
draw.square = function (ctx, params) {
  ctx.fillStyle = params.color
  ctx.fillRect(params.left, params.top, params.width, params.height)
}
draw.image = function (ctx, params) {
  var img = new Image()
  img.src = item[params.itemId].src
  ctx.drawImage(img, params.left, params.top)
}
export default draw
