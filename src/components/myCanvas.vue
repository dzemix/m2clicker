<template>
  <div class="my-canvas-wrapper">
    <canvas ref="my-canvas" class="canvas" ></canvas>
    <slot></slot>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  mounted () {
    this.$refs['my-canvas'].width = 1200
    this.$refs['my-canvas'].height = 600
    var ctx = this.$refs['my-canvas'].getContext('2d')
    ctx.moveTo(0, 0)
    ctx.lineTo(250, 100)
    ctx.stroke()
  }
}
</script>
<style lang="scss" scoped>
.canvas {
  border: 1px solid black;
}
</style>
