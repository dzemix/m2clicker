import item from './item'
var draw = {}
draw.square = function (ctx, params) {
  ctx.fillStyle = params.color
  ctx.fillRect(params.left, params.top, params.width, params.height)
}
draw.item = function (ctx, params) {
  let img = new Image()
  img.src = item[params.itemId].src
  ctx.drawImage(img, params.left, params.top)
}
draw.image = function (ctx, src, left, top) {
  let img = new Image()
  img.src = src
  ctx.drawImage(img, left, top)
}
export default draw
