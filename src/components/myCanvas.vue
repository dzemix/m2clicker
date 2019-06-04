<template>
  <div class="main">
    <canvas @mousemove="move($event)" @click="click()" @mousedown="holdOn()" @mouseup="holdOff()" ref="my-canvas" class="canvas" ></canvas>
  </div>
</template>

<script>
import game from '../game/game.js'
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
    game.main(this.ctx, mouse)
  },
  methods: {
    click () {
      mouse.otop = this.$refs['my-canvas'].offsetTop
      mouse.oleft = this.$refs['my-canvas'].offsetLeft
      mouse.pageY = event.pageY
      mouse.pageX = event.pageX
      mouse.event()
    },
    move ($event) {
      mouse.otop = this.$refs['my-canvas'].offsetTop
      mouse.oleft = this.$refs['my-canvas'].offsetLeft
      mouse.pageY = event.pageY
      mouse.pageX = event.pageX
    },
    holdOn () {
      mouse.catch()
    },
    holdOff () {
      mouse.dropItem()
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
