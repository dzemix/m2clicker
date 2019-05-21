<template>
  <div class="main">
    <h2>M2 Clicker</h2>
    <my-canvas class="my-canvas">
    </my-canvas>
  </div>
</template>

<script>
import MyCanvas from './myCanvas.vue'
export default {
  name: 'app',
  components: {
    MyCanvas
  }
}
</script>
<style>
html, body {
  margin: 0;
  padding: 0;
}

.main {
  position: relative;
  height: 100vh;
  width: 100vw;
  padding: 20px;
  box-sizing: border-box;
}

</style>
