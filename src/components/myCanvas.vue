<template>
  <div class="my-canvas-wrapper">
    <canvas ref="my-canvas" class="canvas" ></canvas>
  </div>
</template>

<script>
import game from '../game/main.js'
export default {
  data () {
    return {
    }
  },
  mounted () {
    this.$refs['my-canvas'].width = 1200
    this.$refs['my-canvas'].height = 600
    var ctx = this.$refs['my-canvas'].getContext('2d')
    game.first(ctx)
  }
}
</script>
<style lang="scss" scoped>
.canvas {
  border: 1px solid black;
}
</style>
