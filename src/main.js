import Vue from 'vue'
import App from './App.vue'

import PolarisVue from '@eastsideco/polaris-vue';
import '@eastsideco/polaris-vue/lib/polaris-vue.css';

Vue.use(PolarisVue);

Vue.config.productionTip = true

new Vue({
  render: h => h(App),
}).$mount('#app')
