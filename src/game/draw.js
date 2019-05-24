var draw = {}
draw.square = function (ctx, params) {
  ctx.fillStyle = params.color
  ctx.fillRect(params.left, params.top, params.width, params.height)
}
export default draw
