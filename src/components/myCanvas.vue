<template>
  <div class="main">
    <canvas @click="click()" ref="my-canvas" class="canvas" ></canvas>
  </div>
</template>

<script>
import main from '../game/main.js'
import mouse from '../game/mouse.js'
export default {
  data () {
    return {
    }
  },
  mounted () {
    this.$refs['my-canvas'].width = 1200
    this.$refs['my-canvas'].height = 600
    var ctx = this.$refs['my-canvas'].getContext('2d')
    main.draw(ctx)
    // main.drawMob(ctx)
  },
  methods: {
    click () {
      mouse.otop = this.$refs['my-canvas'].offsetTop
      mouse.oleft = this.$refs['my-canvas'].offsetLeft
      mouse.pageY = event.pageY
      mouse.pageX = event.pageX
      main.event(mouse)
    }
  }
}
</script>
<style lang="scss" scoped>
.main {
  display: flex;

  justify-content: center;
  .canvas {
    border: 1px solid black;
  }
}
</style>
