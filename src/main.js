import Vue from 'vue'
import { Button,Table } from 'ant-design-vue';
import App from './App.vue'
import { VTable, VPagination } from 'vue-easytable'
import 'vue-easytable/libs/themes-base/index.css'



Vue.config.productionTip = false
Vue.use(Table)


Vue.component(Button.name, Button)
Vue.component(VTable.name, VTable)
Vue.component(VPagination.name, VPagination)

new Vue({
    render: h => h(App)
}).$mount('#app')
