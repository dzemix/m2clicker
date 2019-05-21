<script>
export default {
  inject: ['provider'],
  computed: {
    ctx () {
      return this.provider.context
    }
  },
  render () {
    this.ctx.moveTo(0, 0)
    this.ctx.lineTo(200, 100)
    this.ctx.stroke()
    return null
  }
}
</script>
