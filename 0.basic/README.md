[TOC]

### 基础知识篇

#### 1.demo与基本语法结构

源码：[normal-syntax.html](normal-syntax.html)

##### demo的核心内容：

- 通过`script src`引入``vue`相关`js`文件

```javascript
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
```

- 在`body`中的`div`里通过`id`绑定``vue`对象

```html
<div id="app">
    <!-- message output -->
    <h1>{{message}}</h1>
</div>
```

- 在`js`代码里实现对象的绑定，初始化值、成员函数已经其他在生命周期里可能存在的钩子函数。

```javascript
<script>
    var vm = new Vue({
        el: "#app",
        data: {
            message: "hello Vue",
            ok: true,
            items: [{
                value: "List item 1"
            }, {
                value: "List item 2"
            }, {
                value: "List item 3"
            }],
            username: "",
            input2: "",
        },
        methods: {
            clickButton: function() {
                this.message = "button clicked ... ";
                this.ok = false;
            }
        },
    })
</script>
```

##### 判断：`v-if、v-else-if、v-else`

```html
<!-- if else -->
<h2 v-if="ok===true">Yes</h2>
<h2 v-else>No</h2>
```

##### 循环：`v-for`

```html
<!-- for loop -->
<ol v-for="(item, index) in items" :key="index">
	<li>{{index}}--{{item.value}}</li>
</ol>
```

##### 事件绑定 `v-on:eventType`

```html
<button v-on:click="clickButton()">Click me</button>
```

##### 内容输入的双向绑定`v-model`

在`v-model.lazy`情况下，更改了输入框内容后不会即时更新，而是在输入框失去焦点后更新。

```html
<!-- v-model bind -->
<div>
    <span>input value:</span>
    <input type="text" v-model="username"><br>
    <!-- <input type="text" v-model.lazy="username"><br> -->
    <span> value is:</span>
    <label>{{username}}</label>
</div>
```

#### 2.component示例

源码：[vue-components.html](vue-components.html)

- 通过component可以实现定制的组件容器，一次定义多次使用。

- component实质是由基本的HTML组件组合得到的复合结构，通过`template`定义其结构，通过`props`进行组件内的参数传递。

- 示例程序：通过自定义组件展示数组的值

```js
<script>
    Vue.component("comp1", {
    // 传入参数名: val
    props: ['val', 'idx'],
    template: "<li>{{idx}} : {{val}}</li>"
	})
	var vm = new Vue({
    	el: "#app",
    	data: {
        	items: ["Vue", "React", "angularJS"]
    	}
	})
</script>
```

- HTML使用该组件：

```html
<div id="app">
    <!-- v-bind:param_name -->
    <comp1 v-for="(item,index) in items" v-bind:val="item" v-bind:idx="index"></comp1>
</div>
```

