<!--
 * @Author: hayyot
 * @Date: 2023-04-01 16:22:48
 * @Description: 铁沸物
 * @FilePath: \forum-fe\src\App.vue
-->
<template>
  <div id="app">
    <TabBar class="tabbar"></TabBar>
    <router-view class="view"></router-view>
  </div>
</template>

<script>
import TabBar from '@/components/Tab-bar.vue';
export default {
  name: 'App',
  components: {
    TabBar,
  }
}
</script>

<style>
*{
  margin: 0px;
  padding: 0px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
