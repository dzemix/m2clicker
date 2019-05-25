import item from './item'
import slots from './panel/slots'
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
draw.slots = function (ctx) {
  let e = 0
  for (e; e < slots.length; e++) {
    if (slots[e].itemId !== null) {
      this.item(ctx, slots[e])
    }
  }
}
export default draw
