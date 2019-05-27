import draw from './draw'
var maps = {}
maps.map = function (ctx) {
  draw.image(ctx, '/static/back.jpg', 0, 0)
}
export default maps
