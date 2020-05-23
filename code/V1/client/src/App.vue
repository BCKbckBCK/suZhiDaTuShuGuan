<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  margin-top: 0;
  font-size:18rem;
  color:#333;
  font-family: 'SourceHanSansCN-Regular';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width:100%;
  box-sizing: border-box;
  height: 1080px;
}
</style>
