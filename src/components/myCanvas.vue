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
      ctx: ''
    }
  },
  mounted () {
    this.$refs['my-canvas'].width = 1200
    this.$refs['my-canvas'].height = 600
    this.ctx = this.$refs['my-canvas'].getContext('2d')
    main.draw(this.ctx)
  },
  methods: {
    click () {
      mouse.otop = this.$refs['my-canvas'].offsetTop
      mouse.oleft = this.$refs['my-canvas'].offsetLeft
      mouse.pageY = event.pageY
      mouse.pageX = event.pageX
      main.event(mouse, this.ctx)
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
