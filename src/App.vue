<!--
 * @Author: hayyot
 * @Date: 2023-04-01 16:22:48
 * @Description: 铁沸物
 * @FilePath: \forum-fe\src\App.vue
-->
<template>
  <div id="app">
    <TabBar class="tabbar"></TabBar>
    <router-view class="view" v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
import TabBar from '@/components/Tab-bar.vue';
export default {
  name: 'App',
  components: {
    TabBar,
  },
    provide() {
        return {
            reload : this.reload,
        }
    },
    data() {
        return {
            isRouterAlive:true,
        };
    },
    created(){},
    methods: {
        // 通过声明reload方法，控制router-view的显示或隐藏，从而控制页面的再次加载
        reload(){
            this.isRouterAlive = false;
            this.$nextTick(() => {
                this.isRouterAlive = true;
            })
        },
    },
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
.tabbar {
  width: 100%;
  /* position: fixed; */
  z-index: 999;
}
.view {
  /* margin-top: 3.75rem; */
}
</style>
