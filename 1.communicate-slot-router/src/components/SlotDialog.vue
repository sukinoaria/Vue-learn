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

<style scoped>
  .dialog-container{
    margin-top: 30px;
    border-style:solid;
    border-color: #42b983;

  }
</style>