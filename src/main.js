/*
 * @Author: hayyot
 * @Date: 2022-12-06 11:06:46
 * @Description: 铁沸物
 * @FilePath: \forum-fe\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import axios from "axios";
import VueAxios from "vue-axios";
import QS from 'qs';
import 'element-ui/lib/theme-chalk/index.css';
import Vant from 'vant';
import 'vant/lib/index.css';
// 引用highlight

Vue.use(Vant);
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueAxios, axios);
Vue.use(QS);
// Vue.directive('highlight',function (el) {
//   let blocks = el.querySelectorAll('pre code');
//   blocks.forEach((block)=>{
//       hljs.highlightBlock(block)
//   })
// })
new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this; //安装全局事件总线
  },
}).$mount('#app')
