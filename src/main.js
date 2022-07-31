import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import { BootstrapVue } from "bootstrap-vue";
import { routes } from "./routes";

import "./main.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: routes,
  base: process.env.NODE_ENV,
});
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
