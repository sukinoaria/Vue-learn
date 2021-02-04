# vue-base 项目初始化
```bash
vue create vue-base
```
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```
### 知识点
#### 1. 父子组件的通信过程
[子组件CommunicateButton](./src/components/CommunicateButton.vue)
##### 父组件向子组件通信：通过props传递参数
```vue
//CommunicateButton.vue
<script>
export default {
  name: "CommunicateButton",
  props: {
    // 按钮类型，如info、warn、error等
    type: {
      type: String,
      default: "default"
    },
    loading: Boolean, // 是否在加载中
    disabled: Boolean // 是否不可用
  },
};
</script>
```
示例：通过传入参数type的值确定按钮的颜色
```vue
//CommunicateButton.vue
<template>
  <button :class="type === 'info'? 'info':'warn'"/>
</template>
```
```css
<style scoped>
  .info{
    background-color: #42b983;
  }
  .warn{
    background-color:darkorchid;
  }
</style>
```
在父组件中使用：
```html
<CommunicateButton @plus="handlePlus" type="info">Click me</CommunicateButton>
```
##### 子组件向父组件通信
- 子组件通过`$emit`来发送自定义的事件信息：
```vue
<template>
  <button
      class="my-button"
      @click="$emit('plus',1)"
  >
    <span v-if="$slots.default"><slot></slot></span>
  </button>
</template>
```
- 父组件通过`v-on`来绑定对应事件的处理函数
```html
<template>
  <div id="app" >
    <img alt="Vue logo" src="./assets/logo.png">
    <CommunicateButton @plus="handlePlus">Click me</CommunicateButton>
  </div>
</template>

```
```vue
export default {
  name: 'App',
  //App的两个组件
  components: {
    HelloWorld,
    CommunicateButton
  },
  //初始数据
  data:function(){
    return {
      memberNum: 0
    }
  },
  methods:{
    //处理plus事件的函数
    handlePlus:function (num){
      this.memberNum += num;
      console.log("handlePlus:",this.memberNum)
      this.info = this.info === 'info'?'warn':'info'
    }
  }
}
```

#### 2. SLOT插槽
[SLOT对话框组件](./src/components/SlotDialog.vue)
##### 自动装入合适内容
通过设定确定的模板,结合slot可以在slot部分填充自定义的内容,实现高度可定制化的操作.
核心属性:name,通过name可以确定该slot对应的填充内容

```vue
<!-- SlotDialog.vue -->
<template>
  <div class="dialog-container">
    <header>
      <!-- 弹窗头部内容 -->
      <slot name="header">提示</slot>
    </header>
    <main>
      <!-- 弹窗主要内容 -->
      <!-- 一个不带 name 的 <slot> 出口会带有隐含的名字“default” -->
      <!-- 相当于 <slot name="default"></slot> -->
      <slot></slot>
    </main>
    <footer>
      <!-- 弹窗底部内容，通常是按钮 -->
      <slot name="footer">
        <!-- 设置了默认内容 -->
        <button @click="$emit('confirm')">确定</button>
      </slot>
    </footer>
  </div>
</template>
<script>
export default {
  name: "SlotDialog"
}
</script>
```
在主页面中使用该模板:
```vue
<div id="app" >
  <slot-dialog name="header">1？</slot-dialog>
  <slot-dialog name="default">确认要关闭吗？</slot-dialog>
  <slot-dialog name="footer">3？</slot-dialog>
</div>
```

#### 3. 路由控制
[HOME组件](./src/components/Home.vue)
[Page 1](./src/components/page1.vue)
[Page 2](./src/components/page2.vue)

##### App.vue
该文件为初始vue组件，整个项目基于其以及`main.js`来启动，但是一般不在里面写额外的`template`，而是在components里面新建home页用于路由，不然会导致App.vue渲染两次。
```vue
<template>
  <div id="app">
    <router-view/>
  </div>
</template>
```
另外新建`Home.vue`作为根目录的访问路径,并在里面添加子页面.
```vue
<template>
  <div>
    <div>Home Page</div>
    <router-link :to="{ name: 'Page1'}">goto Page 1</router-link>
    <router-link :to="{ name: 'Page2'}">goto Page 2</router-link>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
name: "Home"
}
</script>
```
其中`router-link v-on:to`指向跳转链接,类似于`a`标签的`href`,参数传递也可以在此完成.`name`为router中定义的组件名,也可以用`path`的形式如下
```vue
<router-link :to="{ path:'/home/page1'}" tag="button">goto Page 1</router-link>
<router-link :to="{ path:'/home/page2'}" tag="button">goto Page 2</router-link>
```
两个子组件都用最简单的形式:
```vue
<template>
<div>
  Page 1 Site
</div>
</template>

<script>
export default {
name: "page1"
}
</script>
```
路由控制:
`src`下新建`router.js`控制应用的路由.
```js
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
            { path: "/home/page1", component: Page1, name: "Page1" },
            { path: "/home/page2", component: Page2, name: "Page2" }
        ]
    },
    // 通配符 * 会匹配所有路径
    // 路由 { path: '*' } 通常用于客户端 404 错误
    // 含有通配符的路由应该放在最后
    { path: "*", redirect: { name: "App" } }
];

export default  new VueRouter({
    routes // （缩写）相当于 routes: routes
});
```
最后在`src/main.js`中引用router,启动vue程序.
```js
import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false
import router from "@/router";

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
```
##### 路由传参
- 两类参数传递方式:
  - /page/detail?id=123，在 Vue Router 中用query表示。
  - /page/detail/123，在 Vue Router 中用params表示。

1.params传参
- 编程式或者声明式导航传参:
```vue
// 编程式导航传参
this.$router.push({ name: "Page1", params: { id: 123 } });

<!-- 声明式导航传参 -->
<router-link :to="{ name: 'Page1', params: {id: 1234}}">goto Page1</router-link>
```
也可以使用path拼接对应参数来实现:
```vue
<router-link :to="{ path: '/home/page1/123/'}" tag="button">goto Page 1</router-link>
```

- `router.js`动态路径参数配置:
```js
children: [
        // 动态路径参数以冒号 ":" 开头
        { path: "page1/:id", component: Page1, name: "Page1" },
        { path: "page2", component: Page2, name: "Page2" }
      ]
```
一个“路径参数”(param)使用冒号:标记。当匹配到一个路由时，参数值会被设置到$route.params，可以在每个组件内使用：
- 目标页参数使用方法
```vue
<!-- Page1.vue -->
<template>
  <!-- $route 可直接注入到模板 -->
  <div>{{ $route.params.id }}</div>
</template>
<script>
  export default {
    data() {
      return {};
    },
    mounted() {
      // 每个组件中都可以通过 this.$route 获取路由信息
      console.log(this.$route.params);
    }
  };
</script>
```
2. query类型传参
   
params 传参有一个不方便的地方，即我们必须要传入一个动态路径参数才能匹配到对应的页面。但是有些时候，我们的页面也允许某些可选参数的缺失，例如我们想要/edit表示新建，/edit/123表示修改id=123的内容，但是当我们输入/edit的时候却匹配不到相同的页面。这种时候我们可以使用 query 传参，/edit表示新建、/edit?id=123表示修改。
- 不需要像 params 传参一样使用/xxxx/:xxx这样更改路由配置，只需要在导航的时候传参：
```vue
// 编程式导航传参
this.$router.push({ name: "Page2", query: { id: 123 } });
<!-- 声明式导航传参 -->
<router-link :to="{ name: 'Page2', query: {id: 1234}}">goto Page2</router-link>
//类似上面的,也可以暴力拼接path
```
- 使用方法和params方法类似,只是改成了`$route.query`
```vue
<template>
  <div>Page2 Site, query: {{$route.query}}</div>
</template>
```