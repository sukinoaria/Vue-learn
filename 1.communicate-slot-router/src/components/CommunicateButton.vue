<!--父子组件的通信-->
<template>
  <button
      :class="type === 'info'? 'info':'warn'"
      @click="$emit('plus',2)"
  >
    <span v-if="$slots.default"><slot></slot></span>
  </button>
</template>
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

<style scoped>
  button{
    margin: auto;
  }

  .info{
    background-color: #42b983;
  }

  .warn{
    background-color:darkorchid;
  }

</style>