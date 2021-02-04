// 配置路由信息

import Vue from "vue"
import VueRouter from "vue-router"
Vue.use(VueRouter)

import Home from "./components/Home";
import Page1 from "./components/page1"
import Page2 from "./components/page2"

const routes = [
    // 以 / 开头的嵌套路径会被当作根路径
    {
        path: "/home",
        component: Home,
        name: "Home",
        children: [
            { path: "/home/page1/:id", component: Page1, name: "Page1" },
            { path: "/home/page2", component: Page2, name: "Page2" }
        ]
    },
    // 通配符 * 会匹配所有路径
    // 路由 { path: '*' } 通常用于客户端 404 错误
    // 含有通配符的路由应该放在最后
    { path: "*", redirect: { name: "Home" } }
];

export default  new VueRouter({
    routes // （缩写）相当于 routes: routes
});